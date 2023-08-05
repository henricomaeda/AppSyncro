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
        opacity: 0.4
    },
    "container": {
        padding: globals.window.width / 12,
        justifyContent: "center",
        flexGrow: 1
    },
    "titleContainer": {
        flexDirection: "row",
        alignSelf: "center"
    },
    "title": {
        fontSize: globals.window.width / 22,
        color: globals.colors.tint,
        fontWeight: "bold"
    },
    "label": {
        fontSize: globals.window.width / 30,
        color: globals.colors.placeholder,
        textAlign: "center"
    },
    "keyboard": {
        borderTopRightRadius: globals.window.width / 26,
        borderTopLeftRadius: globals.window.width / 26,
        paddingHorizontal: globals.window.width / 26,
        backgroundColor: globals.colors.foreground,
        marginTop: globals.window.width / 20
    },
    "keyboardButtons": {
        marginBottom: globals.window.width / 20,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    "keyboardButton": {
        paddingHorizontal: globals.window.width / 25,
        paddingVertical: globals.window.width / 40,
        marginTop: globals.window.width / 62,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    "keyboardText": {
        fontSize: globals.window.width / 26,
        color: globals.colors.tint
    },
});

export default styles;
