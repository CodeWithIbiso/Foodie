import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavouritesScreen from "../screens/FavouritesScreen";
import HomeScreen from "../screens/HomeScreen";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import theme from "../theme";

export type TabStackParamList = {
  Home: undefined;
  Favourites: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.dark,
        tabBarInactiveTintColor: theme.colors.lightgrey,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name == "Home") {
            return (
              <Icon
                name="home"
                type="entypo"
                color={focused ? theme.colors.dark : theme.colors.lightgrey}
              />
            );
          } else if (route.name == "Favourites") {
            return (
              <Icon
                name="heart"
                type="fontisto"
                color={focused ? theme.colors.dark : theme.colors.lightgrey}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
