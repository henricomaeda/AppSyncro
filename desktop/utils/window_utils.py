from tkinter import Widget, Event
from ctypes import windll

WINDOW_STYLE_EXTENDED = 0x00000080
WINDOW_STYLE_HIDDEN = 0x00040000
WINDOW_STYLE_POPUP = 0x00020000
WINDOW_POINTER_PARENT = -20
WINDOW_POINTER_STYLE = -16


class WindowStyleUtils:
    def get_window_handle(self):
        try:
            window_id = self.winfo_id()
            window_handle = windll.user32.GetParent(window_id)
            return window_handle
        except Exception as e:
            print(f"Failed to retrieve window handle: {e}")
        return None

    def set_window_style(self, style: int, pointer: int):
        try:
            window_handle = self.get_window_handle()
            current_window_style = windll.user32.GetWindowLongPtrW(
                window_handle,
                pointer
            )
            updated_window_style = (
                current_window_style & ~WINDOW_STYLE_EXTENDED) | style
            windll.user32.SetWindowLongPtrW(
                window_handle,
                pointer,
                updated_window_style
            )
        except Exception as e:
            print(f"Failed to define window style: {e}")


class WindowMotionUtils:
    def bind_motion(self, widget: Widget):
        widget.bind("<ButtonPress-1>", self.start_move)
        widget.bind("<B1-Motion>", self.on_move)
        widget.bind("<ButtonRelease-1>", lambda e: self.stop_move())

    def start_move(self, event: Event):
        self.mouse_x = event.x
        self.mouse_y = event.y

    def on_move(self, event: Event):
        x = self.winfo_x() + (event.x - self.mouse_x)
        y = self.winfo_y() + (event.y - self.mouse_y)
        self.geometry(f"+{x}+{y}")

    def stop_move(self):
        self.mouse_x = None
        self.mouse_y = None


class WindowBaseUtils(WindowStyleUtils, WindowMotionUtils):
    def minimize(self):
        try:
            window_handle = self.get_window_handle()
            windll.user32.ShowWindow(window_handle, 6)
        except Exception as e:
            print(f"Failed to minimize window: {e}")

    def hide_title_bar(self):
        try:
            def restore_window():
                if self.state() == "withdrawn":
                    return
                self.withdraw()
                self.deiconify()
            self.overrideredirect(True)
            self.set_window_style(WINDOW_STYLE_HIDDEN, WINDOW_POINTER_PARENT)
            self.set_window_style(WINDOW_STYLE_POPUP, WINDOW_POINTER_STYLE)
            self.after(2, restore_window)
        except Exception as e:
            print(f"Failed to hide window title bar: {e}")

    def show_title_bar(self):
        self.overrideredirect(False)

    def center_window(self, width: int = None, height: int = None):
        try:
            width = width or self.winfo_width()
            height = height or self.winfo_height()
            screen_width = self.winfo_screenwidth()
            screen_height = self.winfo_screenheight()
            x = (screen_width - width) // 2
            y = (screen_height - height) // 2
            self.geometry(f"{width}x{height}+{x}+{y}")
        except Exception as e:
            print(f"Failed to center window: {e}")
