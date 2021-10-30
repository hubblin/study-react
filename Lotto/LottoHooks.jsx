import React, {
  Component,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bounsNumber = shuffle[shuffle.length - 1];
  const winNumber = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumber, bounsNumber];
}

const Lotto = () => {
  //hooks는 render가 따로 존재하지가 않아서 전체가 재실행되기때문에
  //useMemo를 사용하여 최적화할 수 있다.
  //tip. 함수가 있으면 함수에 console.log를 찍어보고 원하는데로 동작하는지 확인하는
  //습관을 익히자
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBals] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // useEffect(() => {
  //   //ajax
  // }, []);

  // const mounted = useRef(false);
  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     //ajax
  //   }
  // }, [바뀌는 값])

  useEffect(() => {
    for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBals((prevState) => [...prevState, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    return () => {
      timeouts.current.forEacth((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);

  //useCallback은 함수를 기억한다.
  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setWinBals([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

// class Lotto extends Component {
//   state = {
//     winNumbers: getWinNumbers(), // 당첨 숫자들
//     winBalls: [],
//     bonus: null, //보너스 공
//     redo: false,
//   };
//   timeouts = [];

//   runTimeouts = () => {
//     for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
//       this.timeouts[i] = setTimeout(() => {
//         this.setState((prevState) => {
//           return {
//             winBalls: [...prevState.winBalls, this.state.winNumbers[i]],
//           };
//         });
//       }, (i + 1) * 1000);
//     }
//     this.timeouts[6] = setTimeout(() => {
//       this.setState({
//         bonus: this.state.winNumbers[6],
//         redo: true,
//       });
//     }, 7000);
//   };

//   componentDidMount() {
//     this.runTimeouts();
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.winBalls.length === 0) {
//       this.runTimeouts();
//     }
//   }

//   //메모리를 계속 먹지 않도록 정리를 해줘야 한다.
//   //setTimeout은 문제를 일으키지 않을수도 있으나 interval의 경우
//   //계속해서 메모리를 잡아먹어 메모리 누수 문제가 발생한다.
//   componentWillUnmount() {
//     this.timeouts.forEach((v) => {
//       clearTimeout(v);
//     });
//   }

//   onClickRedo = () => {
//     this.setState({
//       winNumbers: getWinNumbers(), // 당첨 숫자들
//       winBalls: [],
//       bonus: null, //보너스 공
//       redo: false,
//     });
//     this.timeouts = [];
//   };

//   render() {
//     const { winBalls, bonus, redo } = this.state;
//     return (
//       <>
//         <div>당첨 숫자</div>
//         <div id="결과창">
//           {winBalls.map((v) => (
//             <Ball key={v} number={v} />
//           ))}
//         </div>
//         <div>보너스!</div>
//         {bonus && <Ball number={bonus} />}
//         {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
//       </>
//     );
//   }
// }
export default Lotto;
