import { name as appName } from "../app.json";
import { Dimensions } from "react-native";

const window = Dimensions.get("window");
export const globals = {
    appName,
    window: {
        width: window.width,
        height: window.height
    },
    colors: {
        background: "#121212",
        midground: "#222222",
        foreground: "#444444",
        placeholder: "#AAAAAA",
        tint: "#FFFFFF"
    }
}
