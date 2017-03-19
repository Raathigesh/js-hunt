import React, { Component } from "react";
import { Menu, Icon, Popup, Header, Modal, Button } from "semantic-ui-react";
import Sort from "./Sort";
import Subscription from "./Subscription";

export default class MenuExampleStackable extends Component {
  render() {
    return (
      <Header as="h1" icon textAlign="center">
        <img src={require("../images/logo.png")} style={{ width: "200px" }} />
        <Modal
          trigger={
            <Header.Subheader style={{ cursor: "pointer", marginTop: "20px" }}>
              <a>Neat. Sign me up for updates!</a>
            </Header.Subheader>
          }
          basic
          size="small"
        >
          <Modal.Content>
            <p>
              <Subscription />
            </p>
          </Modal.Content>
        </Modal>
      </Header>
    );
  }
}
