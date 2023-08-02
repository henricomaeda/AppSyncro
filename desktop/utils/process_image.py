from os.path import splitext, split, join
from PIL import Image


def convert_to_icon(image_path: str) -> (str | None):
    try:
        image = Image.open(image_path)
        image = image.convert("RGBA")
        folder_path, filename_with_extension = split(image_path)
        filename, _ = splitext(filename_with_extension)
        icon_path = join(folder_path, f"{filename}.ico")
        image.save(icon_path, format="ICO")
        return icon_path
    except Exception as e:
        print(f"Failed to convert image to icon: {e}")
    return None
