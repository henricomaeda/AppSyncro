from tkinter import Widget, Event
from ctypes import windll

WINDOW_STYLE_EXTENDED = 0x00000080
WINDOW_STYLE_HIDDEN = 0x00040000
WINDOW_STYLE_POPUP = 0x00020000
WINDOW_POINTER_PARENT = -20
WINDOW_POINTER_STYLE = -16
BORDER_WIDTH = 5
CURSOR_MAP = [
    "size_nw_se",
    "size_ne_sw",
    "sb_h_double_arrow",
    "sb_v_double_arrow",
]


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
            window_style = windll.user32.GetWindowLongPtrW(
                window_handle,
                pointer
            )
            window_style = (window_style & ~WINDOW_STYLE_EXTENDED) | style
            windll.user32.SetWindowLongPtrW(
                window_handle,
                pointer,
                window_style
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


class WindowResizeUtils:
    def make_resizable(self):
        self._resize_state = 0
        self._resizing_state = False
        self.bind("<Motion>", self.update_state)
        self.bind("<ButtonPress>", self.start_resize)
        self.bind("<B1-Motion>", self.on_resize)
        self.bind("<ButtonRelease>", self.stop_resize)

    def update_state(self, event: Event):
        try:
            if self._resizing_state:
                return
            self._resize_state = 0
            cursor_state = ""
            width_resizable, height_resizable = self.wm_resizable()
            validation = self.state() != "zoomed" and (width_resizable or height_resizable)
            if self.overrideredirect() and validation:
                self.update()
                mouse_x = self.winfo_pointerx() - self.winfo_rootx()
                mouse_y = self.winfo_pointery() - self.winfo_rooty()
                window_width, window_height = self.winfo_width(), self.winfo_height()
                if 0 <= mouse_x <= BORDER_WIDTH:
                    if 0 <= mouse_y <= BORDER_WIDTH:
                        self._resize_state = 1
                    elif window_height - BORDER_WIDTH <= mouse_y <= window_height:
                        self._resize_state = 2
                    else:
                        self._resize_state = 3
                elif window_width - BORDER_WIDTH <= mouse_x <= window_width:
                    if 0 <= mouse_y <= BORDER_WIDTH:
                        self._resize_state = 4
                    elif window_height - BORDER_WIDTH <= mouse_y <= window_height:
                        self._resize_state = 5
                    else:
                        self._resize_state = 6
                else:
                    if 0 <= mouse_y <= BORDER_WIDTH:
                        self._resize_state = 7
                    elif window_height - BORDER_WIDTH <= mouse_y <= window_height:
                        self._resize_state = 8
                if self._resize_state in [1, 5]:
                    cursor_state = CURSOR_MAP[0]
                elif self._resize_state in [2, 4]:
                    cursor_state = CURSOR_MAP[1]
                elif self._resize_state in [3, 6]:
                    cursor_state = CURSOR_MAP[2]
                elif self._resize_state in [7, 8]:
                    cursor_state = CURSOR_MAP[3]
            self.config(cursor=cursor_state.strip())
        except Exception as e:
            print(f"Failed to update resize or mouse state: {e}")

    def start_resize(self, event: Event):
        try:
            if not self.overrideredirect():
                return
            cursor_state = self.cget("cursor")
            if not cursor_state in CURSOR_MAP:
                return
            self._resizing_state = True
            self.window_x = self.winfo_x()
            self.window_y = self.winfo_y()
            self.mouse_x = self.winfo_pointerx() - self.window_x
            self.mouse_y = self.winfo_pointery() - self.window_y
            self.window_width = self.winfo_width()
            self.window_height = self.winfo_height()
        except Exception as e:
            print(f"Failed to start resizing window: {e}")

    def on_resize(self, event: Event):
        try:
            if not self._resizing_state:
                return
            if not self._resize_state:
                return
            window_x = self.winfo_x()
            window_y = self.winfo_y()
            mouse_x = self.winfo_pointerx() - window_x
            mouse_y = self.winfo_pointery() - window_y
            window_width = self.winfo_width()
            window_height = self.winfo_height()
            new_x, new_y = window_x, window_y
            new_width, new_height = window_width, window_height
            if self._resize_state == 1:
                # Resizing window by top-left corner.
                new_x = window_x + (mouse_x - self.mouse_x)
                new_y = window_y + (mouse_y - self.mouse_y)
                new_width = window_width - (mouse_x - self.mouse_x)
                new_height = window_height - (mouse_y - self.mouse_y)
            elif self._resize_state == 2:
                # Resizing window by bottom-left corner.
                new_x = window_x + (mouse_x - self.mouse_x)
                new_width = window_width - (mouse_x - self.mouse_x)
                new_height = mouse_y
            elif self._resize_state == 3:
                # Resizing window by left side.
                new_x = window_x + (mouse_x - self.mouse_x)
                new_width = window_width - (mouse_x - self.mouse_x)
            elif self._resize_state == 4:
                # Resizing window by top-right corner.
                new_y = window_y + (mouse_y - self.mouse_y)
                new_width = mouse_x
                new_height = window_height - (mouse_y - self.mouse_y)
            elif self._resize_state == 5:
                # Resizing window by bottom-right corner.
                new_width = mouse_x
                new_height = mouse_y
            elif self._resize_state == 6:
                # Resizing window by right side.
                new_width = mouse_x
            elif self._resize_state == 7:
                # Resizing window by top side.
                new_y = window_y + (mouse_y - self.mouse_y)
                new_height = window_height - (mouse_y - self.mouse_y)
            elif self._resize_state == 8:
                # Resizing window by bottom side.
                new_height = mouse_y
            min_width, min_height = self.wm_minsize()
            new_width = max(new_width, min_width)
            new_height = max(new_height, min_height)
            max_x = window_x + window_width - min_width
            max_y = window_y + window_height - min_height
            new_x = min(new_x, max_x)
            new_y = min(new_y, max_y)
            width_resizable, height_resizable = self.wm_resizable()
            if not width_resizable:
                new_width = window_width
                new_x = window_x
            if not height_resizable:
                new_height = window_height
                new_y = window_y
            self.geometry(f"{new_width}x{new_height}+{new_x}+{new_y}")
        except Exception as e:
            print(f"Failed to resize window: {e}")

    def stop_resize(self, event: Event):
        try:
            self._resizing_state = False
            self._resize_state = 0
            self.config(cursor="")
        except Exception as e:
            print(f"Failed to stop resizing window: {e}")


class WindowBaseUtils(WindowStyleUtils, WindowMotionUtils, WindowResizeUtils):
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
