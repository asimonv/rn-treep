import React from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import AnimatedEllipsis from "react-native-animated-ellipsis";
import { connect } from "react-redux";
import { withInAppNotification } from "react-native-in-app-notification";

import HeaderCard from "../components/HeaderCard";
import StatModal from "../components/StatModal";
import StatsView from "../components/StatsView";
import Button from "../components/Button";
import Layout from "../styles/Layout";

import { fetchTeachersStats } from "../actions/teacherActions";
import { sendStat } from "../actions/userActions";
import { teacherSendStat } from "../actions/teacherActions";
import { votesOptions } from "../data/teacherOptions";
import checkIfVoted from "../helpers/votes";

export class TeacherScreen extends React.Component {
  static navigationOptions = {
    title: "Teacher"
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedStat: undefined,
      data: votesOptions,
      interactedBefore: false
    };

    this._onPress = this._onPress.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._onButtonPressed = this._onButtonPressed.bind(this);
    this._onPressComments = this._onPressComments.bind(this);
  }

  componentDidMount() {
    const {
      teacher: {
        selectedTeacher: { id }
      },
      dispatch
    } = this.props;
    dispatch(fetchTeachersStats({ teacherId: id }));
  }

  _onPress(stat) {
    const {
      teacher: { selectedTeacher },
      votes
    } = this.props;
    const { id } = selectedTeacher;
    const {
      meta: { repr }
    } = stat;
    const data = { teacherId: id, voteType: repr };
    this.setState(
      {
        selectedStat: stat,
        interactedBefore: checkIfVoted(data, votes)
      },
      () => {
        this.refs.modal.openModal();
      }
    );
  }

  _onRefresh() {
    const {
      teacher: { selectedTeacher },
      showNotification,
      dispatch
    } = this.props;
    const { id } = selectedTeacher;
    dispatch(fetchTeachersStats({ teacherId: id }));
  }

  _onButtonPressed(stat) {
    const {
      teacher: {
        selectedTeacher: { id }
      },
      showNotification,
      dispatch
    } = this.props;
    const data = { ...stat, teacherId: id };
    dispatch(sendStat(data));
    dispatch(teacherSendStat(data));
    this.refs.modal.closeModal();
    /*showNotification({
      title: "Thank you!",
      message: "Your opinion is very important to others",
      onPress: () => Alert.alert("Alert", "You clicked the notification!")
    });
    */
  }

  _onPressComments() {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("Comments");
  }

  render() {
    const { teacher, votes } = this.props;
    const { data, selectedStat, interactedBefore } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={teacher.fetchingStats}
              onRefresh={this._onRefresh}
            />
          }
        >
          <HeaderCard
            url={teacher.selectedTeacher.url}
            title={teacher.selectedTeacher.name}
            showTitle
            containerStyle={{
              marginHorizontal: Layout.container.margin,
              marginVertical: Layout.container.margin * 2
            }}
            headerType="vertical"
          />
          {teacher.fetchingStats ? (
            <Text style={{ marginHorizontal: Layout.container.margin }}>
              Loading <AnimatedEllipsis />
            </Text>
          ) : (
            <StatsView
              onPress={this._onPress}
              stats={teacher.stats}
              votes={votes}
              parent={teacher.selectedTeacher}
              style={{ marginHorizontal: Layout.container.margin }}
            />
          )}
          <View
            style={{
              marginHorizontal: Layout.container.margin,
              marginVertical: Layout.container.margin * 2
            }}
          >
            <Button
              onPress={this._onPressComments}
              light
              large
              title="Write a comment"
            />
          </View>
        </ScrollView>
        {selectedStat && (
          <StatModal
            url={teacher.selectedTeacher.url}
            title={teacher.selectedTeacher.name}
            headerType={"vertical"}
            data={data}
            stat={selectedStat}
            ref={"modal"}
            interactedBefore={interactedBefore}
            onButtonPressed={this._onButtonPressed}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  teacher: state.teacher,
  votes: state.user.votes
});

export default withInAppNotification(connect(mapStateToProps)(TeacherScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
