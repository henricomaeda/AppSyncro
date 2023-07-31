from utils.window_utils import WindowBaseUtils
from customtkinter import CTk


class MainWindow(CTk, WindowBaseUtils):
    def __init__(self, dark_mode: bool = False, **resources) -> None:
        super().__init__(**resources)
        self.toggle_appearance(dark_mode)
        self.setup_window()

    def toggle_appearance(self, dark_mode: bool = None):
        self.dark_mode = dark_mode if dark_mode is not None else not self.dark_mode
        appearance = "dark" if self.dark_mode else "light"
        self._set_appearance_mode(appearance)

    def setup_window(self):
        self.title("uRemotePC")
        self.center_window(width=800, height=600)
