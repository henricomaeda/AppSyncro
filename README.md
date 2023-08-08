# uRemotePC - Version 1.0.3

Welcome to uRemotePC, a remote desktop control application for controlling your computer from a mobile device.

## Overview

uRemotePC is a software solution that enables you to remotely control your computer from your mobile device. The project consists of two main components: the "mobile" app (built with React Native) and the "desktop" server (Python).

- The "mobile" app (Android) allows you to connect to your computer from your mobile device and control it remotely.
- The "desktop" server (Python) opens a socket server that listens for incoming connections from the mobile app and facilitates remote control.

## Features

- Remote desktop control from your mobile device.
- User-friendly and intuitive mobile app interface.
- Low-latency communication between the mobile app and the desktop server.
- Secure and encrypted communication.

## Developer Instructions

### Mobile App (React Native)

1. Navigate to the "mobile" folder in the project directory: `cd mobile`
2. Install the required packages: `npm install`
3. Run the app on an Android device or emulator: `npx react-native run-android`

### Desktop Server (Python)

1. Make sure you have Python installed.
2. Navigate to the "desktop" folder in the project directory: `cd desktop`
3. Install the required Python libraries: `pip install -r requirements.txt`

## Usage

1. Make sure both your mobile device and computer are connected to the same network.
2. Open the uRemotePC app on your mobile device.
3. Enter the following details in the app:
   - IP address: Enter the IP address of your computer.
   - Port: Enter the port number used by the desktop server (default is 12345).
   - Password: Enter the secure password for authentication.
4. Tap "Connect" to establish a secure connection with the desktop server.
5. You can now remotely control your computer from your mobile device.

### User Instructions

1. Download the [APK installer](mobile/installer/uRemotePC_v1.0.3.apk) from the "mobile" folder.
2. Install the APK on your Android device.
3. Launch the uRemotePC app on your mobile device.

4. Download the [executable file](desktop/release/uRemotePC_v1.0.3.exe) from the "desktop" folder.
5. Run the executable on your Windows computer.
6. The desktop server will start and wait for incoming connections.

## Acknowledgments and Attributions

- This project was inspired by the need for remote desktop control.
- Special thanks to [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com) who made all the icons.
