import { View, Text, ScrollView, StatusBar } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import TopSection from "../components/TopSection";
import Body from "../components/Body";
import Preferences from "../components/Preferences";
import theme from "../theme";

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen = () => {
  const navigation = useNavigation<CustomerScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const tw = useTailwind();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.homeBg }}>
      <StatusBar barStyle={"light-content"} />
      <TopSection />
      <Preferences />
      <Body />
    </ScrollView>
  );
};

export default HomeScreen;
