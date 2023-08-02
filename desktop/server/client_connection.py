from socket import socket, error, timeout
from .commands import handle_command

BUFFER_SIZE = 1024


class ClientConnection:
    def __init__(self, client_socket: socket, client_address: str, response_handler: callable) -> None:
        self.socket = client_socket
        self.address = client_address
        self.response_handler = response_handler
        self.running = False

    def handle_client(self, server_password: str) -> None:
        try:
            self.running = True
            self.socket.settimeout(360.0)  # 6 minutes to timeout.
            self.response_handler("{}:{} has connected.".format(*self.address))
            if server_password:
                client_password = self.get_data()
                if server_password != client_password:
                    self.send_data("Access denied.")
                    raise error("Access denied.")
            self.send_data("Access granted.")
            while self.running:
                commands = []
                data = self.get_data()
                if data is None:
                    break
                if "\n" in data:
                    commands.extend(data.split("\n"))
                else:
                    commands.append(data)
                for command in commands:
                    cmd = str(command).strip()
                    if not cmd:
                        continue
                    self.response_handler(cmd, "{}:{}".format(*self.address))
                    handle_command(cmd)
        except (timeout, error):
            pass
        except Exception as e:
            self.response_handler(f"Failed to handle client: {e}")
        finally:
            self.disconnect()

    def get_data(self) -> (str | None):
        try:
            data = self.socket.recv(BUFFER_SIZE)
            if data:
                return data.decode().strip()
            else:
                self.disconnect()
        except (error, timeout):
            pass
        except Exception as e:
            self.response_handler(f"Failed to get client data: {e}")
        return None

    def send_data(self, data: str) -> None:
        try:
            data = str(data).strip().encode()
            self.socket.sendall(data)
        except (error, timeout):
            pass
        except Exception as e:
            self.response_handler(f"Failed to send data to client: {e}")

    def disconnect(self) -> None:
        try:
            self.running = False
            ip, port = self.address
            self.response_handler(f"{ip}:{port} was disconnected.")
        except (error, timeout):
            pass
        finally:
            self.socket.close()
