import { StyleSheet } from "react-native";
import { globals } from "../../Globals";

const styles = StyleSheet.create({
    "label": {
        marginBottom: globals.window.width / 60,
        marginLeft: globals.window.width / 60,
        marginTop: globals.window.width / 22,
        fontSize: globals.window.width / 24,
        color: globals.colors.tint
    },
    "entry": {
        paddingHorizontal: globals.window.width / 32,
        backgroundColor: globals.colors.background,
        borderRadius: globals.window.width / 42,
        fontSize: globals.window.width / 26,
        color: globals.colors.tint
    },
    "button": {
        paddingHorizontal: globals.window.width / 9,
        paddingVertical: globals.window.width / 42,
        borderRadius: globals.window.width / 42
    },
    "buttonText": {
        fontSize: globals.window.width / 22,
        color: globals.colors.tint
    },
    "floatButton": {
        borderRadius: Math.round(globals.window.width + globals.window.height) / 2,
        backgroundColor: globals.colors.foreground,
        marginTop: globals.window.width / 32,
        padding: globals.window.width / 36,
        justifyContent: "center",
        alignItems: "center",
        elevation: 10
    }
});

export default styles;
