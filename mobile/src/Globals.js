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
        tint: "#ffffff",
        primary: "#457dff",
        secondary: "#dd45ff",
        placeholder: "#cccccc",
        foreground: "#2a2a30",
        midground: "#1f1f24",
        background: "#151518",
        error: "#f23c34"
    }
};
