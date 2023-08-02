import { ScrollView, Text } from "react-native";
import * as React from "react";

const MainScreen = ({ navigation, route }) => (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text>
            {route.name}
        </Text>
    </ScrollView>
);

export default MainScreen;
