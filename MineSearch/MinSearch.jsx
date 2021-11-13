import React, {useReducer, createContext, useMemo} from 'react';

import Table from './Table';
import Td from './Td';

import Form from './Form'

export const CODE = {
    MINE = -7,
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

export const START_GAME = 'START_GAME'

const initialState = {
    tableData : [],
    timer: 0,
    result: 0
};

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine)
            }
        default:
            return state;
    }
}

const MinSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //캐싱을 해줘야 성능저하가 일어나지 않는다.
    const value = useMemo(() => ({tableData: state.tableData, dispatch}))

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