import React from "react";
import {
  Alert,
  AsyncStorage,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
import AnimatedEllipsis from "react-native-animated-ellipsis";

import ListItem from "../components/ListItem";
import { fetchTeacherComments } from "../actions/teacherActions";
import { colors } from "../styles/common.style";
import Layout from "../constants/Layout";

class CommentsScreen extends React.Component {
  static navigationOptions = {
    title: "Comments"
  };

  _keyExtractor = item => item.key;

  _renderItem = ({ item }) => <ListItem onPress={this._onPress} item={item} />;

  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: colors.lightgray
      }}
    />
  );

  componentDidMount() {
    const {
      dispatch,
      teacher: {
        selectedTeacher: { id }
      }
    } = this.props;
    dispatch(fetchTeacherComments({ teacherId: id }));
  }

  _onPress = (e, item) => {
    console.log(item);
  };

  render() {
    const { teacher } = this.props;
    return (
      <SafeAreaView>
        {teacher.fetchingComments ? (
          <Text style={styles.header}>
            Getting comments <AnimatedEllipsis />
          </Text>
        ) : (
          <FlatList
            style={styles.container}
            data={teacher.comments}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._renderSeparator}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    margin: Layout.container.margin
  }
});

const mapStateToProps = state => ({
  teacher: state.teacher
});

export default connect(mapStateToProps)(CommentsScreen);
