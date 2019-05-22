import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { getUserVotes } from "../actions/userActions";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return <View style={styles.container} />;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(getUserVotes());
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(HomeScreen);
