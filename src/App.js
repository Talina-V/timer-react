import "./styles.css";
import { Component } from "react";

export default class App extends Component {
  state = {
    count: 0,
    isCounting: false
  };

  componentDidMount() {
    const userCount = localStorage.getItem("count");
    if (userCount) {
      this.setState({ count: +userCount });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("count", this.state.count);
  }

  componentWillUnmount() {
    clearInterval(this.counterId);
  }

  handlerStart = () => {
    this.setState({ isCounting: true });

    this.counterId = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  };

  handlerStop = () => {
    this.setState({ isCounting: false });
    clearInterval(this.counterId);
  };

  handlerRaset = () => {
    this.setState({ isCounting: false, count: 0 });
    clearInterval(this.counterId);
  };

  render() {
    return (
      <div className="App">
        <h1>React Timer</h1>
        <h3>{this.state.count}</h3>
        {!this.state.isCounting ? (
          <button onClick={this.handlerStart}>Start</button>
        ) : (
          <button onClick={this.handlerStop}>Stop</button>
        )}
        <button onClick={this.handlerReset}>Reset</button>
      </div>
    );
  }
}
