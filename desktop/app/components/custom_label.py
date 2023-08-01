from customtkinter import CTkLabel, LEFT, W


class CustomLabel(CTkLabel):
    def __init__(self, master, text="Label", anchor: str = W, justify: str = LEFT, auto_wraplength: bool = True, **resources):
        super().__init__(
            master,
            text=text.strip(),
            anchor=anchor,
            justify=justify,
            **resources
        )
        if auto_wraplength:
            self.bind("<Configure>", lambda e: self.adjust_wraplength())

    def adjust_wraplength(self):
        self.after(0, lambda: self.configure(wraplength=self.winfo_width()))
