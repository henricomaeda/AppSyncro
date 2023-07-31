from utils.window_utils import WindowBaseUtils
from customtkinter import CTk


class MainWindow(CTk, WindowBaseUtils):
    def __init__(self, dark_mode: bool = False, **resources) -> None:
        super().__init__(**resources)
        self.dark_mode = not dark_mode
        self.setup_window()

    def setup_window(self):
        self.title("uRemotePC")
        self.center_window(width=800, height=600)
        self.toggle_appearance()
        self.create_widgets()
        self.display_widgets()

    def toggle_appearance(self):
        self.dark_mode = not self.dark_mode
        appearance = "dark" if self.dark_mode else "light"
        self._set_appearance_mode(appearance)

    def create_widgets(self):
        pass

    def display_widgets(self):
        pass
