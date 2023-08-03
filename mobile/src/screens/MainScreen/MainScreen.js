import * as React from "react";
import {
    ScrollView,
    Text
} from "react-native";
import styles from "./MainScreenStyles";

const MainScreen = ({ navigation, route }) => {
    const { serverIp, serverPort, serverPassword } = route.params;
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text>
                Server IP: {serverIp}
            </Text>
            <Text>
                Server Port: {serverPort}
            </Text>
            <Text>
                Server Password: {serverPassword}
            </Text>
        </ScrollView>
    )
};

export default MainScreen;
