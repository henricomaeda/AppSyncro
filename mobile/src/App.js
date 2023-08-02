import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import FormScreen from "./screens/FormScreen";
import MainScreen from "./screens/MainScreen";
import { globals } from "./Globals";

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="FormScreen"
                screenOptions={({ navigation, route }) => ({ headerTitle: globals.appName })}>
                <Stack.Screen name="FormScreen" component={FormScreen} />
                <Stack.Screen name="MainScreen" component={MainScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
