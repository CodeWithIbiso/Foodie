import { View, Text, TextInput } from "react-native";
import React, { useCallback } from "react";
import { useTailwind } from "tailwind-rn/dist";
import Entypo from "react-native-vector-icons/Entypo";
import theme from "../theme";
import { Divider, Icon } from "@rneui/base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Preferences = () => {
  const tw = useTailwind();

  const [fontsLoaded] = useFonts({
    "mrt-mid": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "mrt-bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "mrt-xbold": require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  return (
    <View
      style={{
        ...tw("flex-1 w-full h-52 bg-white  justify-center content-center p-4"),
        borderBottomLeftRadius: theme.sizes.mid,
        borderBottomRightRadius: theme.sizes.mid,
        backgroundColor: theme.colors.white,
        marginTop: -theme.sizes.mid,
        zIndex: -theme.sizes.xmin,
      }}
      onLayout={onLayoutRootView}
    >
      {/* REPEAT LAST ORDER */}
      <View
        style={{
          paddingHorizontal: theme.sizes.max,
        }}
      >
        <View
          style={{
            ...tw("flex-row content-center"),
            marginBottom: theme.sizes.min,
          }}
        >
          <Icon
            name="refresh"
            type="EvilIcons"
            color={theme.colors.dark}
            size={theme.sizes.min}
          />
          <Text
            style={{
              ...tw("text-black font-semibold"),
              marginLeft: theme.sizes.min,
            }}
          >
            Repeat last recipe
          </Text>
        </View>
        <Divider />
      </View>
      {/* HELP ME CHOOSE */}
      <View
        style={{
          paddingHorizontal: theme.sizes.max,
          marginTop: theme.sizes.min,
        }}
      >
        <View
          style={{
            ...tw("flex-row content-center"),
            marginBottom: theme.sizes.min,
          }}
        >
          <Icon
            name="question"
            type="Antdesign"
            color={theme.colors.dark}
            size={theme.sizes.min}
          />
          <Text
            style={{
              ...tw("text-black font-semibold"),
              marginLeft: theme.sizes.min + 5,
            }}
          >
            Help me choose
          </Text>
        </View>
        <Divider />
      </View>
      {/* SURPRISE ME */}
      <View
        style={{
          paddingHorizontal: theme.sizes.max,
          marginTop: theme.sizes.min,
        }}
      >
        <View
          style={{
            ...tw("flex-row content-center"),
            marginBottom: theme.sizes.min,
          }}
        >
          <Entypo
            name="bell"
            color={theme.colors.dark}
            size={theme.sizes.min}
          />
          <Text
            style={{
              ...tw("text-black font-semibold"),
              marginLeft: theme.sizes.min,
            }}
          >
            Surprise me
          </Text>
        </View>
        <Divider />
      </View>
    </View>
  );
};

export default Preferences;
