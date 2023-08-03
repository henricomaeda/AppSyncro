import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
} from "react-native";
import { globals } from "../../Globals";
import styles from "./MainScreenStyles";

const MainScreen = ({ navigation, route }) => {
    const { serverIp, serverPort, serverPassword } = route.params;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    if (!loading) return (
        <ScrollView
            contentContainerStyle={{
                padding: globals.window.width / 20,
                justifyContent: "center",
                flexGrow: 1
            }}>
            <Text style={{ textAlign: "center" }}>
                Connected to {serverIp}:{serverPort}
            </Text>
        </ScrollView>
    )
    else return (
        <ActivityIndicator
            size={globals.window.width / 10}
            color={globals.colors.primary}
            style={{ flex: 1 }}
        />
    );
};

export default MainScreen;
