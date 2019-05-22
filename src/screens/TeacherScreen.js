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
import HeaderView from "../components/HeaderView";
import StatModal from "../components/StatModal";
import StatsView from "../components/StatsView";
import Layout from "../constants/Layout";

import { fetchTeachersStats } from "../actions/teacherActions";
import { sendStat } from "../actions/userActions";
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
      showNotification
    } = this.props;
    const { id } = selectedTeacher;
    this.props.dispatch(fetchTeachersStats({ teacherId: id }));
  }

  _onButtonPressed(stat) {
    const {
      teacher: {
        selectedTeacher: { id }
      },
      showNotification
    } = this.props;
    const data = { ...stat, teacherId: id };
    this.props.dispatch(sendStat(data));

    this.refs.modal.closeModal();
    showNotification({
      title: "Thank you!",
      message: "Your opinion is very important to others",
      onPress: () => Alert.alert("Alert", "You clicked the notification!")
    });
  }

  render() {
    const { teacher } = this.props;
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
          />
          <HeaderView title={"Stats"} />
          {teacher.fetchingStats ? (
            <Text>
              Loading <AnimatedEllipsis />
            </Text>
          ) : (
            <StatsView onPress={this._onPress} stats={teacher.stats} />
          )}
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
    flex: 1,
    margin: Layout.container.margin
  }
});
