import { css } from "@emotion/css";

import { addKnight, createBoard, getMoves } from "./board.js";

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
const sampleBoard    = createBoard( 8 )( 8 )();
const knight         = addKnight( sampleBoard );
const moves          = getMoves( knight.address )();
const board          = createBoard( 8 )( 8 )( [knight, ...moves] );
const boardContainer = document.createElement( "div" );
boardContainer.classList.add( css`
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
board.map( row => {

  const rowContainer = document.createElement( "div" );
  rowContainer.classList.add( "row" );
  row.map( cell => {

    const cellContainer = document.createElement( "span" );
    cellContainer.classList.add( "cell" );
    cellContainer.append( cell.content );

    // style cell based on content
    if ( cell.content === "K" ) {

      cellContainer.classList.add( css`
        & {
          color: hsl( 60deg 50% 100% );
        }
      ` );

    } else if ( cell.content === "*" ) {

      cellContainer.classList.add( css`
& {
          color: hsl( 127deg 100% 50% );
        }
        ` );

    }
    rowContainer.append( cellContainer );

  } );
  boardContainer.append( rowContainer );

} );
content.append( boardContainer );
