//import liraries
import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  FAB,
  Paragraph,
  Portal,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import useAppContext from "../../hooks/useAppContext";
// create a component
const Home = (props) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const { isDarkTheme, setIsDarkTheme } = useAppContext();
  const theme = useTheme();
  console.log(isDarkTheme);
  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        translucent
        backgroundColor="rgba(255, 255, 255,0)"
        hidden={false}
        showHideTransition="fade"
      />
      <ScrollView
        style={{ flexGrow: 1, width: "100%" }}
        contentContainerStyle={{ alignItems: "center", justifyContent: "center", height: "100%" }}
      >
        <Card style={{ marginVertical: 10, width: "80%", height: "50%", borderRadius: 10, alignItems: "center" }}>
          <Card.Content>
            <Avatar.Text size={50} label="XD" />
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
      <FAB
        style={styles.fab}
        large
        label={isDarkTheme ? "Dark" : "Light"}
        onPress={() => setIsDarkTheme(!isDarkTheme)}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  fab: { position: "absolute", margin: 16, right: 0, bottom: 0 },
});

//make this component available to the app
export default Home;
