import React from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import "../App.css";
import styles from "./ProfilePage.module.css";
import AppContext from "../AppContext";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      value: "",
    };
    this.button = React.createRef();
    this.updateUserName = this.updateUserName.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalShow = () => {
    this.setState({ showModal: true });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  updateUserName = (event) => {
    this.setState({ value: event.target.value });
  };

  submitUserName = (event, fc) => {
    event.preventDefault();
    if (this.state.value.length > 0) {
      this.setState({ value: event.target.value });
      fc(this.state.value);
    } else {
      this.handleModalShow();
    }
  };

  render() {
    return (
      <AppContext.Consumer>
        {(appContext) => (
          <div className={styles.profilePageWrapper}>
            <Form
              style={{ position: "relative" }}
              onSubmit={(event) =>
                this.submitUserName(event, appContext.currentUserName)
              }
            >
              <FormGroup>
                <div className={styles.profilePageTitle}>Profile</div>
                <Modal
                  show={this.state.showModal}
                  onHide={this.handleModalClose}
                  animation={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>ERROR!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Please enter a User Name!!!!!</Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={this.handleModalClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                <div className={styles.profilePage}>User Name</div>
                <Input
                  value={this.state.value}
                  type="text"
                  style={{
                    width: "700px",
                    background: "black",
                    color: "white",
                  }}
                  onChange={this.updateUserName}
                />
                <Button
                  type="submit"
                  style={{ position: "absolute", right: 0 }}
                  color="primary"
                  innerRef={(button) => {
                    this.button = button;
                  }}
                >
                  Save
                </Button>
              </FormGroup>
            </Form>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default ProfilePage;
