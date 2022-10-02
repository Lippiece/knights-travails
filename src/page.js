import { css } from "@emotion/css";

import { addRandomKnight, createBoard, getMovesWithDepth, getPath } from "./board";

const bodyStyle      = document.querySelector( "body" ).classList.add( css`
  & {
    width: 100vw;
    height: 100vh;

    color: hsl( 0deg 0% 100% / 75% );
    font-size: 1.5em;
    font-family: monospace;
    line-height: 1.5;

    background-color: hsl( 0deg 0% 13% );

    & > #content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
` );
const content        = document.querySelector( "#content" );
const knight         = addRandomKnight();
const moves          = getMovesWithDepth( knight.address )();
const board          = createBoard( 8 )( 8 )( [
  knight,

  // ...moves,
  ...getPath(
    getMovesWithDepth( knight.address )()
  )(
    { column: 0, row: 0 }
  )()] );
const boardContainer = document.createElement( "div" );
const boardStyle     = boardContainer.classList.add( css`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: hsl( 0deg 0% 100% / 0% );

    .row {
      display: grid;
      grid-template-columns: repeat( 8, 1fr );

      .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2em;
        height: 2em;

        background-color: hsl( 0deg 0% 25% );
      }

    &:nth-child(even) .cell:nth-child(odd) {
      background-color: hsl( 0deg 0% 20% );
    }
    &:nth-child(odd) .cell:nth-child(even) {
      background-color: hsl( 0deg 0% 20% );
    }
    }
  }
` );
const drawCell
  = cell =>
    rowElement => {

      const cellElement = document.createElement( "span" );
      const cellClass   = cellElement.classList.add( "cell" );
      cellElement.append( cell.content );

      // style cell based on content
      const cellStyle = styleCell( cell )( cellElement );
      return rowElement.append( cellElement );

    };
const styleCell
= cell =>
  cellElement => {

    if ( cell.content === "K" ) {

      return cellElement.classList.add( css`
        & {
          color: hsl( 60deg 50% 100% );
        }
      ` );

    }

    return cellElement.classList.add( css`
        & {
          color: hsl( 127deg 100% 50% );
        }
      ` );

  };
const drawBoard = input => {

  input.map( row => {

    const rowElement = document.createElement( "div" );
    rowElement.classList.add( "row" );
    row.map( cell =>
      drawCell( cell )( rowElement ) );
    return boardContainer.append( rowElement );

  } );
  return content.append( boardContainer );

};

drawBoard( board );
