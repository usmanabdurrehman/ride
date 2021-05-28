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
import IconButton from "../../component/iconButton";

const Profile = (props) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const [image, setImage] = React.useState({
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXLARk2jdSEG8IAmKfxZBU-9XLREbeyd7OQ&usqp=CAU",
  });
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
            <Title style={{ color: globalTheme.text, fontSize: 30 * heightRef }}>Profile</Title>
          </Card.Content>
        </Card>
        <View style={{ flex: 1, width: "100%", alignItems: "center", paddingVertical: 20 * heightRef }}>
          <Card
            elevation={10}
            style={{
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              width: "90%",
              justifyContent: "center",
              overflow: "hidden",
              backgroundColor: "orange",
            }}
          >
            <Card.Content style={{ alignItems: "center" }}>
              <View style={{ justifyContent: "center" }}>
                <IconButton>
                  <Avatar.Image size={140 * heightRef} source={image} />
                </IconButton>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
      <FAB style={styles.fab} icon={"account-edit"} onPress={() => props.navigation.navigate("EditProfile")} />
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
  fab: { position: "absolute", right: 20, bottom: 20 },
});

//make this component available to the app
export default Profile;
