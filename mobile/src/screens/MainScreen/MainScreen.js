import React, { useRef, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import TcpSocket from "react-native-tcp-socket";
import {
    ActivityIndicator,
    TouchableOpacity,
    PanResponder,
    ScrollView,
    View,
    Text,
    TextInput
} from "react-native";
import { globals } from "../../Globals";
import styles from "./MainScreenStyles";

const MainScreen = ({ navigation, route }) => {
    const [{ serverIp, serverPort, serverPassword }, setServerData] = useState({
        serverIp: "127.0.0.1",
        serverPort: 12345,
        serverPassword: "",
    });
    const [response, setResponse] = useState("Development");
    const [keyboard, setKeyboard] = useState("");
    const submit = useRef(console.log);

    useEffect(() => {
        const disconnect = () => navigation.isFocused() && navigation.popToTop();
        if (route.params) {
            const serverData = JSON.parse(route.params);
            setServerData(serverData);

            const options = { host: serverData.serverIp, port: serverData.serverPort }
            const client = TcpSocket.createConnection(options, () => {
                const password = serverData.serverPassword.toString().trim();
                if (password.length > 0) client.write(serverData.serverPassword, "utf-8");
            });

            client.on("data", (data) => setResponse(data.toString()));
            client.on("error", (error) => null);
            client.on("end", () => disconnect());
            client.on("close", () => disconnect());
            client.on("timeout", () => disconnect());

            const sendData = (data) => {
                try {
                    const command = data.toString().trim();
                    client.write(`${command}\n`, "utf-8");
                }
                catch (e) {
                    disconnect();
                };
            };
            submit.current = sendData;
            return () => client.destroy();
        }
        else disconnect();
    }, []);

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
                    const dx = Math.max(Math.min((moveX - gestureState.x0), 120), -120);
                    const dy = Math.max(Math.min((moveY - gestureState.y0), 120), -120);
                    submit.current(`${Math.round(dx / 6)} MM ${Math.round(dy / 6)}`);
                }, 100);
            },
            onPanResponderRelease: () => {
                clearInterval(intervalRef.current);
                setIsPressed(false);
            },
        })
    ).current;

    if (response) return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={[globals.colors.primary, globals.colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                pointerEvents="none"
                style={styles.backgroundCircle}
            />
            <ScrollView
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                contentContainerStyle={styles.container}>
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
                <TextInput
                    value={keyboard}
                    keyboardAppearance="dark"
                    onChangeText={setKeyboard}
                    placeholder="Enter something to write..."
                    placeholderTextColor={globals.colors.placeholder}
                    selectionColor={globals.colors.placeholder}
                    style={styles.keyboard}
                    maxLength={1000}
                />
                <View style={styles.keyboardButtons}>
                    <TouchableOpacity
                        onPress={() => {
                            const text = keyboard.trim();
                            if (text.length > 0) {
                                setKeyboard("");
                                submit.current(`WRITE ${text}`);
                            };
                        }}
                        style={[
                            styles.keyboardButton,
                            {
                                borderBottomLeftRadius: globals.window.width / 26,
                                backgroundColor: globals.colors.secondary,
                            }
                        ]}>
                        <Icon
                            name="draw"
                            color={globals.colors.tint}
                            size={globals.window.width / 20}
                            style={{ marginRight: 1 }}
                        />
                        <Text style={styles.keyboardText}>
                            Write it
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => submit.current("BACKSPACE")}>
                        <LinearGradient
                            colors={[globals.colors.secondary, globals.colors.primary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.keyboardButton}>
                            <Icon
                                name="backspace"
                                color={globals.colors.tint}
                                size={globals.window.width / 20}
                                style={{ marginRight: 2 }}
                            />
                            <Text style={styles.keyboardText}>
                                Backspace
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => submit.current("ENTER")}
                        style={[
                            styles.keyboardButton,
                            {
                                borderBottomRightRadius: globals.window.width / 26,
                                backgroundColor: globals.colors.primary
                            }
                        ]}>
                        <Icon
                            name="keyboard-return"
                            color={globals.colors.tint}
                            size={globals.window.width / 20}
                            style={{ marginTop: 2 }}
                        />
                        <Text style={styles.keyboardText}>
                            Enter
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    {...panResponder.panHandlers}
                    style={{
                        backgroundColor: isPressed ? globals.colors.midground : globals.colors.foreground,
                        borderTopRightRadius: globals.window.width / 20,
                        borderTopLeftRadius: globals.window.width / 20,
                        marginBottom: globals.window.width / 42,
                        height: globals.window.width / 2,
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Text style={styles.label}>Hold to mouse movement</Text></View>
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => submit.current("LC")}
                        onLongPress={() => submit.current("HLC")}
                        style={{
                            borderBottomLeftRadius: globals.window.width / 20,
                            backgroundColor: globals.colors.foreground,
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1
                        }}>
                        <Text style={styles.label}>
                            Left-click
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginHorizontal: globals.window.width / 42,
                            height: globals.window.width / 6,
                            flex: 1
                        }}>
                        <TouchableOpacity
                            onPress={() => submit.current("SU")}
                            style={{
                                backgroundColor: globals.colors.midground,
                                flex: 1
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => submit.current("MC")}
                            onLongPress={() => submit.current("HMC")}
                            style={{
                                backgroundColor: globals.colors.foreground,
                                marginVertical: globals.window.width / 90,
                                justifyContent: "center",
                                alignItems: "center",
                                flex: 2
                            }}>
                            <Text style={styles.label}>
                                Mid-click
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => submit.current("SD")}
                            style={{
                                backgroundColor: globals.colors.midground,
                                flex: 1
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => submit.current("RC")}
                        onLongPress={() => submit.current("HRC")}
                        style={{
                            borderBottomRightRadius: globals.window.width / 20,
                            backgroundColor: globals.colors.foreground,
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1
                        }}>
                        <Text style={styles.label}>
                            Right-click
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
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
