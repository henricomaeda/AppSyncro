from customtkinter import CTkFrame, CTkEntry, BOTH, LEFT, END, X
from .custom_label import CustomLabel
from tkinter import Event


class CustomEntry(CTkEntry):
    def __init__(self, master, value: str = "Entry", label_text: str = "", hide_value: bool = False, **resources):
        self.entry_frm = CTkFrame(master, fg_color="transparent")
        self.entry_lbl = CustomLabel(self.entry_frm, text=label_text)
        super().__init__(self.entry_frm, **resources)
        self.set(value)
        if hide_value:
            self.bind("<Enter>", self.on_enter)
            self.bind("<Leave>", self.on_leave)
            self.event_generate("<Leave>")

    def on_enter(self, event: Event):
        self.configure(show="")

    def on_leave(self, event: Event):
        self.configure(show="*")

    def set(self, new_value: str):
        self.delete(0, END)
        self.insert(0, str(new_value).strip())

    def pack(self, fill: str = X, padx: (int | tuple) = 10, pady: (int | tuple) = 6, **options):
        self.entry_frm.pack(
            fill=fill,
            padx=padx,
            pady=pady,
            **options
        )
        if self.entry_lbl.cget("text"):
            self.entry_lbl.pack(fill=X, padx=6)
        super().pack(expand=True, fill=BOTH)
