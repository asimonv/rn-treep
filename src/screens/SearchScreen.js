import React from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Highlighter from "react-native-highlight-words";
import { connect } from "react-redux";

import SearchBar from "../components/SearchBar";
import HeaderView from "../components/HeaderView";
import searchService from "../services/search";
import { courseSet } from "../actions/courseActions";
import { teacherSet } from "../actions/teacherActions";
import Layout from "../styles/Layout";

const EmptyComponent = ({ title }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>{title}</Text>
  </View>
);

export class SearchScreen extends React.Component {
  static navigationOptions = {
    title: "Search",
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: []
    };

    this._handleSearch = this._handleSearch.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderSeparator = this._renderSeparator.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
    this._onPress = this._onPress.bind(this);
  }

  async _handleSearch(query) {
    const res = await searchService.get(query);
    const options = [
      {
        title: "Courses",
        data: res.courses
      },
      {
        title: "Teachers",
        data: res.teachers
      }
    ];

    return options;
  }

  async _onChangeText(text) {
    this.setState({ query: text }, async () => {
      if (text.trim() != "") {
        const results = await this._handleSearch(this.state.query);
        this.setState({ results });
      } else {
        this.setState({ results: [] });
      }
    });
  }

  _onPress(item, section) {
    this.props.dispatch(
      section.title == "Courses" ? courseSet(item) : teacherSet(item)
    );
    this.props.navigation.navigate(
      section.title == "Courses" ? "Course" : "Teacher"
    );
  }

  _renderHeader = title => <HeaderView title={title} />;

  _renderItem = (item, section, index) => (
    <TouchableOpacity onPress={() => this._onPress(item, section)}>
      <Highlighter
        highlightStyle={{ backgroundColor: "yellow", fontWeight: "bold" }}
        searchWords={[this.state.query]}
        textToHighlight={item.name}
        style={styles.searchResult}
      />
    </TouchableOpacity>
  );

  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: "#D1D1D4"
      }}
    />
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          style={{ marginTop: 10, marginBottom: 10 }}
          ref={ref => (this.searchBar = ref)}
          onChangeText={this._onChangeText}
          placeholder={"search"}
        />
        <SectionList
          contentContainerStyle={styles.results}
          sections={this.state.results}
          ItemSeparatorComponent={this._renderSeparator}
          ListEmptyComponent={
            <EmptyComponent
              title={
                this.state.query.trim() === ""
                  ? ""
                  : "No results. Try searching for something else."
              }
            />
          }
          renderSectionHeader={({ section }) =>
            section.data.length > 0 ? this._renderHeader(section.title) : null
          }
          renderItem={({ item, section, index }) =>
            this._renderItem(item, section, index)
          }
          keyExtractor={(item, index) => item + index}
        />
      </SafeAreaView>
    );
  }
}

export default connect()(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: Layout.container.margin
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  results: {
    flexGrow: 1,
    flexDirection: "column",
    marginRight: 10
  },
  searchResult: {
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8
  }
});
