import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { Avatar, Card, FAB } from "react-native-paper";
import IconButton from "../../component/iconButton";
import { LayoutAnimationConfigure } from "../../contants/functions";
import { heightRef, widthRef } from "../../contants/screenSize";
import useAppContext from "../../hooks/useAppContext";
import InputControlComponent from "./component/input";
const Signin = () => {
  const { theme } = useAppContext();
  const { control, handleSubmit, formState } = useForm();
  const onSubmit = (data: object) => console.log(data);

  //   LayoutAnimationConfigure();

  return (
    <ScrollView style={{ flexGrow: 1, backgroundColor: "white" }} contentContainerStyle={styles.container}>
      <View style={{ ...styles.container, height: "100%", flex: 1 }}>
        <Card
          elevation={10}
          style={{
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            width: "90%",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Card.Title title="SignUp" titleStyle={{ fontSize: 30 * heightRef, fontWeight: "bold" }} />
          <Card.Content style={{ alignItems: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <IconButton>
                <Avatar.Image size={120 * heightRef} source={{ uri: "https://picsum.photos/700" }} />
              </IconButton>
              <FAB
                small
                icon="camera"
                style={{
                  position: "absolute",
                  right: -10,
                  bottom: 4,
                  transform: [{ scale: 0.7 }],
                  backgroundColor: theme.tint,
                }}
              />
            </View>
            <InputControlComponent
              control={control}
              formState={formState}
              name="firstName"
              label="First Name"
              rules={{
                required: {
                  message: "This field is required.",
                  value: true,
                },
              }}
            />

            <InputControlComponent
              control={control}
              formState={formState}
              name="lastName"
              label="Last Name"
              rules={{
                required: {
                  message: "This field is required.",
                  value: true,
                },
              }}
            />
            <InputControlComponent
              control={control}
              formState={formState}
              label="Email"
              name="email"
              rules={{
                pattern: {
                  message: "The email address format is invalid.",
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
              loading={formState.isValidating || formState.isSubmitting}
              title="Register"
              type="solid"
              onPress={handleSubmit(onSubmit)}
              buttonStyle={{ borderRadius: 10 }}
            />
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
  },
  input: { backgroundColor: "white" },
  errorText: { color: "red", paddingHorizontal: 10 * widthRef },
});
