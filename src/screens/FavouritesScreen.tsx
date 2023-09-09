import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Touchable,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import theme from "../theme";
import { Icon } from "@rneui/base";
import navigationNames from "../navigationNames";

const FavouritesScreen = () => {
  const navigation = useNavigation();
  const favourites_ = useSelector((state) => state.favourites);
  const [favourites, setFavourites] = useState(favourites_);
  const [text, setText] = useState("");

  const focused = useIsFocused();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    if (!focused) {
      setText("");
      setFavourites(favourites_);
    }
  }, [focused]);

  const tw = useTailwind();
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.homeBg }}>
      <StatusBar barStyle={"dark-content"} />
      <Text style={tw("text-center font-bold mb-2 text-lg")}>Favourites</Text>
      <View
        style={{
          marginHorizontal: theme.sizes.min,
          height: theme.sizes.xmax,
          backgroundColor: theme.colors.grey,
          alignItems: "center",
          paddingHorizontal: 10,
          borderRadius: theme.sizes.min,
          ...tw("flex-row mb-4"),
        }}
      >
        <TextInput
          placeholder="Filter favourites..."
          placeholderTextColor={theme.colors.lightgrey}
          onChangeText={(text_) => {
            const f = favourites_.filter((favourite) =>
              favourite.name.toLowerCase().includes(text_.toLowerCase())
            );
            setFavourites(f);
            setText(text_);
          }}
          value={text}
          style={{
            ...tw("w-full"),
            color: theme.colors.lightgrey,
            marginLeft: 4,
          }}
        />
      </View>

      {favourites.length > 0 ? (
        <ScrollView
          style={{ ...tw("px-2"), backgroundColor: theme.colors.homeBg }}
        >
          {[...favourites].map((favourite, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate(navigationNames.RecipeScreen, {
                  topCategory: favourite,
                })
              }
              style={{
                ...tw("w-full  bg-white rounded-xl mb-4"),
              }}
            >
              <Image
                style={{
                  ...tw("w-full h-64 rounded-xl mb-4"),
                }}
                source={{ uri: favourite.thumbnail_url }}
              />
              <View style={tw("px-2 mb-4")}>
                <Text style={tw("font-bold")}>{favourite.name}</Text>
                <Text
                  style={tw("font-thin ")}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {favourite.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={tw("h-40")} />
        </ScrollView>
      ) : (
        <View style={tw("px-2 ")}>
          <View style={tw("mt-2")}>
            <Text style={tw("text-center font-thin")}>
              No favourites available
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavouritesScreen;
