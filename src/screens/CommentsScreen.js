import React from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ListItem from '../components/ListItem';
import StickyKeyboardAccessory from '../components/StickyKeyboardAccessory';
import Message from '../components/Message';
import { fetchTeacherComments, postComment } from '../actions/teacherActions';
import { fetchCourseComments, postCourseComment } from '../actions/courseActions';
import { colors } from '../styles/common.style';
import Layout from '../styles/Layout';

const timelessMessage =
  "These messages are timeless and anonymous, so please be kind. Also, don't expect a reply :-)";

class CommentsScreen extends React.Component {
  static navigationOptions = {
    title: 'Comments',
  };

  componentDidMount() {
    const { dispatch, navigation } = this.props;

    const commentType = navigation.getParam('commentEntity');
    if (commentType === 'teacher') {
      const {
        teacher: {
          selectedTeacher: { id },
        },
      } = this.props;
      dispatch(fetchTeacherComments({ teacherId: id }));
    } else if (commentType === 'course') {
      const {
        course: {
          selectedCourse: { id: selectedCourseId },
        },
      } = this.props;
      dispatch(fetchCourseComments({ courseId: selectedCourseId }));
    }
  }

  _renderItem = ({ item }) => {
    const { text, userId, animate } = item;
    const comment = { description: text, title: userId, animate };
    return <ListItem onPress={this._onPress} item={comment} />;
  };

  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: colors.lightgray,
      }}
    />
  );

  _renderListHeader = () => <Message title={timelessMessage} />;

  _keyExtractor = item => `${item.id}`;

  _onPress = (e, item) => {
    console.log(item);
  };

  _onPressSend = text => {
    const { dispatch, navigation } = this.props;

    const commentType = navigation.getParam('commentEntity');

    if (commentType === 'teacher') {
      const {
        teacher: {
          selectedTeacher: { id },
        },
      } = this.props;
      dispatch(postComment({ teacherId: id, text }));
    } else if (commentType === 'course') {
      const {
        course: {
          selectedCourse: { id: selectedCourseId },
        },
      } = this.props;
      dispatch(postCourseComment({ courseId: selectedCourseId, text }));
    }
  };

  // TODO: won't work with KeyboardAwareScrollView
  _onRefresh = () => {
    const { dispatch, navigation } = this.props;

    const commentType = navigation.getParam('commentEntity');

    if (commentType === 'teacher') {
      const {
        teacher: {
          selectedTeacher: { id },
        },
      } = this.props;
      dispatch(fetchTeacherComments({ teacherId: id }));
    } else if (commentType === 'course') {
      const {
        course: {
          selectedCourse: { id: selectedCourseId },
        },
      } = this.props;
      dispatch(fetchCourseComments({ courseId: selectedCourseId }));
    }
  };

  render() {
    const { teacher, course, navigation } = this.props;
    const commentType = navigation.getParam('commentEntity');
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          {teacher.fetchingComments || course.fetchingComments ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.header}>Getting comments...</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <FlatList
                style={styles.container}
                data={commentType === 'teacher' ? teacher.comments : course.comments}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._renderSeparator}
                ListHeaderComponent={this._renderListHeader}
                refreshControl={
                  <RefreshControl
                    refreshing={teacher.fetchingComments || course.fetchingComments}
                    onRefresh={this._onRefresh}
                  />
                }
              />
            </View>
          )}
        </KeyboardAwareScrollView>
        <KeyboardAccessoryView inSafeAreaView alwaysVisible style={{ backgroundColor: 'white' }}>
          <StickyKeyboardAccessory onPressSend={this._onPressSend} />
        </KeyboardAccessoryView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: Layout.container.margin,
  },
});

const mapStateToProps = state => ({
  teacher: state.teacher,
  course: state.course,
});

export default connect(mapStateToProps)(CommentsScreen);
