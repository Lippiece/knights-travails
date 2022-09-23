import { css } from "@emotion/css";

import { addKnight, createBoard, knightMoves } from "./board.js";

document.querySelector( "body" ).classList.add( css`
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
const board          = createBoard( 8 )( 8 )();
const boardContainer = document.createElement( "div" );
boardContainer.classList.add( css`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    /* padding: 10em; */

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
        border-radius: 0.25em;
      }
    }
  }
` );
board.map( row => {

  const rowContainer = document.createElement( "div" );
  rowContainer.classList.add( "row" );
  row.map( cell => {

    const cellContainer = document.createElement( "span" );
    cellContainer.classList.add( "cell" );
    cellContainer.textContent = cell.content;
    rowContainer.append( cellContainer );

  } );
  boardContainer.append( rowContainer );

} );
content.append( boardContainer );
