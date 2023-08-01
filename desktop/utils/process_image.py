from PIL import Image


def convert_to_icon(image_path: str) -> (str | None):
    try:
        image = Image.open(image_path)
        image = image.convert("RGBA")
        folder_path, file_name_with_ext = image_path.rsplit("/", 1)
        file_name, _ = file_name_with_ext.rsplit(".", 1)
        icon_path = f"{folder_path}/{file_name}.ico"
        image.save(icon_path, format="ICO")
        return icon_path
    except Exception as e:
        print(f"Failed to convert image to icon: {e}")
    return None
