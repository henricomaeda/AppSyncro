from socket import socket, error, timeout, SO_REUSEADDR, SOCK_STREAM, SOCK_DGRAM, SOL_SOCKET, SHUT_RDWR, AF_INET
from concurrent.futures import ThreadPoolExecutor
from .client_connection import ClientConnection
from random import randint
from re import match


class SocketServer(socket):
    @staticmethod
    def get_private_ip():
        try:
            with socket(AF_INET, SOCK_DGRAM) as s:
                s.connect(("8.8.8.8", 80))
                private_ip = s.getsockname()[0]
            return private_ip
        except error as e:
            print(f"Unable to retrieve private IP: {e}")
            return 12345

    @staticmethod
    def generate_port():
        try:
            return randint(1024, 65535)
        except error as e:
            print(f"Failed to generate a random port: {e}")
            return 12345

    @staticmethod
    def is_valid_ip(ip: str) -> bool:
        ip_regex = r"^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
        return match(ip_regex, ip) is not None

    @staticmethod
    def is_valid_port(port: int) -> bool:
        return isinstance(port, int) and 1024 <= port <= 65535

    def __init__(self, response_handler: callable = None):
        super().__init__(AF_INET, SOCK_STREAM)
        self.response_handler = response_handler
        self.connections = []
        self.running = False

    def start(self, host: str, port: int, password: str, max_connections: int = 1):
        try:
            if self.running:
                raise RuntimeError("Server is already running!")
            elif not self.is_valid_ip(host):
                raise ValueError("Invalid host IP address.")
            elif not self.is_valid_port(port):
                raise ValueError("Invalid port number.")
            self.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
            self.bind((host, port))
            self.listen(max_connections)
            self.running = True
            self.response_handler(f"Server listening on {host}:{port}.")
            with ThreadPoolExecutor(max_connections) as executor:
                while self.running:
                    client_socket, client_address = self.accept()
                    connection = ClientConnection(
                        client_socket,
                        client_address,
                        self.response_handler
                    )
                    self.connections.append(connection)
                    executor.submit(connection.handle_client, password)
        except (error, timeout):
            pass
        except Exception as e:
            self.response_handler(f"Failed to start/handle server: {e}")

    def stop(self):
        try:
            if not self.running:
                raise RuntimeError("Server is not running!")
            for connection in self.connections:
                connection.disconnect()
            self.running = False
            self.shutdown(SHUT_RDWR)
            self.response_handler("Server was closed.")
        except (error, timeout):
            pass
        except Exception as e:
            self.response_handler(f"Failed to shutdown server: {e}")
        finally:
            self.close()
