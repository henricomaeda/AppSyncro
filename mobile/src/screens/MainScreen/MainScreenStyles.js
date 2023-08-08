import { StyleSheet } from "react-native";
import { globals } from "../../Globals";

const styles = StyleSheet.create({
    "backgroundCircle": {
        borderRadius: Math.round(globals.window.width + globals.window.height) / 2,
        height: globals.window.width * 1.2,
        width: globals.window.width * 1.2,
        left: -globals.window.width / 3,
        top: -globals.window.width / 5,
        position: "absolute",
        elevation: 10,
        opacity: 0.5
    },
    "container": {
        paddingHorizontal: globals.window.width / 12,
        justifyContent: "center",
        flex: 1
    },
    "buttonsContainer": {
        backgroundColor: globals.colors.midground,
        borderRadius: globals.window.width / 32,
        justifyContent: "space-between",
        flexDirection: "row",
        overflow: "hidden",
        flexWrap: "wrap",
        elevation: 2
    },
    "button": {
        paddingVertical: globals.window.width / 40,
        width: globals.window.width / 5,
        justifyContent: "center",
        alignItems: "center"
    },
    "buttonImage": {
        height: globals.window.width / 10,
        width: globals.window.width / 10,
        elevation: 6
    },
    "buttonText": {
        fontSize: globals.window.width / 30,
        color: globals.colors.tint,
        textAlign: "center"
    },
    "label": {
        fontSize: globals.window.width / 28,
        color: globals.colors.placeholder,
        textAlign: "center"
    },
    "keyboard": {
        borderTopRightRadius: globals.window.width / 26,
        borderTopLeftRadius: globals.window.width / 26,
        paddingHorizontal: globals.window.width / 26,
        backgroundColor: globals.colors.foreground,
        marginTop: globals.window.width / 42,
        color: globals.colors.tint
    },
    "keyboardButtons": {
        marginBottom: globals.window.width / 42,
        flexDirection: "row"
    },
    "keyboardButton": {
        paddingHorizontal: globals.window.width / 25,
        paddingVertical: globals.window.width / 40,
        marginTop: globals.window.width / 62,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
        flex: 1
    },
    "keyboardText": {
        fontSize: globals.window.width / 26,
        color: globals.colors.tint
    },
    "replaceButton": {
        bottom: globals.window.width / 20,
        height: globals.window.width / 8,
        right: globals.window.width / 20,
        width: globals.window.width / 8,
        position: "absolute",
        elevation: 6,
        zIndex: 100
    },
    "replaceButtonImage": {
        height: "100%",
        width: "100%"
    }
});

export default styles;
