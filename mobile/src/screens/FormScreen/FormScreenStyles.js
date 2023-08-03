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
        elevation: 10
    },
    "container": {
        paddingHorizontal: globals.window.width / 30,
        paddingVertical: globals.window.width / 10,
        justifyContent: "center",
        flexGrow: 1,
    },
    "headerContainer": {
        marginBottom: globals.window.width / 16,
        alignItems: "center"
    },
    "imageBackground": {
        borderRadius: Math.round(globals.window.width + globals.window.height) / 2,
        padding: globals.window.width / 16,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        elevation: 10
    },
    "image": {
        height: globals.window.width / 3.6,
        width: globals.window.width / 3.6,
    },
    "title": {
        marginTop: globals.window.width / 30,
        fontSize: globals.window.width / 18,
        color: globals.colors.tint,
        fontWeight: "bold",
        elevation: 6
    },
    "subtitle": {
        fontSize: globals.window.width / 22,
        color: globals.colors.tint
    },
    "formBackground": {
        borderTopRightRadius: globals.window.width / 42,
        borderTopLeftRadius: globals.window.width / 42,
        paddingHorizontal: globals.window.width / 36,
        paddingVertical: globals.window.width / 10,
        backgroundColor: "rgba(31, 31, 36, 0.826)"
    },
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
    "floatContainer": {
        bottom: globals.window.width / 20,
        right: globals.window.width / 20,
        alignItems: "center",
        position: "absolute"
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
