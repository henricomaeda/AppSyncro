from app.components.custom_entry import CustomEntry, CustomLabel
from app.components.header_button import HeaderButton
from utils.process_image import convert_to_icon
from utils.window_utils import WindowBaseUtils
from server.socket_server import SocketServer
from threading import Thread
from customtkinter import *
from os.path import exists
from tkinter import Event
from time import sleep
from PIL import Image


class MainWindow(CTk, WindowBaseUtils):
    def __init__(self, title: str = "Main Application", **resources) -> None:
        super().__init__(fg_color="white", **resources)
        self.socket_server = SocketServer(self.handle_response)
        self.bind("<Destroy>", self.close_window)
        self.last_response = None
        self.title(title.strip())
        self.initialize_window()

    def initialize_window(self) -> None:
        self.configure_window()
        self.configure_image()
        self.create_widgets()
        self.display_widgets()

    def configure_window(self) -> None:
        self._set_appearance_mode("dark")
        self.configure(padx=1, pady=1)
        self.hide_title_bar()
        self.make_resizable()
        self.minsize(900, 700)
        self.center_window(width=900, height=700)

    def configure_image(self) -> None:
        file_path = os.path.abspath(__file__)
        folder_path = os.path.dirname(os.path.dirname(file_path))
        image_path = os.path.join(folder_path, "images", "logo.png")
        if not exists(image_path):
            raise FileNotFoundError("Image file not found.")
        icon_path = convert_to_icon(image_path)
        self.iconbitmap(icon_path)
        self.image_path = image_path

    def create_widgets(self) -> None:
        # Form's container and its widgets.
        self.form_frm = CTkFrame(
            self,
            corner_radius=0,
            fg_color="#2a2a30"
        )
        self.center_frm = CTkFrame(self.form_frm, fg_color="transparent")
        image = Image.open(self.image_path)
        image = CTkImage(image, size=(100, 100))
        self.image = CTkLabel(self.center_frm, text="", image=image)
        self.host_ent = CustomEntry(
            self.center_frm,
            value=self.socket_server.get_private_ip(),
            label_text="Server Host",
            placeholder_text="127.0.0.1"
        )
        self.port_ent = CustomEntry(
            self.center_frm,
            value=self.socket_server.generate_port(),
            label_text="Server Port",
            placeholder_text="12345"
        )
        self.password_ent = CustomEntry(
            self.center_frm,
            value="",
            label_text="Server Password",
            hide_value=True
        )
        self.max_connections_ent = CustomEntry(
            self.center_frm,
            value="1",
            label_text="Max Connections"
        )
        self.start_btn = CTkButton(
            self.center_frm,
            text="Start Server",
            command=self.start_server
        )
        self.stop_btn = CTkButton(
            self.center_frm,
            text="Stop Server",
            command=self.stop_server
        )
        # Header's container and its widgets.
        self.header_frm = CTkFrame(self, corner_radius=0, fg_color="#1f1f24")
        self.bind_motion(self.header_frm)
        self.title_lbl = CustomLabel(
            self.header_frm,
            text=self.title()
        )
        self.bind_motion(self.title_lbl)
        self.minimize_btn = HeaderButton(
            self.header_frm,
            text="—",
            command=self.minimize
        )
        self.close_btn = HeaderButton(
            self.header_frm,
            hover_color="#B22222",
            text="✕",
            command=self.close_window
        )
        # Response's container and its widgets.
        self.response_frm = CTkScrollableFrame(
            self,
            corner_radius=0,
            fg_color="#151518"
        )

    def display_widgets(self) -> None:
        # Form's container and its widgets.
        self.form_frm.pack(fill=Y, side=LEFT)
        self.form_frm.pack_propagate(False)
        self.center_frm.pack(expand=True)
        self.image.pack(pady=(0, 20))
        self.host_ent.pack()
        self.port_ent.pack()
        self.password_ent.pack()
        self.max_connections_ent.pack()
        self.start_btn.pack(fill=X, padx=10, pady=(6, 10))
        self.stop_btn.pack(fill=X, padx=10)
        # Header's container and its widgets.
        self.header_frm.pack(fill=X)
        self.title_lbl.pack(expand=True, fill=X, padx=10, pady=2, side=LEFT)
        self.minimize_btn.pack(side=LEFT)
        self.close_btn.pack(side=LEFT)
        # Response's container and its widgets.
        self.response_frm.pack(expand=True, fill=BOTH, side=BOTTOM)

    def start_server(self) -> None:
        try:
            host = self.host_ent.get().strip()
            port = self.port_ent.get().strip()
            password = self.password_ent.get().strip()
            max_conn = self.max_connections_ent.get().strip()
            if not port.isdigit():
                raise ValueError("Port must be a valid integer.")
            elif not max_conn.isdigit():
                raise ValueError("Max connections must be a valid integer.")
            Thread(target=self.socket_server.start, args=(
                host,
                int(port),
                password,
                int(max_conn)
            )).start()
        except Exception as e:
            self.handle_response(f"Failed to start server: {e}")

    def stop_server(self) -> None:
        try:
            thread = Thread(target=self.socket_server.stop)
            thread.start()
        except Exception as e:
            self.handle_response(f"Failed to stop server: {e}")

    def close_window(self, event: Event = None):
        for connection in self.socket_server.connections:
            connection.disconnect()
        if self.socket_server.server_socket:
            self.socket_server.server_socket.close()
        if not event:
            self.destroy()

    def handle_response(self, response: str, sender: str = "Localhost") -> None:
        try:
            response = str(response).strip()
            sender = str(sender).strip()
            if self.last_response == response:
                return
            sender_lbl = CustomLabel(
                self.response_frm,
                corner_radius=12,
                text=str(sender).strip(),
                fg_color="#1c6ca4"
            )
            sender_lbl.pack(anchor=W, padx=(10, 8), pady=(0, 6))
            if not self.last_response:
                sender_lbl.pack_configure(pady=(12, 6))
            self.last_response = response
            response_lbl = CustomLabel(
                self.response_frm,
                corner_radius=12,
                text=self.last_response,
                fg_color="#2c2c34"
            )
            response_lbl.pack(fill=X, padx=(10, 8), pady=(0, 12))
        except Exception as e:
            print(f"Failed to handle response: {e}")
        finally:
            Thread(target=self.scroll_to_end).start()

    def scroll_to_end(self) -> None:
        sleep(0.16)
        self.response_frm._parent_canvas.yview_moveto(1.0)
