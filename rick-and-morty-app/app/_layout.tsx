// RootLayout.tsx
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./home";
import DetailsScreen from "./details";
import FormScreen from "./form";

const Drawer = createDrawerNavigator();

const RootLayout = () => {
  return (
    <Drawer.Navigator initialRouteName="home">
      <Drawer.Screen name="home" component={HomeScreen} options={{ title: "Characters" }} />
      <Drawer.Screen name="details" component={DetailsScreen} options={{ title: "Details" }} />
      <Drawer.Screen name="form" component={FormScreen} options={{ title: "Add Character" }} />
    </Drawer.Navigator>
  );
};

export default RootLayout;
