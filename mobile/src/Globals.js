import { Dimensions } from "react-native";
import { appName } from "../index";

const window = Dimensions.get("window");
export const globals = {
    appName,
    window: {
        width: window.width,
        height: window.height
    },
    colors: {
        tint: "#ffffff",
        primary: "#6699ff",
        secondary: "#6666ff",
        placeholder: "#cccccc",
        foreground: "#2a2a30",
        midground: "#1f1f24",
        background: "#151518"
    }
};
