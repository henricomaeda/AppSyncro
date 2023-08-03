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
        backgroundColor: globals.colors.foreground,
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
    }
});

export default styles;
