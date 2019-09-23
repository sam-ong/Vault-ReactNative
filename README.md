# SWEN325 - React-Native Implementation of Vault Application 

This is a TV show manager application that Annisha Akosah (300399598) and Sam Ong (300363819) created for our mobile app development course, SWEN325. We are Poopy Software™ 💩

## Version information
```
 React Native Environment Info:
    Binaries:
      Node: 12.6.0 - /usr/local/bin/node
      Yarn: 1.17.3 - /usr/local/bin/yarn
      npm: 6.11.3 - /usr/local/bin/npm
      Watchman: 4.9.0 - /usr/local/bin/watchman
    SDKs:
      iOS SDK:
        Platforms: iOS 12.4, macOS 10.14, tvOS 12.4, watchOS 5.3
      Android SDK:
        API Levels: 28
        Build Tools: 28.0.3, 29.0.2
        System Images: android-28 | Google APIs Intel x86 Atom
    IDEs:
      Android Studio: 3.5 AI-191.8026.42.35.5791312
      Xcode: 10.3/10G8 - /usr/bin/xcodebuild
    npmPackages:
      react-native: 0.59.9 => 0.59.9 
    npmGlobalPackages:
      react-native-cli: 2.0.1
```

## Set up stuff

1. Follow the tutorial [here](https://github.com/invertase/react-native-firebase-starter) to get started 

2. Follow the instructions [here](https://medium.com/@eng.sohaddader/start-with-react-native-firebase-authentication-and-realtime-database-services-466359d577c6) for navigation and firebase setup stuff

3. Use createSwitchNavigator instead of Switch Navigator, [here](https://medium.com/@saishaddai/react-native-undefined-is-not-a-function-evaluating-0-reactnavigation-stacknavigator-1d9979eba2e8) and createAppContainer

## To run the application

1. Clone the git repository

```
git clone https://gitlab.ecs.vuw.ac.nz/ongsama/vault-react.git
```

2. Navigate into the folder

```
cd vault-react
```

3. Install dependencies

```
npm install
```

4. Launch emulator

```
react-native run-ios with xcode installed or react-native run-android with an android device connected or an android emulator
```



## Troubleshooting 


>  Cannot read property Direction of undefined error

https://doreentseng.github.io/cannot-read-property-direction-of-undefined/


>  Problems running the app using XCode 

https://github.com/facebook/react-native/issues/24450#issuecomment-516760157

## External dependencies

* Side-Swipe `yarn add react-native-sideswipe`  
* React Native Elements`yarn add react-native-elements`  
* Segments `npm install react-native-segment-control`


## Notes about external components

We used firebase for authentication and cloud storage. 

We used the [TMDB API](https://developers.themoviedb.org/3) for our TV show database.



Thanks from the team at Poopy Software™ 💩

