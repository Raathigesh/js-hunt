import React from "react";
import { Dropdown, Header, Icon } from "semantic-ui-react";

const options = [
  {
    key: "latest",
    text: "latest",
    value: "asc",
    content: "latest"
  },
  {
    key: "oldest",
    text: "oldest",
    value: "desc",
    content: "oldest"
  }
];

const Sort = () => (
  <Header as="h4">
    <Icon name="sort" />
    <Header.Content>
      Sort posts by
      {" "}
      <Dropdown
        inline
        header="Sort by"
        options={options}
        defaultValue={options[0].value}
      />
    </Header.Content>
  </Header>
);

export default Sort;
