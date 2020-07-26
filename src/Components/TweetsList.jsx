import React from "react";
import TweetField from "./TweetField";
import { Button, Input, FormGroup, Form } from "reactstrap";

class TweetsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      value: "",
      id: 0,
    };
    this.button = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const saved = localStorage.getItem("tweets");
    const tweets = JSON.parse(saved);
    if (saved) {
      this.setState(() => ({ tweets }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tweets.length !== this.state.tweets.length) {
      const saves = JSON.stringify(this.state.tweets);
      localStorage.setItem("tweets", saves);
    //   localStorage.clear();
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value.length === 0) {
      this.button.setAttribute("disabled", "disabled");
    } else if (this.state.value.length < 140) {
      let newId = this.state.id;
      newId++;
      let newTweet = {
        id: newId,
        name: "Bunty Jackson",
        message: this.state.value,
        date: new Date().toUTCString(),
      };
      let newTweets = [...this.state.tweets];
      newTweets.push(newTweet);
      this.setState({ tweets: newTweets, value: "", id: newId });
    } else if (this.state.value.length > 140) {
      this.button.setAttribute("disabled", "disabled");
    }
    this.button.removeAttribute("disabled");
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "relative", width: "50%" }}>
              <Input
                type="textarea"
                name="text"
                id="tweetTextArea"
                value={this.state.value}
                style={{
                  background: "black",
                  color: "white",
                  height: "300px",
                  resize: "none",
                }}
                placeholder="What do you have in mind...?"
                onChange={this.handleChange}
              />
              <Button
                type="submit"
                color="primary"
                innerRef={(button) => {
                  this.button = button;
                }}
                style={{ position: "absolute", bottom: "7%", right: "1%" }}
              >
                Tweet
              </Button>
            </div>
          </FormGroup>
        </Form>
        {this.state.tweets.reverse().map((el) => {
          return <TweetField tweetInfo={el} key={el.id}></TweetField>;
        })}
      </>
    );
  }
}

export default TweetsList;
