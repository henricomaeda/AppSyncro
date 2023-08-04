from app.components.custom_entry import CustomEntry, CustomLabel
from app.components.header_button import HeaderButton
from utils.process_image import convert_to_icon
from utils.window_utils import WindowBaseUtils
from utils.socket_server import SocketServer
from threading import Thread
from customtkinter import *
from os.path import exists
from tkinter import Event
from PIL import Image


class MainWindow(CTk, WindowBaseUtils):
    def __init__(self, title: str = "Main Application", **resources) -> None:
        super().__init__(fg_color="white", **resources)
        self.socket_server = SocketServer(self.handle_response)
        self.wm_protocol("WM_DELETE_WINDOW", self.close_window)
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
        width, height = 900, 700
        self.minsize(width, height)
        self.center_window(width, height)

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
            command=self.quit
        )
        # Response's container and its widgets.
        self.responses_frm = CTkScrollableFrame(
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
        self.responses_frm.pack(expand=True, fill=BOTH, side=BOTTOM)

    def start_server(self) -> None:
        host = self.host_ent.get().strip()
        port = self.port_ent.get().strip()
        password = self.password_ent.get().strip()
        max_connections = self.max_connections_ent.get().strip()
        Thread(target=self.socket_server.start, args=(
            host,
            port,
            password,
            max_connections
        )).start()

    def stop_server(self) -> None:
        Thread(target=self.socket_server.stop).start()

    def close_window(self, event: Event = None):
        try:
            self.stop_server()
            if not event and self.winfo_exists():
                self.destroy()
        except Exception as e:
            print(f"Failed to close window: {e}")

    def handle_response(self, response: str, sender: str = "Localhost") -> None:
        sender = str(sender).strip()
        response = str(response).strip()
        try:
            if not response or self.last_response is response:
                return
            elif not self.responses_frm.winfo_exists():
                return
            # Create the response frame.
            response_frm = CTkFrame(self.responses_frm, fg_color="transparent")
            response_frm.after(200, self.scroll_to_end)
            # Create sender label.
            sender_lbl = CustomLabel(
                response_frm,
                text=sender,
                corner_radius=12,
                fg_color="#1c6ca4"
            )
            # Create response label.
            response_lbl = CustomLabel(
                response_frm,
                text=response,
                corner_radius=12,
                fg_color="#2c2c34"
            )
            # Display the widgets.
            sender_lbl.pack(anchor=W, pady=(0, 6))
            if not self.last_response:
                sender_lbl.pack_configure(pady=(12, 6))
            response_lbl.pack(fill=X, pady=(0, 12))
            response_frm.pack(fill=X, padx=(10, 8))
        except Exception as e:
            print(f"Failed to handle response: {e}")
        finally:
            self.last_response = response

    def scroll_to_end(self) -> None:
        try:
            if not self.responses_frm.winfo_exists():
                return
            elif not self.responses_frm._parent_canvas.winfo_exists():
                return
            self.responses_frm._parent_canvas.yview_moveto(1.0)
        except Exception as e:
            print(f"Unable to scroll to end: {e}")
