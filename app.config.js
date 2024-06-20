module.exports = {
  "expo": {
    "name": "muh-money",
    "description": "My money is infinite",
    "githubUrl": "https://github.com/bsrodrigue/pmub-rn",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./src/assets/icons/android/res/mipmap-xxxhdpi/ic_launcher.png",
    "userInterfaceStyle": "light",
    "splash": {
      "backgroundColor": "#22A39F"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "plugins": [
      "expo-font",
    ]
    ,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/icons/android/res/mipmap-xxxhdpi/ic_launcher.png",
        "backgroundColor": "#ffffff"
      },
      "package": "bf.bsrodrigue.pmub"
    },
    "extra": {
      "eas": {
        "projectId": "2a95f01d-48ff-457c-a8b5-06cc62cbee7a"
      },
      "API_URL": process.env['EXPO_PUBLIC_API_URL'],
    },
    "owner": "bsrodrigue",
    "slug": "pmub"
  }
};
