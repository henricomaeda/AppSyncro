import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import FormScreen from "./screens/FormScreen/FormScreen";
import MainScreen from "./screens/MainScreen/MainScreen";
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
                initialRouteName="FormScreen"
                screenOptions={{ headerTitle: globals.appName, headerShown: false }}>
                <Stack.Screen name="FormScreen" component={FormScreen} />
                <Stack.Screen name="MainScreen" component={MainScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
