import { styles } from "./ExceptionStyles";
import { Text } from "react-native";
import React from "react";

const Exception = ({ message = "" }) => message && (
    <Text style={styles.text}>
        {message}
    </Text>
);

export default Exception;
