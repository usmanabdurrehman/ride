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
import { EventRegister } from "react-native-event-listeners";
import { heightRef } from "../../contants/screenSize";

const EditProfile = (props) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const { isDarkTheme, setIsDarkTheme, theme: globalTheme } = useAppContext();
  const theme = useTheme();
  console.log(isDarkTheme);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: globalTheme.background,
      }}
    >
      <ScrollView
        style={{ flexGrow: 1, width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingVertical: 20 * heightRef,
        }}
      >
        <Card
          elevation={10}
          style={{
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            width: "90%",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: globalTheme.tint,
          }}
        >
          <Card.Content style={{ paddingVertical: 20 * heightRef }}>
            <Title style={{ color: globalTheme.text, fontSize: 30 * heightRef }}>Welcome ali</Title>
          </Card.Content>
        </Card>
        <View style={{ flex: 1 }}></View>
      </ScrollView>
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
  fab: { position: "absolute", right: 0, bottom: 0 },
});

//make this component available to the app
export default EditProfile;
