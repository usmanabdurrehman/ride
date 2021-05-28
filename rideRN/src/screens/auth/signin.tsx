import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Avatar, Card, FAB } from "react-native-paper";
import IconButton from "../../component/iconButton";
import { LayoutAnimationConfigure } from "../../contants/functions";
import { heightRef, widthRef } from "../../contants/screenSize";
import useAppContext from "../../hooks/useAppContext";
import InputControlComponent from "./component/input";
import axios from "axios";
import { EventRegister } from "react-native-event-listeners";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Signin = (props) => {
  const { theme, setToken, setUserObject } = useAppContext();
  const { control, handleSubmit, formState } = useForm();
  const [loading, setLoading] = React.useState<boolean>(false);
  //   LayoutAnimationConfigure();
  const onSubmit = (data: { email: string; password: string }) => {
    setLoading(true);
    axios({
      method: "post",
      url: "/signin",
      data,
    }).then(async (res) => {
      setLoading(false);
      if (res.data.auth) {
        console.log("yay", res.data);
        EventRegister.emit("snackbar", "Login Successfully");
        await AsyncStorage.setItem("userObject", JSON.stringify(res.data));
        setToken(res.data.token);
        setUserObject(res.data.user);
        EventRegister.emit("authStatus", true);
      } else {
        console.log("nay");
      }
    });
  };

  return (
    <ScrollView style={{ flexGrow: 1, backgroundColor: "white" }} contentContainerStyle={styles.container}>
      <View style={{ ...styles.container, height: "100%", flex: 1 }}>
        <Text h1 h1Style={{ color: "purple", paddingVertical: 10 * heightRef }}>
          Ride.
        </Text>
        <Card
          elevation={10}
          style={{
            borderTopLeftRadius: 30,
            borderBottomRightRadius: 30,
            width: "90%",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Text h3 h3Style={{ color: "purple", padding: 15 * heightRef }}>
            Login.
          </Text>
          <Card.Content style={{ alignItems: "center" }}>
            <InputControlComponent
              control={control}
              formState={formState}
              label="Email"
              name="email"
              rules={{
                // pattern: {
                //   message: "The email address format is invalid.",
                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                // },
                required: {
                  message: "This field is required.",
                  value: true,
                },
              }}
            />
            <InputControlComponent
              control={control}
              formState={formState}
              label="Password"
              name="password"
              rules={{
                pattern: {
                  message: "The password must contain at least 8 characters",
                  value: /^.*(?=.{8,}).*$/i,
                },
                required: {
                  message: "This field is required.",
                  value: true,
                },
              }}
            />
          </Card.Content>
          <View style={{ width: "100%", paddingHorizontal: "20%", paddingVertical: 20 * heightRef }}>
            <Button
              //   disabled={!formState.isValid}
              loading={loading}
              title="Log In"
              type="solid"
              onPress={handleSubmit(onSubmit)}
              buttonStyle={{ borderRadius: 10 }}
            />

            <Text style={{ color: "purple", fontSize: 14 * heightRef, paddingVertical: 20 * heightRef }}>
              Don't have an account?
              <Text
                onPress={() => props.navigation.navigate("Signup")}
                h4
                h4Style={{ color: "purple", padding: 15 * heightRef, fontSize: 18 * heightRef }}
              >
                {" "}
                Register Here
              </Text>
            </Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 30 * heightRef,
    flexGrow: 1,
  },
  input: { backgroundColor: "white" },
  errorText: { color: "red", paddingHorizontal: 10 * widthRef },
});
