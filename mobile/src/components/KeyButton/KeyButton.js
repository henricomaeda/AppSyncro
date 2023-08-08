import { PanResponder, Image } from "react-native";
import React, { useRef, useState } from "react";
import styles from "./KeyButtonStyles";

const KeyButton = ({ sourcePath, onHold = () => null, onRelease = () => null }) => {
    const [isPressed, setIsPressed] = useState(false);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (event, gestureState) => {
                setIsPressed(true);
                onHold();
            },
            onPanResponderRelease: () => {
                setIsPressed(false);
                onRelease();
            }
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
