import React, { PureComponent } from "react";

import ButtonComponent from "./button";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

class RSP extends PureComponent {
  state = {
    result: "",
    imgCoord: "0",
    score: 0,
  };

  interval;

  componentDidMount() {
    //컴포넌트가 첫 렌더링된 후 -> 비동기 요청을 많이 해요
    this.interval = setInterval(this.changeHand, 100);
  }

  componentDidUpdate() {
    //리렌더링 후
  }

  componentWillUnmount() {
    //컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 해요
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state; // <- 클로저 문제
    //비동기함수 바깥에있는 변수를 참조하면 클로저 문제가 발생한다. <- 변수의 범위를 염두해 두자
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state;

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    clearInterval(this.interval);
    if (diff === 0) {
      this.setState({
        result: "비겼습니다.",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다.",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다.",
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/285/106/1/23285106.jpg) ${imgCoord} 0`,
          }}
        ></div>
        <ButtonComponent
          result={result}
          score={score}
          onClickBtn={this.onClickBtn}
        />
      </>
    );
  }
}
export default RSP;
