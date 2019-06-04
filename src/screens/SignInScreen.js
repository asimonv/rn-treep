import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { connect } from "react-redux";
import { signIn } from "../actions/authActions";
import Button from "../components/Button";

import t from "tcomb-form-native";
const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String
});

const options = {
  fields: {
    email: {
      error: "You forgot your UC email",
      help: "Please use your UC email",
      autoCapitalize: "none"
    },
    password: {
      error: "Please add your password",
      help: "Your UC Login password. Do not worry, Treep does not save it",
      secureTextEntry: true,
      password: true
    }
  }
};

export class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in"
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          type={User}
          ref={c => (this._form = c)} // assign a ref
          options={options}
        />
        <Button
          disabled={this.props.auth.loadingUser}
          title="Sign in!"
          onPress={this._signInAsync}
        />
        {this.props.auth.loadingUser && (
          <Text>
            Signing you in <AnimatedEllipsis />
          </Text>
        )}
        {this.props.auth.error && <Text>error</Text>}
      </View>
    );
  }

  _signInAsync = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    this.props.dispatch(signIn({ ...value }));
  };

  static async getDerivedStateFromProps(nextProps, prevState) {
    const {
      auth: { user },
      navigate
    } = nextProps;
    if (user) {
      try {
        await AsyncStorage.setItem("user", user);
        navigate("App");
      } catch (e) {
        // saving error
        console.log(e);
      }
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});
