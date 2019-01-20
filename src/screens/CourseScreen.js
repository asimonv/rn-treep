import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import StatCard from '../components/StatCard';
import HeaderCard from '../components/HeaderCard';
import Layout from '../constants/Layout';

export  class CourseScreen extends React.Component {
  static navigationOptions = {
    title: 'Course',
  };

  constructor(props) {
    super(props);
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <ScrollView style={styles.container}>
        <HeaderCard
          title={`${this.props.course.selectedCourse.courseNumber} - ${this.props.course.selectedCourse.name}`}
          description={this.props.course.selectedCourse.description}
        />
        <StatCard stat={{
            title: 'Popularity',
            value: 41
          }}/>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  course: state.course,
});

export default connect(mapStateToProps)(CourseScreen);

const styles = StyleSheet.create({
  container: {
    margin: Layout.container.margin,
    flex: 1,
  }
});
