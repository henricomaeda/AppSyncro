import LinearGradient from "react-native-linear-gradient";
import React, { useState } from "react";
import {
    TouchableOpacity,
    ScrollView,
    TextInput,
    View,
    Text
} from "react-native";
import { globals } from "../../Globals";
import { styles } from "./FormScreenStyles";
import Exception from "../components/Exception";

const FormScreen = ({ navigation, route }) => {
    const [ip, setIp] = useState("127.0.0.1");
    const [port, setPort] = useState(12345);
    const [password, setPassword] = useState("");
    const [ipException, setIpException] = useState("");
    const [portException, setPortException] = useState("");

    const validateIp = () => {
        const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (ipRegex.test(ip)) {
            setIpException("");
            return true;
        };
        setIpException("Please enter a valid IP address.");
        return false;
    };

    const validatePort = () => {
        if (isNaN(port)) setPortException("Please enter a valid port number.");
        else if (port < 1024 || port > 65535) setPortException("Port number must be between 1024 and 65535.");
        else {
            setPortException("");
            return true;
        }
        return false;
    };

    const redefine = () => {
        setIp("");
        setPort("");
        setPassword("");
        setIpException("");
        setPortException("");
    };

    const connect = () => {
        const valid = validateIp() && validatePort();
        if (valid) {
            const params = {
                "serverIp": ip,
                "serverPort": port,
                "serverPassword": password
            };
            navigation.push("MainScreen", params);
        };
    };

    return (
        <ScrollView
            contentContainerStyle={{
                padding: globals.window.width / 30,
                justifyContent: "center",
                flexGrow: 1,
            }}>
            <LinearGradient
                colors={[globals.colors.primary, globals.colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: Math.round(globals.window.width + globals.window.height) / 2,
                    height: globals.window.width * 1.2,
                    width: globals.window.width * 1.2,
                    left: -globals.window.width / 3,
                    top: -globals.window.width / 5,
                    position: "absolute"
                }}
            />
            <View
                style={{
                    marginHorizontal: globals.window.width / 46,
                    marginVertical: globals.window.width / 20
                }}>
                <Text
                    style={{
                        fontSize: globals.window.width / 16,
                        color: globals.colors.tint,
                        fontWeight: "bold",
                    }}>
                    {globals.appName}
                </Text>
                <Text
                    style={{
                        fontSize: globals.window.width / 20,
                        color: globals.colors.tint
                    }}>
                    Connect to a computer host!
                </Text>
            </View>
            <View
                style={{
                    borderTopRightRadius: globals.window.width / 42,
                    borderTopLeftRadius: globals.window.width / 42,
                    paddingHorizontal: globals.window.width / 36,
                    paddingVertical: globals.window.width / 22,
                    backgroundColor: "rgba(31, 31, 36, 0.8)"
                }}>
                <Text style={[styles.label, { marginTop: 0 }]}>
                    Server IP
                </Text>
                <TextInput
                    value={ip}
                    onBlur={validateIp}
                    onChangeText={(newIp) => setIp(newIp.trim())}
                    placeholder="Enter the server IP address e.g., 127.0.0.1"
                    placeholderTextColor={globals.colors.placeholder}
                    keyboardType="numeric"
                    style={styles.entry}
                />
                <Exception message={ipException} />
                <Text style={styles.label}>
                    Server Port
                </Text>
                <TextInput
                    onBlur={validatePort}
                    value={isNaN(port) ? "" : port.toString()}
                    onChangeText={(newPort) => setPort(parseInt(newPort.trim()))}
                    placeholder="Enter the server port e.g., 12345"
                    placeholderTextColor={globals.colors.placeholder}
                    keyboardType="numeric"
                    style={styles.entry}
                />
                <Exception message={portException} />
                <Text style={styles.label}>
                    Server Password
                </Text>
                <TextInput
                    value={password}
                    onChangeText={(newPassword) => setPassword(newPassword.trim())}
                    placeholder="Enter the server password if it has one."
                    placeholderTextColor={globals.colors.placeholder}
                    style={styles.entry}
                />
            </View>
            <View
                style={{
                    borderBottomRightRadius: globals.window.width / 42,
                    borderBottomLeftRadius: globals.window.width / 42,
                    backgroundColor: globals.colors.midground,
                    padding: globals.window.width / 26,
                    justifyContent: "space-between",
                    flexDirection: "row"
                }}>
                <TouchableOpacity
                    onPress={() => redefine()}>
                    <LinearGradient
                        colors={[globals.colors.primary, globals.colors.primary, globals.colors.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Redefine
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => connect()}>
                    <LinearGradient
                        colors={[globals.colors.secondary, globals.colors.secondary, globals.colors.primary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Connect
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default FormScreen;
