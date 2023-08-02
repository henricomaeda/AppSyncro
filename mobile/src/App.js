import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import * as React from "react";

import FormScreen from "./screens/FormScreen";
import MainScreen from "./screens/MainScreen";
import { globals } from "./Globals";

const Stack = createNativeStackNavigator();
const customTheme = {
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        background: globals.colors.background,
    }
};

const App = () => {
    return (
        <NavigationContainer theme={customTheme}>
            <Stack.Navigator
                initialRouteName="MainScreen"
                screenOptions={({ navigation, route }) => ({
                    headerTitle: globals.appName,
                    headerLeft: () => route.name === "MainScreen" && (
                        <TouchableOpacity
                            style={{ marginRight: globals.window.width / 22 }}
                            onPress={null}>
                            <Icon
                                color={globals.colors.placeholder}
                                size={globals.window.width / 16.2}
                                name="arrow-back"
                            />
                        </TouchableOpacity>
                    )
                })}>
                <Stack.Screen name="FormScreen" component={FormScreen} />
                <Stack.Screen name="MainScreen" component={MainScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
