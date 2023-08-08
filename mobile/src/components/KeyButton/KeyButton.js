import { PanResponder, Image } from "react-native";
import React, { useRef, useState } from "react";
import styles from "./KeyButtonStyles";

const KeyButton = ({ sourcePath, onPress = () => null }) => {
    const [isPressed, setIsPressed] = useState(false);
    const intervalRef = useRef(null);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (event, gestureState) => {
                setIsPressed(true);
                intervalRef.current = setInterval(onPress, 60);
            },
            onPanResponderRelease: () => {
                clearInterval(intervalRef.current);
                setIsPressed(false);
            },
        })
    ).current;

    return (
        <Image
            source={sourcePath}
            {...panResponder.panHandlers}
            style={[
                styles.keyButtonImage,
                { opacity: isPressed ? 0.5 : 1.0 }
            ]}
        />
    );
};

export default KeyButton;
