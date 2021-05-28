//import liraries
import React from "react";
import { ScrollView, StyleSheet, View, FlatList } from "react-native";
import { Card, FAB, Portal, Title, useTheme } from "react-native-paper";
import { heightRef, widthRef } from "../../contants/screenSize";
import useAppContext from "../../hooks/useAppContext";
import { MaterialIcons } from "@expo/vector-icons";
const Home = (props) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const { isDarkTheme, setIsDarkTheme, theme: globalTheme, userObject } = useAppContext();
  const theme = useTheme();
  console.log(isDarkTheme);
  const [data, setData] = React.useState([]);
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
            <Title style={{ color: globalTheme.text, fontSize: 30 * heightRef }}>Welcome {userObject.name}</Title>
          </Card.Content>
        </Card>

        <View style={{ flex: 1, width: "100%", padding: 20 * widthRef }}>
          <Title style={{ color: globalTheme.tintText, fontSize: 30 * heightRef, fontWeight: "bold" }}>
            Your Previous Rides
          </Title>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            style={{ width: "100%" }}
            ListEmptyComponent={() => (
              <Title style={{ color: globalTheme.tintText, fontSize: 30 * heightRef }}>
                You haven't booked any rides yet
              </Title>
            )}
            contentContainerStyle={{ width: "100%", flexGrow: 1, paddingVertical: 20 * heightRef }}
            renderItem={({ item, index }) => {
              return (
                <Card
                  key={index}
                  elevation={10}
                  style={{
                    borderTopLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    width: "100%",
                    justifyContent: "center",
                    overflow: "hidden",
                    backgroundColor: "orange",
                  }}
                >
                  <Card.Content
                    style={{
                      paddingVertical: 10 * heightRef,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Title style={{ color: globalTheme.text, fontSize: 20 * heightRef }}>From: Welcome ali</Title>
                      <Title style={{ color: globalTheme.text, fontSize: 20 * heightRef }}>To: Welcome ali</Title>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={30 * heightRef} color="white" />
                  </Card.Content>
                </Card>
              );
            }}
          />
        </View>
      </ScrollView>
      <FAB.Group
        open={open}
        style={styles.fab}
        icon={open ? "close" : "plus"}
        actions={[
          {
            icon: !isDarkTheme ? "brightness-3" : "brightness-7",
            label: !isDarkTheme ? "Dark" : "Light",
            onPress: () => setIsDarkTheme((state) => !state),
          },
          {
            icon: "face",
            label: "Profile",
            onPress: () => {
              onStateChange({ open: false });
              props.navigation.navigate("Profile");
            },
          },
          {
            icon: "car",
            label: "Ride",
            onPress: () => {
              onStateChange({ open: false });
              props.navigation.navigate("Ride");
            },

            small: false,
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
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
  fab: { position: "absolute", right: 0, bottom: 0 },
});

//make this component available to the app
export default Home;
