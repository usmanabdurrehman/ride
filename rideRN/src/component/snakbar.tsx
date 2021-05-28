import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";

import { EventRegister } from "react-native-event-listeners";

const SnackbarComponent = () => {
  const [visible, setVisible] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  React.useEffect(() => {
    let listener = EventRegister.addEventListener("snackbar", (data) => {
      setMsg(data);
      setVisible(true);
    });
    return () => listener;
  }, []);
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: "close",
        onPress: () => {
          onDismissSnackBar();
          // Do something
        },
      }}
      duration={3000}
    >
      {msg}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default SnackbarComponent;
