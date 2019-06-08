import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

import ListItem from "../components/ListItem";
import StickyKeyboardAccessory from "../components/StickyKeyboardAccessory";
import Message from "../components/Message";
import { fetchTeacherComments, postComment } from "../actions/teacherActions";
import { colors } from "../styles/common.style";
import Layout from "../styles/Layout";

const timelessMessage =
  "This messages are timeless and anonymous, so please be kind. Also, don't expect a reply :-)";

class CommentsScreen extends React.Component {
  static navigationOptions = {
    title: "Comments"
  };

  _keyExtractor = item => `${item.id}`;

  _renderItem = ({ item }) => {
    const { text, userId, animate } = item;
    const comment = { description: text, title: userId, animate };
    return <ListItem onPress={this._onPress} item={comment} />;
  };

  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: colors.lightgray
      }}
    />
  );

  _renderListHeader = () => <Message title={timelessMessage} />;

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

  _onPressSend = text => {
    const {
      dispatch,
      teacher: {
        selectedTeacher: { id }
      }
    } = this.props;
    dispatch(postComment({ teacherId: id, text }));
  };

  _onRefresh = () => {
    const {
      dispatch,
      teacher: {
        selectedTeacher: { id }
      }
    } = this.props;
    dispatch(fetchTeacherComments({ teacherId: id }));
  };

  render() {
    const { teacher } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {teacher.fetchingComments ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.header}>
              Getting comments <AnimatedEllipsis />
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            <FlatList
              style={styles.container}
              data={teacher.comments}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this._renderSeparator}
              ListHeaderComponent={this._renderListHeader}
              refreshControl={
                <RefreshControl
                  refreshing={teacher.fetchingComments}
                  onRefresh={this._onRefresh}
                />
              }
            />
          </View>
        )}
        <KeyboardAccessoryView
          inSafeAreaView
          alwaysVisible
          style={{ backgroundColor: "white" }}
        >
          <StickyKeyboardAccessory onPressSend={this._onPressSend} />
        </KeyboardAccessoryView>
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
