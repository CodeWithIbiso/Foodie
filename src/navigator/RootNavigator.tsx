import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import RecipeScreen from "../screens/RecipeScreen";

export type RootStackParamList = {
  TabNavigator: undefined;
  RecipeScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="TabNavigator" component={TabNavigator} />
        <RootStack.Screen name="RecipeScreen" component={RecipeScreen} />
        {/* Add more screens here */}
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
