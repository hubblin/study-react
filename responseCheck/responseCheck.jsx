import React, { useState, useRef } from "react";
import Response from "./response";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 눌러주세요.");
      timeOut.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); //2초에서 3초 사이
    } else if (state === "ready") {
      //성급하게 클릭
      clearTimeout(timeOut.current);
      setState("waiting");
      setMessage("너무 성급하셨군요! 초록색이 된 후에 클릭하세요.");
    } else if (state === "now") {
      //반응속도 체크
      endTime.current = new Date();
      setState("waiting");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
      setMessage("클릭해서 시작하세요.");
    }
  };

  const onReset = () => {
    setResult([]);
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      <Response onReset={onReset} result={result} />
    </>
  );
};

// class ResponseCheck extends PureComponent {
//   state = {
//     state: "waiting",
//     message: "클릭해서 시작하세요",
//     result: [],
//   };

//   timeout;
//   startTime;
//   endTime;

//   onClickScreen = () => {
//     const { state, message, result } = this.state;
//     if (state === "waiting") {
//       this.setState({
//         state: "ready",
//         message: "초록색이 되면 클릭하세요",
//       });
//       this.timeout = setTimeout(() => {
//         this.setState({
//           state: "now",
//           message: "지금 클릭",
//         });
//         this.startTime = new Date();
//       }, Math.floor(Math.random() * 1000) + 2000); //2초에서 3초 사이
//     } else if (state === "ready") {
//       //성급하게 클릭
//       clearTimeout(this.timeout);
//       this.setState({
//         state: "waiting",
//         message: "너무 성급하셨군요! 초록색이 된 후에 클릭하세요",
//       });
//     } else if (state === "now") {
//       //반응속도 체크
//       this.endTime = new Date();
//       this.setState((prevState) => {
//         return {
//           state: "waiting",
//           result: [...prevState.result, this.endTime - this.startTime],
//           message: "클릭해서 시작하세요.",
//         };
//       });
//     }
//   };
//   onReset = () => {
//     this.setState({
//       result: [],
//     });
//   };

//   renderAverage = () => {
//     const { result } = this.state;
//     return this.state.result.length === 0 ? null : (
//       <>
//         <div>
//           평균 시간:
//           {this.state.result.reduce((a, c) => a + c) / this.state.result.length}
//           ms
//         </div>
//         <button onClick={this.onReset}>리셋</button>
//       </>
//     );
//   };

//   render() {
//     const { state, message } = this.state;
//     return (
//       <>
//         <div id="screen" className={state} onClick={this.onClickScreen}>
//           {message}
//         </div>
//         <Response onReset={this.onReset} result={this.state.result} />
//       </>
//     );
//   }
// }
export default ResponseCheck;
