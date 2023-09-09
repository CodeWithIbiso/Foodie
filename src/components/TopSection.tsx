import { View, Text, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { SearchBar } from "@rneui/themed";
import { useWindowDimensions } from "react-native";
import theme from "../theme";
import { Icon } from "@rneui/base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const TopSection = () => {
  const tw = useTailwind();
  const [input, setInput] = useState<string>("");

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
        ...tw("flex-1 w-full h-52 bg-black justify-center content-center p-4"),
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
      }}
      onLayout={onLayoutRootView}
    >
      <View
        style={{
          ...tw("flex-row items-center justify-between"),
          marginVertical: theme.sizes.max,
          marginHorizontal: theme.sizes.min,
        }}
      >
        <Text
          style={{
            ...tw("text-white text-4xl font-bold"),
            // fontFamily: "mrt-mid",
          }}
        >
          Foodie~ {"\n"}
          <Text
            style={{
              ...tw("text-white text-xs font-thin"),
            }}
          >
            Your recipie handbook...
          </Text>
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: theme.sizes.min,
          height: theme.sizes.xmax,
          backgroundColor: theme.colors.grey,
          alignItems: "center",
          paddingHorizontal: 10,
          borderRadius: theme.sizes.min,
          ...tw("flex-row"),
        }}
      >
        <Icon
          name="search"
          type="AntDesign"
          color={theme.colors.lightgrey}
          size={theme.sizes.min}
        />
        <TextInput
          placeholder="Search for something tasty..."
          placeholderTextColor={theme.colors.lightgrey}
          onChangeText={setInput}
          value={input}
          style={{
            ...tw("w-full"),
            // fontFamily: "mrt-mid",
            color: theme.colors.lightgrey,
            marginLeft: 4,
          }}
        />
      </View>
    </View>
  );
};

export default TopSection;
