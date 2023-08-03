import * as React from "react";
import {
    ScrollView,
    Text
} from "react-native";
import styles from "./MainScreenStyles";

const MainScreen = ({ navigation, route }) => (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text>
            {route.name}
        </Text>
    </ScrollView>
);

export default MainScreen;
