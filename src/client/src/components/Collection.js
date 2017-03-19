import React from "react";
import { Segment, Card, Header } from "semantic-ui-react";
import Post from "./Post";
import styled from "styled-components";

const Collecton = ({ date, items }) => {
  const CollectionContainer = styled.div`
     padding-top: 10px;
    `;

  const posts = items &&
    items.map(item => {
      return (
        <Post
          title={item.name}
          subTitle={item.date}
          description={item.description}
          url={item.url}
          type={item.type}
        />
      );
    });

  return (
    <CollectionContainer>
      <Segment color="red" style={{ backgroundColor: "#fdfdfd" }}>
        <Header as="h5">
          {date}
        </Header>
        <Card.Group itemsPerRow={2}>
          {posts}
        </Card.Group>
      </Segment>
    </CollectionContainer>
  );
};

export default Collecton;
