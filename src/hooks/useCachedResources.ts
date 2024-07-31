import { loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import client from "../api/client";
import { getJwtExpirationDate } from "../lib/jwt";
import { useAsyncStorage } from "../lib/storage";
import { Session } from "../types/auth";
import { useAccountStore } from "../stores";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [session, setSession] = useState<Session>(null);
  const [onboarding, setOnboarding] = useState();
  const { getData } = useAsyncStorage();
  const { setAccounts } = useAccountStore();

  const quicksandFontConfig = {
    "font-regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "font-300": require("../assets/fonts/Quicksand-Light.ttf"),
    "font-500": require("../assets/fonts/Quicksand-Medium.ttf"),
    "font-600": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "font-700": require("../assets/fonts/Quicksand-Bold.ttf"),
  };

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {


        SplashScreen.preventAutoHideAsync();

        await loadAsync({
          ...quicksandFontConfig,
        });

        const savedAccounts = await getData("accounts");
        const parsedAccounts = JSON.parse(savedAccounts)

        if (parsedAccounts instanceof Array) {
          setAccounts(parsedAccounts);
        }

        const jsonSession = await getData("session");
        const session = JSON.parse(jsonSession) as Session;

        let expirationDate = null;

        if (session?.token) {
          expirationDate = getJwtExpirationDate(session.token);
        }

        if (expirationDate !== null && new Date() < expirationDate) {
          client.defaults.headers.common.Authorization = `Bearer ${session.token}`
          setSession(session);
        }

        const onboarding = await getData("onboarding");
        setOnboarding(JSON.parse(onboarding));

      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete, session, onboarding };
}
