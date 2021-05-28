import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Avatar, Card, FAB } from "react-native-paper";
import IconButton from "../../component/iconButton";
import { LayoutAnimationConfigure } from "../../contants/functions";
import { heightRef, widthRef } from "../../contants/screenSize";
import useAppContext from "../../hooks/useAppContext";
import InputControlComponent from "./component/input";
import { Dropdown } from "react-native-material-dropdown";
// import axios from "axios";
import * as ImagePicker from "expo-image-picker";
const SignUp = () => {
  const { theme } = useAppContext();
  const { control, handleSubmit, formState } = useForm();

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [image, setImage] = React.useState({
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXLARk2jdSEG8IAmKfxZBU-9XLREbeyd7OQ&usqp=CAU",
  });
  const selectImage = async () => {
    console.log("HIT");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log("HIT");

    if (!result.cancelled) {
      setImage(result);
      console.log(result);
    }
  };
  //   LayoutAnimationConfigure();
  // console.log(formState);
  const onSubmit = (data: { name: string; email: string; password: string; picker: string; address: string }) => {
    console.log(data);
    let { name, email, password, address, picker: ownsCar } = data;

    // let formdata = new FormData();
    // formdata.append("name", name);
    // formdata.append("email", email);
    // formdata.append("password", password);
    // formdata.append("address", address);
    // formdata.append("ownsCar", ownsCar);
    // formdata.append("image", {
    //   uri: "",
    //   type: "",
    //   name: "",
    // });

    // console.log(formdata);

    // console.log(image);
    // axios({
    //   method: "post",
    //   url: "/signup",
    //   data: formdata,
    // }).then((res) => {
    //   if (res.data.status) {
    //     console.log("yay");
    //   } else {
    //     console.log("nay");
    //   }
    // });
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
          <Card.Content style={{ alignItems: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <IconButton onPress={selectImage}>
                <Avatar.Image size={140 * heightRef} source={image} />
              </IconButton>
              <FAB
                small
                icon="camera"
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 4,
                  transform: [{ scale: 0.8 }],
                  backgroundColor: theme.tint,
                }}
              />
            </View>
            <InputControlComponent
              control={control}
              formState={formState}
              name="name"
              label="Name"
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
            <InputControlComponent
              control={control}
              formState={formState}
              name="address"
              label="Address"
              rules={{
                required: {
                  message: "This field is required.",
                  value: true,
                },
              }}
            />
            <View style={{ width: "100%", paddingVertical: 10 * heightRef }}>
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <Dropdown
                    label="Do you own a Car?"
                    value={value}
                    data={[
                      {
                        value: "Yes",
                      },
                      {
                        value: "No",
                      },
                    ]}
                    onChangeText={(val) => onChange(val)}
                    errorText={formState.errors["picker"] ? formState.errors["picker"].message : ""}
                  />
                )}
                defaultValue=""
                {...{
                  name: "picker",
                  control,
                }}
                rules={{
                  required: {
                    message: "This field is required.",
                    value: true,
                  },
                }}
              />
            </View>
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

export default SignUp;

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
