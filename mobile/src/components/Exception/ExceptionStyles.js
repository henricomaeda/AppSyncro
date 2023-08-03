import { StyleSheet } from "react-native";
import { globals } from "../../Globals";

const styles = StyleSheet.create({
    "text": {
        marginLeft: globals.window.width / 60,
        marginTop: globals.window.width / 60,
        fontSize: globals.window.width / 26,
        color: globals.colors.error
    }
});

export default styles;
