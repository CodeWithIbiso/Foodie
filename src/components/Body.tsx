import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useTailwind } from "tailwind-rn/dist";
// import { Image } from "@rneui/base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import theme from "../theme";
import { useWindowDimensions } from "react-native";
import { db, ref, onValue } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import navigationNames from "../navigationNames";

SplashScreen.preventAutoHideAsync();
// source={{ uri: "https://source.unsplash.com/1600x900/?portrait" }}
interface TopCategory {
  name: string;
  thumbnail_url: string;
}
type CardComponentProps = {
  index: number;
  topCategory: TopCategory;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
};
const CardComponent = ({
  index,
  setSelected,
  topCategory,
}: CardComponentProps) => {
  const navigation = useNavigation();
  const tw = useTailwind();
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(navigationNames.RecipeScreen, { topCategory })
      }
      key={index}
      style={{
        padding: theme.sizes.mid,
        width: width / 2.3,
        minHeight: width / 1.8,
        paddingVertical: theme.sizes.xmin,
        backgroundColor: theme.colors.white,
        borderRadius: theme.sizes.mid,
        marginBottom: theme.sizes.min,
      }}
    >
      <Image
        source={{ uri: topCategory.thumbnail_url }}
        style={{
          ...tw("w-100 h-32 mt-2"),
          borderRadius: theme.sizes.mid,
        }}
      />
      <Text style={tw("text-center mt-2")}>{topCategory.name}</Text>
    </TouchableOpacity>
  );
};

const TopCategories = () => {
  const [selected, setSelected] = useState<number>();
  const tw = useTailwind();
  const topCategories = [
    {
      name: "Vegan",
    },
    {
      name: "Coffee",
    },
    {
      name: "Donut",
    },
    {
      name: "Ice cream",
    },
    {
      name: "Mangoes",
    },
  ];

  return (
    <View style={{ marginTop: theme.sizes.min }}>
      <Text
        style={{
          marginVertical: theme.sizes.min,
          fontWeight: "bold",
          fontSize: theme.sizes.min,
          marginLeft: theme.sizes.min,
        }}
      >
        Top Categories
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topCategories.map((topCategory, index) => (
          <TouchableOpacity
            onPress={() => setSelected(index)}
            key={index}
            style={{
              marginLeft: index == 0 ? theme.sizes.min : 0,
              padding: theme.sizes.mid,
              paddingVertical: theme.sizes.xmin,
              backgroundColor: theme.colors.white,
              marginRight: theme.sizes.xmin,
              borderRadius: theme.sizes.xmin,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{topCategory.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

//@ts-ignore - tailwind provider is missing type definition

const RecommendedForYou = ({ topCategories }) => {
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<number>();
  const tw = useTailwind();

  return (
    <View style={{ marginTop: theme.sizes.min }}>
      <Text
        style={{
          marginVertical: theme.sizes.min,
          fontWeight: "bold",
          fontSize: theme.sizes.min,
          marginLeft: theme.sizes.min,
        }}
      >
        Recommended for you
      </Text>
      <ScrollView
        contentContainerStyle={{ alignSelf: "center" }}
        showsHorizontalScrollIndicator={false}
      >
        {topCategories
          .slice(0, topCategories.length / 2)
          .map((topCategory, index) => (
            <View
              style={{
                ...tw("flex-row"),
                justifyContent: "space-between",
                width: width - theme.sizes.min * 2,
              }}
            >
              <CardComponent
                index={index}
                setSelected={setSelected}
                topCategory={topCategory}
              />

              <CardComponent
                index={index + topCategories.length / 2}
                setSelected={setSelected}
                topCategory={topCategories[index + topCategories.length / 2]}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const Body = () => {
  const tw = useTailwind();

  const [topCategories, setTopCategories] = useState([]);
  useLayoutEffect(() => {
    const startcountref = ref(db, "recipes/");
    onValue(startcountref, (snapshot) => {
      const data_ = snapshot.val();
      const res = data_;
      setTopCategories(res);
    });
  }, []);
  return (
    <View>
      <TopCategories />
      <RecommendedForYou topCategories={topCategories} />
      {/* <Text>Body</Text> */}
      {/* <Image
        source={{ uri: "https://source.unsplash.com/1600x900/?portrait" }}
        containerStyle={tw("w-100 h-40")}
        PlaceholderContent={<ActivityIndicator />}
      /> */}
    </View>
  );
};

export default Body;
