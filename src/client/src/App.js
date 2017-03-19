import React, { Component } from "react";
import { Grid, Image, Card, Dimmer, Loader, Segment } from "semantic-ui-react";
import { gql, graphql } from "react-apollo";
import Infinite from "react-infinite";
import "semantic-ui-css/semantic.css";

import Header from "./components/Header";
import Collection from "./components/Collection";

import _ from "lodash";

const MyQuery = gql`
  query Query($startPage: Int, $endPage: Int) {
    spreadSheet(id: "1qpf_vXit4JpvKaSogtIyHrPPu20yTLRH5FB5dCgXOx8") {
      spreadsheetId,
      spreadsheetUrl,
      protectedRows,
      dataByPage(sheetName: "animals", startColumn: "A", endColumn: "F", startRowNumber: $startPage, endRowNumber: $endPage)
    }
  }
`;

class App extends Component {
  state = {
    isLoading: false
  };

  handleScroll = () => {
    var loadMorePromise = this.props.loadMoreEntries();
    if (loadMorePromise !== null) {
      this.setState({
        isLoading: true
      });
      loadMorePromise.then(() => {
        this.setState({
          isLoading: false
        });
      });
    }
  };

  render() {
    const { spreadSheet } = this.props;
    var posts = spreadSheet &&
      spreadSheet.dataByPage.map(item => {
        return {
          date: item[0],
          name: item[1],
          url: item[2],
          description: item[3],
          type: item[5]
        };
      });

    const groupedPosts = _.groupBy(posts, "date");
    const collections = [];
    Object.entries(groupedPosts).forEach(([key, value]) => {
      collections.push(<Collection items={value} date={key} />);
    });

    return (
      <Grid centered container>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Infinite
              useWindowAsScrollContainer
              elementHeight={150}
              infiniteLoadBeginEdgeOffset={200}
              onInfiniteLoad={this.handleScroll}
            >
              {collections}
            </Infinite>
            {this.props.isLoading &&
              <Loader active inline="centered" style={{ marginTop: "10px" }} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default graphql(MyQuery, {
  options(props) {
    console.log("calling....");
    return {
      variables: {
        startPage: 1,
        endPage: 10
      }
    };
  },
  props({ data: { loading, spreadSheet, fetchMore } }) {
    return {
      loading,
      spreadSheet,
      loadMoreEntries() {
        if (loading) {
          return null;
        }

        const numberOfEntries = spreadSheet.dataByPage.length;
        const totalRows = spreadSheet.protectedRows;
        console.log("Entries " + numberOfEntries);
        console.log("Total Rows " + totalRows);

        if (numberOfEntries >= spreadSheet.protectedRows) {
          return null;
        }

        const startPage = numberOfEntries + 1;

        let endPage = startPage + 5;

        if (endPage > spreadSheet.protectedRows) {
          endPage = spreadSheet.protectedRows;
        }

        return fetchMore({
          // query: ... (you can specify a different query. FEED_QUERY is used by default)
          variables: {
            startPage: startPage,
            endPage: endPage
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult.data.spreadSheet) {
              return previousResult;
            }

            const final = Object.assign({}, previousResult, {
              // Append the new feed results to the old one
              spreadSheet: {
                ...previousResult.spreadSheet,
                dataByPage: [
                  ...previousResult.spreadSheet.dataByPage,
                  ...fetchMoreResult.data.spreadSheet.dataByPage
                ]
              }
            });
            return final;
          }
        });
      }
    };
  }
})(App);
