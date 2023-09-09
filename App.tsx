import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigator/RootNavigator";
import { store } from "./src/store/store";
import { Provider, useSelector } from "react-redux";

export default function App() {
  return (
    //@ts-ignore - tailwind provider is missing type definition
    <TailwindProvider utilities={utilities}>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </TailwindProvider>
  );
}
