import React, {useContext} from 'react';
import { TableContext } from './MinSearch';

import Tr from './Tr';

const Table = () => {
    const {tableData} = useContext(TableContext);
    return (
        <table>
            {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i}/>)}
        </table>
    )
}

export default Table;