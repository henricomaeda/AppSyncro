class WindowBaseUtils:
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
