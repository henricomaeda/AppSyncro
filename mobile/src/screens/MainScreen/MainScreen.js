import React, { useRef, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import TcpSocket from "react-native-tcp-socket";
import { globals } from "../../Globals";
import {
    ActivityIndicator,
    TouchableOpacity,
    PanResponder,
    Image,
    View,
    Text,
    TextInput
} from "react-native";
import styles from "./MainScreenStyles";
import KeyButton from "../../components/KeyButton/KeyButton";

const MainScreen = ({ navigation, route }) => {
    const [replace, setReplace] = useState(false);
    const [response, setResponse] = useState("");
    const [keyboard, setKeyboard] = useState("");
    const submit = useRef(console.log);

    useEffect(() => {
        const disconnect = () => navigation.isFocused() && navigation.popToTop();
        if (route.params) {
            const serverData = JSON.parse(route.params);
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
                    const dx = Math.max(Math.min((moveX - gestureState.x0), 260), -260);
                    const dy = Math.max(Math.min((moveY - gestureState.y0), 260), -260);
                    submit.current(`${Math.round(dx / 10)} MM ${Math.round(dy / 10)}`);
                }, 80);
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
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    {replace ? (
                        <>
                            <KeyButton
                                sourcePath={require("../../assets/images/Q.png")}
                                onHold={() => submit.current("KD Q")}
                                onRelease={() => submit.current("KU Q")}
                            />
                            <KeyButton
                                sourcePath={require("../../assets/images/W.png")}
                                onHold={() => submit.current("KD W")}
                                onRelease={() => submit.current("KU W")}
                            />
                            <KeyButton
                                sourcePath={require("../../assets/images/E.png")}
                                onHold={() => submit.current("KD E")}
                                onRelease={() => submit.current("KU E")}
                            />
                            <KeyButton
                                sourcePath={require("../../assets/images/R.png")}
                                onHold={() => submit.current("KD R")}
                                onRelease={() => submit.current("KU R")}
                            />
                            <KeyButton
                                sourcePath={require("../../assets/images/A.png")}
                                onHold={() => submit.current("KD R")}
                                onRelease={() => submit.current("KU R")}
                            />
                            <KeyButton
                                sourcePath={require("../../assets/images/S.png")}
                                onHold={() => submit.current("KD S")}
                                onRelease={() => submit.current("KU S")}
                            />
                            <KeyButton
                                sourcePath={require("../../assets/images/D.png")}
                                onHold={() => submit.current("KD D")}
                                onRelease={() => submit.current("KU D")}
                            />
                            <KeyButton
                                sourcePath={require("../../assets/images/F.png")}
                                onHold={() => submit.current("KD F")}
                                onRelease={() => submit.current("KU F")}
                            />
                        </>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => submit.current("SEL")} style={styles.button}>
                                <Image style={styles.buttonImage} source={require("../../assets/images/select.png")} />
                                <Text style={styles.buttonText}>Select all</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => submit.current("CP")} style={styles.button}>
                                <Image style={styles.buttonImage} source={require("../../assets/images/copy.png")} />
                                <Text style={styles.buttonText}>Copy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => submit.current("PST")} style={styles.button}>
                                <Image style={styles.buttonImage} source={require("../../assets/images/paste.png")} />
                                <Text style={styles.buttonText}>Paste</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => submit.current("ESC")} style={styles.button}>
                                <Image style={styles.buttonImage} source={require("../../assets/images/esc.png")} />
                                <Text style={styles.buttonText}>Press Esc</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => submit.current("LS")} style={styles.button}>
                                <Image style={styles.buttonImage} source={require("../../assets/images/lock.png")} />
                                <Text style={styles.buttonText}>Lock it</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => submit.current("INC")} style={styles.button}>
                                <Image style={styles.buttonImage} source={require("../../assets/images/increase.png")} />
                                <Text style={styles.buttonText}>Increase</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => submit.current("DEC")} style={styles.button}>
                                <Image style={styles.buttonImage} source={require("../../assets/images/decrease.png")} />
                                <Text style={styles.buttonText}>Decrease</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => submit.current("HBNT")} style={styles.button}>
                                <Image style={styles.buttonImage} source={require("../../assets/images/hibernate.png")} />
                                <Text style={styles.buttonText}>Hibernate</Text>
                            </TouchableOpacity>
                        </>
                    )}
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
                                submit.current(`WRT ${text}`);
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
                    <TouchableOpacity onPress={() => submit.current("BSP")}>
                        <LinearGradient
                            colors={[globals.colors.secondary, globals.colors.primary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                styles.keyboardButton,
                                { marginHorizontal: globals.window.width / 60 }
                            ]}>
                            <Icon
                                name="backspace"
                                color={globals.colors.tint}
                                size={globals.window.width / 22}
                                style={{ marginRight: 3 }}
                            />
                            <Text style={styles.keyboardText}>
                                Backspace
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => submit.current("ENT")}
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
                            style={{ marginRight: 2, marginTop: 2 }}
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
                    }}>
                    <Text style={styles.label}>Hold to mouse movement</Text>
                </View>
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
                            height: globals.window.width / 5.2,
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
            </View>
            <TouchableOpacity
                onPress={() => setReplace(!replace)}
                style={styles.replaceButton}>
                <Image
                    source={require("../../assets/images/replace.png")}
                    style={styles.replaceButtonImage}
                />
            </TouchableOpacity>
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
