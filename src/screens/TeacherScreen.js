import React from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { withInAppNotification } from 'react-native-in-app-notification';


import HeaderCard from '../components/HeaderCard';
import HeaderView from '../components/HeaderView';
import StatModal from '../components/StatModal';
import StatsView from '../components/StatsView';
import Layout from '../constants/Layout';

const TAB_BAR_HEIGHT = 49;
const screen = Dimensions.get('window');


export class TeacherScreen extends React.Component {
  static navigationOptions = {
    title: 'Teacher',
  };

  renderContent = () => {
    return (
      <View>
        <Text>Get directions to your location</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedStat: undefined,
      data: [
            {
                label: '1',
                layout:'column',
                color: 'blue',
            },
            {
                label: '2',
                layout:'column',
                color: 'blue',
            },
            {
                label: '3',
                color: 'blue',
                layout:'column',
            },
            {
                label: '4',
                layout:'column',
                color: 'blue',
            },
            {
                label: '5',
                layout:'column',
                color: 'blue',
            },
        ],
    }

    this._onPress = this._onPress.bind(this);
    this._onButtonPressed = this._onButtonPressed.bind(this);
  }

  _onPress(stat) {
    console.log(stat);
    this.setState({
      selectedStat: stat,
    }, () => {
      this.refs.modal.openModal()
    });
  }

  _onButtonPressed() {
    this.refs.modal.closeModal();
    this.props.showNotification({
      title: 'Thank you!',
      message: 'Your opinion is very important to others',
      onPress: () => Alert.alert('Alert', 'You clicked the notification!')
    });
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.container}>
            <HeaderCard
              imageURL={this.props.teacher.selectedTeacher.url}
              title={this.props.teacher.selectedTeacher.name}
            />
        <HeaderView title={'Stats'}/>
        <StatsView
          onPress={this._onPress}
          {...this.props.teacher.selectedTeacher}
        />
        </ScrollView>
        <StatModal
          imageURL={this.props.teacher.selectedTeacher.url}
          title={this.props.teacher.selectedTeacher.name}
          headerType={'vertical'}
          data={this.state.data}
          stat={this.state.selectedStat}
          ref={'modal'}
          onButtonPressed={this._onButtonPressed}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  teacher: state.teacher,
});

export default withInAppNotification(connect(mapStateToProps)(TeacherScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Layout.container.margin,
  }
});
