import React, { PureComponent, createRef } from "react";
import History from "./Historys";
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let number = Array.from(
    { length: 4 },
    (_, i) => candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]
  );
  return number;
}

class NumberBaseBall extends PureComponent {
  state = {
    result: "숫자야구",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   if (this.state.tries !== nextState.tries) {
  //     return true;
  //   }
  //   return false;
  // }

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      this.setState((prevState) => {
        //옛날 state로 현재의 state를 쓸때는 함수형 setState를 사용행야 한다.
        return {
          result: "홈런!",
          tries: [
            ...prevState.tries,
            { try: this.state.value, result: "홈런!" },
          ],
        };
      });
    } else {
      const answerArray = this.state.value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은${this.state.answer.join(
            ","
          )}였습니다`,
        });
        alert("게임을 다시 시작합니다.");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        this.state.answer.map((v, i) => {
          if (answerArray[i] === v) {
            strike++;
          } else if (answerArray.includes(v)) {
            ball++;
          }
        });
        this.setState((prevState) => {
          return {
            result: `${strike} 스트라이트 ${ball} 볼`,
            tries: [
              ...prevState.tries,
              {
                try: this.state.value,
                result: `${strike} 스트라이트 ${ball} 볼`,
              },
            ],
            value: "",
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // onInputref = (c) => {
  //   this.inputRef = c;
  // };
  inputRef = createRef();
  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            ref={this.inputRef}
            maxLength={4}
            value={value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도 : {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <History key={v.result + i} v={v} i={i} />;
          })}
        </ul>
      </>
    );
  }
}
export default NumberBaseBall;
