import React, { Component } from "react";

class buttonComponent extends Component {
  shouldComponentUpdate(props, state) {
    if (props.result === this.props.result) {
      return false;
    }
    return true;
  }
  render() {
    const { onClickBtn, result, score } = this.props;
    return (
      <>
        <div>
          <button id="rock" className="btn" onClick={onClickBtn("바위")}>
            바위
          </button>
          <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
            가위
          </button>
          <button id="papper" className="btn" onClick={onClickBtn("보")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score} 점</div>
      </>
    );
  }
}
export default buttonComponent;
