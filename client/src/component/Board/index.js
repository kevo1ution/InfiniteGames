import React from 'react';

export default (props)=>{
    let listDisplay = [];
    for(let row = 0; row < 3; row++){
        let rowString = "";
        for(let col = 0; col < 3; col++){
            rowString += String.toString(props.board[row][col]);
        }
        console.log(rowString)
        listDisplay.concat(<h1>{rowString}</h1>)
    }

    return listDisplay;
};