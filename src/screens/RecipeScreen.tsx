import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn/dist";
import theme from "../theme";
import { StatusBar } from "react-native";
import { Icon } from "@rneui/base";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import { useDispatch, useSelector } from "react-redux";
import { setFavourites } from "../store/app";
type videoProp = {
  videoUrl: string;
};

const RecipeScreen = (props: any) => {
  const selectedItem = props.route.params.topCategory;
  const favourites = useSelector((state: object) => state.favourites);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tw = useTailwind();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.homeBg }}>
      <StatusBar hidden />
      {/* IMAGE */}
      <View style={{}}>
        <Image
          source={{ uri: selectedItem.thumbnail_url }}
          style={{
            ...tw("w-100 h-80"),
            borderBottomLeftRadius: theme.sizes.max,
            borderBottomRightRadius: theme.sizes.max,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: theme.sizes.min,
            top: theme.sizes.mid,
            backgroundColor: theme.colors.white,
            alignItems: "center",
            justifyContent: "center",
            width: theme.sizes.max,
            height: theme.sizes.max,
            borderRadius: theme.sizes.min,
            paddingLeft: 5,
          }}
        >
          <Icon
            name="arrow-back-ios"
            type="MaterialIcons"
            size={theme.sizes.min}
            color={theme.colors.dark}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dispatch(setFavourites(selectedItem));
          }}
          style={{
            position: "absolute",
            right: theme.sizes.min,
            top: theme.sizes.mid,
            backgroundColor: theme.colors.white,
            alignItems: "center",
            justifyContent: "center",
            width: theme.sizes.max,
            height: theme.sizes.max,
            borderRadius: theme.sizes.min,
          }}
        >
          <Icon
            name="heart"
            type="fontisto"
            size={theme.sizes.min}
            color={
              favourites.includes(selectedItem)
                ? theme.colors.dark
                : theme.colors.lightgrey
            }
          />
        </TouchableOpacity>
      </View>
      {/* CONTENT */}
      <View style={tw("px-4 my-2")}>
        <Text style={tw("font-bold text-base text-center my-2")}>
          {selectedItem.name}
        </Text>
        <Text style={tw("font-bold text-base")}>Description</Text>
        <Text style={tw("font-extralight text-sm")}>
          {selectedItem.description}
        </Text>
      </View>
      {/* INSTRUCTIONS */}
      <View style={tw("px-4 my-2")}>
        <Text style={tw("font-bold text-base")}>Instructions</Text>
        {selectedItem.instructions.map((instruction: string | object) => (
          <View style={tw("flex-row")}>
            <Icon name="dot-single" type="entypo" />
            <Text style={tw("font-extralight text-sm ")}>
              {typeof instruction == "string"
                ? instruction
                : instruction.display_text}
            </Text>
          </View>
        ))}
      </View>

      {selectedItem.original_video_url ? (
        <View style={tw("mb-8")}>
          <VideoPlayer
            style={{
              height: width,
              width,
            }}
            videoProps={{
              shouldPlay: true,
              //   resizeMode: ResizeMode.CONTAIN,
              source: {
                uri: selectedItem.original_video_url,
              },
            }}
          />
        </View>
      ) : null}
      <View style={tw("h-40")} />
    </ScrollView>
  );
};

export default RecipeScreen;
