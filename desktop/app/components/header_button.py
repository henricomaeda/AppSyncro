from customtkinter import CTkButton, LEFT, Y
from tkinter import Event


class HeaderButton(CTkButton):
    def __init__(self, master, width: int | tuple[int, int] = 46, text: str = "Button", corner_radius: int = 0, fg_color: str = "transparent", **resources):
        super().__init__(
            master,
            width,
            text=text.strip(),
            corner_radius=corner_radius,
            fg_color=fg_color.strip(),
            **resources
        )
        self.fg_color = self._fg_color
        self.text_color = self._text_color
        self.bind("<Enter>", lambda e: self.on_enter())
        self.bind("<Leave>", lambda e: self.on_leave())
        self.configure(cursor="")

    def on_enter(self):
        self.configure(fg_color=self._hover_color, text_color="white")

    def on_leave(self):
        self.configure(fg_color=self.fg_color, text_color=self.text_color)

    def pack(self, fill: str = Y, side: str = LEFT, **options):
        super().pack(fill=fill, side=side, **options)
