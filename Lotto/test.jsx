import React, { PureComponent } from "react";
//pureComponent 예제 : state가 변하지 않으면 렌더링하지 않는다.
class BlahBlah extends PureComponent {
  state = {
    count: 0,
    count2: 0,
  };
  counter() {
    this.setState({
      count: this.state.count,
    });
  }
  counter2() {
    this.setState({
      count2: this.state.count2 + 1,
    });
  }
  componentDidUpdate() {
    console.log(this.state.count);
  }
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.counter.bind(this)}>click</button>
        {this.state.count2}
        <button onClick={this.counter2.bind(this)}>click2</button>
      </div>
    );
  }
}

export default BlahBlah;
