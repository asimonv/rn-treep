import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import { signIn } from '../actions/authActions';
import Button from '../components/Button';
import Loader from '../components/Loader';

const { Form } = t.form;

const User = t.struct({
  username: t.String,
  password: t.String,
});

const options = {
  fields: {
    username: {
      error: 'You forgot your UC username',
      help: 'Please use your UC username (without @uc.cl)',
      autoCapitalize: 'none',
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
    title: 'Sign in',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  render() {
    const { auth } = this.props;
    const { loadingUser, error } = auth;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Form
            type={User}
            ref={c => (this._form = c)} // assign a ref
            options={options}
            value={this.state}
          />
          <Button disabled={loadingUser} title="Sign in" onPress={this._signInAsync} />
          {loadingUser && <Loader loading={loadingUser} title="Logging you in..." />}
          {error && <Text style={styles.message}>{error}</Text>}
        </View>
      </SafeAreaView>
    );
  }

  _signInAsync = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    this.setState({ ...value });
    this.props.dispatch(signIn({ ...value }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth.user !== this.props.auth.user) {
      const {
        navigation: { navigate },
      } = this.props;
      await AsyncStorage.setItem('user', this.props.auth.user);
      navigate('App');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth !== prevState.auth) {
      return { auth: nextProps.auth };
    }
    return null;
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
  message: {
    marginTop: 5,
  },
});
