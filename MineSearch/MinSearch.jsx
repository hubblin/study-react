import React, {useReducer, createContext, useMemo} from 'react';

import Table from './Table';

import Form from './Form'

export const CODE = {
    MINE : -7,
    NORMAL : -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opend
};

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {}
})

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const initialState = {
    tableData : [],
    timer: 0,
    result: '',
    halted: false
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen); 
    }
    const data= [];
    for(let i =0 ; i < row; i++){
        const rowData = [];
        data.push(rowData);
        for(let j =0; j < cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k =0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
}

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine)
            };
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...row]
            });
            const checked = [];
            const checkAtrround = (row, cell) => {
                if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
                    return;
                }
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){
                    return;
                }
                if(checked.includes(row + ',' + cell)){ //이미 검사한 칸이면
                    return;
                }else{
                    checked.push(row + ',' + cell);
                }
                let around = [];
                if(tableData[row -1]){
                    around = around.concat( 
                        tableData[row -1][cell -1],
                        tableData[row -1][cell], 
                        tableData[row -1][cell +1])
                };
                around = around.concat(
                    tableData[row][cell -1],
                    tableData[row][cell +1],
                )
                if(tableData[row + 1]){
                    around = around.concat(
                        tableData[row +1][cell -1],
                        tableData[row +1][cell], 
                        tableData[row +1][cell +1]
                    )
                }
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                tableData[row][cell] = count;
                if(count === 0){
                    if(row > -1){
                        const near = [];
                        if(row - 1 > -1){
                            near.push([row -1, cell -1]);
                            near.push([row -1, cell]);
                            near.push([row -1, cell +1]);
                        }
                        near.push([row, cell -1]);
                        near.push([row, cell +1]);

                        if(row +1 < tableData.length){
                            near.push([row +1,cell -1]);
                            near.push([row +1,cell]);
                            near.push([row + 1,cell +1]);
                        }
                        console.log(near);
                        near.forEach((n) => {
                            if(tableData[n[0]][n[1]] !== CODE.OPENED){
                                checkAtrround(n[0], n[1]);
                            }
                        })
                    }
                }
            }
            // tableData[action.row][action.cell] = CODE.OPENED;
            checkAtrround(action.row, action.cell);
            return{
                ...state,
                tableData
            };
        }
        case CLICK_MINE:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return{
                ...state,
                tableData,
                halted : true
            }
        }
        //깃발꼽기
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return{
                ...state,
                tableData,
            }
        }
        //깃발이면 물음표로
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return{
                ...state,
                tableData,
            }
        }
        //물음표면 보통으로 변환
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            }else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return{
                ...state,
                tableData,
            }
        }
        default:
            return state;
    }
}

const MinSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //캐싱을 해줘야 성능저하가 일어나지 않는다.
    const value = useMemo(() => ({tableData: state.tableData, halted: state.halted,dispatch}),[state.tableData, state.halted])

    return (
        <TableContext.Provider value={value}>
            <Form/>
            <div>{state.timer}</div>
            <Table/>
            <div>{state.result}</div>
        </TableContext.Provider>
    )
}

export default MinSearch;