import React from "react";
import { Card, Button, Image, Icon } from "semantic-ui-react";

function getPostImage(type) {
  if (type === "js") {
    return require("../images/icons/js.png");
  } else if (type === "github") {
    return require("../images/icons/github.png");
  } else if (type === "ebook") {
    return require("../images/icons/ebook.png");
  } else if (type === "tool") {
    return require("../images/icons/tool.png");
  } else if (type === "UX") {
    return require("../images/icons/ux.png");
  }
}

const PostItem = ({ title, subTitle, description, url, type }) => {
  return (
    <Card>
      <Card.Content>
        <Image floated="right" size="mini" src={getPostImage(type)} />
        <Card.Header>
          <a href={url}> {title} </a>
        </Card.Header>
        <Card.Meta>
          {type}
        </Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a
          target="_blank"
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${title} - ${url}`}
          data-size="large"
        >
          Tweet
        </a>
      </Card.Content>
    </Card>
  );
};

export default PostItem;
