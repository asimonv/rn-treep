import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { signIn } from '../actions/authActions';

import t from 'tcomb-form-native';
const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
});

const options = {
  fields: {
    email: {
      error: 'You forgot your UC email',
      help: 'Please use your UC email',
    },
    password: {
      error: 'Please add your password',
      help: 'Your UC Login password. Do not worry, Treep does not save it',
      secureTextEntry: true,
      password: true,
    },
  },
};

export class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);
    this.state = { signingIn: false };
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          type={User}
          ref={c => this._form = c} // assign a ref
          options={options}
        />
        <Button disabled={this.state.signingIn} title="Sign in!" onPress={this._signInAsync} />
        { this.state.signIn &&
          <Text>Signing you in...</Text>
        }
      </View>
    );
  }

  _signInAsync = () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    //this.props.navigation.navigate('App');
    const value = this._form.getValue(); // use that ref to get the form value

    this.props.dispatch(
      signIn(value),
    );

    this.setState({ signIn: true });
  };

  componentDidMount() {
    console.log(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user) {
      const userToken = await AsyncStorage.setItem('userToken', nextProps.auth.user.currentUser);
      this.props.navigation.navigate('App');
    }
  }

}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
