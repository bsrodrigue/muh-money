module.exports = {
  "expo": {
    "name": "muh_money",
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
      "package": "bf.bsrodrigue.muh_money"
    },
    "extra": {
      "eas": {
        "projectId": "9b29a936-2e5e-4ea1-a6a3-09ad57d6494a"
      },
      "API_URL": process.env['EXPO_PUBLIC_API_URL'],
    },
    "owner": "bsrodrigue",
    "slug": "muh_money"
  }
};
