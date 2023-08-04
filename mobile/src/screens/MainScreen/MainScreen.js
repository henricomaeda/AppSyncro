import React, { useRef, useState, useEffect } from "react";
import TcpSocket from "react-native-tcp-socket";
import {
    ActivityIndicator,
    TouchableOpacity,
    PanResponder,
    ScrollView,
    View,
    Text
} from "react-native";
import { globals } from "../../Globals";
import styles from "./MainScreenStyles";

const MainScreen = ({ navigation, route }) => {
    const [{ serverIp, serverPort, serverPassword }, setServerData] = useState({
        serverIp: "127.0.0.1",
        serverPort: 12345,
        serverPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const submit = useRef(console.log);

    // useEffect(() => {
    //     const navigateToHome = () => navigation.isFocused() && navigation.popToTop();
    //     if (route.params) {
    //         const serverData = JSON.parse(route.params);
    //         setServerData(serverData);

    //         const options = { host: serverData.serverIp, port: serverData.serverPort }
    //         const client = TcpSocket.createConnection(options, () => {
    //             const password = serverData.serverPassword.toString().trim();
    //             if (password.length > 0) client.write(serverData.serverPassword, "utf-8");
    //         });

    //         client.on("data", (data) => console.log(`Received: ${data.toString()}`));
    //         client.on("error", (error) => null);
    //         client.on("end", () => navigateToHome());
    //         client.on("close", () => navigateToHome());
    //         client.on("timeout", () => navigateToHome());

    //         const sendData = (data) => {
    //             try {
    //                 const command = data.toString().trim();
    //                 client.write(`${command}\n`, "utf-8");
    //             }
    //             catch (e) {
    //                 navigateToHome();
    //             }
    //         };
    //         submit.current = sendData;

    //         setLoading(false);
    //         return () => client.destroy();
    //     }
    //     else navigateToHome();
    // }, []);


    const [isPressed, setIsPressed] = useState(false);
    const intervalRef = useRef(null);
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (event, gestureState) => {
                setIsPressed(true);
                intervalRef.current = setInterval(() => {
                    const moveX = gestureState.moveX !== 0 ? gestureState.moveX : gestureState.x0;
                    const moveY = gestureState.moveY !== 0 ? gestureState.moveY : gestureState.y0;
                    const dx = Math.max(Math.min(Math.round((moveX - gestureState.x0) / 2), 20), -20);
                    const dy = Math.max(Math.min(Math.round((moveY - gestureState.y0) / 2), 20), -20);
                    submit.current(`${dx}MM${dy}`);
                }, 60);
            },
            onPanResponderRelease: () => {
                clearInterval(intervalRef.current);
                setIsPressed(false);
            },
        })
    ).current;

    if (!loading) return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Connected with </Text>
                <Text
                    style={[
                        styles.title,
                        { color: globals.colors.primary }
                    ]}>
                    {serverIp}:{"***" + serverPort.toString().slice(3)}
                </Text>
            </View>
            <View
                {...panResponder.panHandlers}
                style={{
                    backgroundColor: isPressed ? globals.colors.midground : globals.colors.foreground,
                    borderTopRightRadius: globals.window.width / 20,
                    borderTopLeftRadius: globals.window.width / 20,
                    marginBottom: globals.window.width / 42,
                    marginTop: globals.window.width / 20,
                    height: globals.window.width / 2
                }}
            />
            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                <TouchableOpacity
                    onPress={() => submit.current("LC")}
                    onLongPress={() => submit.current("HLC")}
                    style={{
                        borderBottomLeftRadius: globals.window.width / 20,
                        backgroundColor: globals.colors.foreground,
                        height: globals.window.width / 10,
                        flex: 1
                    }}
                />
                <TouchableOpacity
                    onPress={() => submit.current("MC")}
                    onLongPress={() => submit.current("HMC")}
                    style={{
                        marginHorizontal: globals.window.width / 42,
                        backgroundColor: globals.colors.foreground,
                        height: globals.window.width / 10,
                        flex: 1
                    }}
                />
                <TouchableOpacity
                    onPress={() => submit.current("RC")}
                    onLongPress={() => submit.current("HRC")}
                    style={{
                        borderBottomRightRadius: globals.window.width / 20,
                        backgroundColor: globals.colors.foreground,
                        height: globals.window.width / 10,
                        flex: 1
                    }}
                />
            </View>
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
