import { StyleSheet } from "react-native";
import { globals } from "../../Globals";

const styles = StyleSheet.create({
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
    }
});

export default styles;
