import { css } from "@emotion/css";

import { addCustomKnight, addRandomKnight, createBoard, getMovesWithDepth, getShortestPath } from "./board";

const content      = document.querySelector( "#content" );
const contentStyle = content.classList.add( css`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    }
  }
` );
const tip          = document.createElement( "h2" );
const tipStyle     = tip.classList.add( css`
  & {

    color: hsl( 0deg 0% 100% / 75% );
    font-size: 1.5em;
    font-family: monospace;
    line-height: 1.5;
  }
` );
tip.append( "Reload to start over" );
const boardContainer = document.createElement( "div" );
content.append( tip );
const sampleBoard = createBoard( 8 )( 8 )();
const boardStyle  = boardContainer.classList.add( css`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
const addKnight   = cell => {

  const knight = addCustomKnight( cell.address );
  const board  = createBoard( 8 )( 8 )( [knight] );

  boardContainer.replaceChildren();
  drawBoard( board )( knight );

  return knight;

};
const addPath
  = knight =>
    cell => {

      const moves = getMovesWithDepth( knight.address )()();
      const path  = getShortestPath( moves )( cell.address );
      const board = createBoard( 8 )( 8 )( [knight, ...path] );

      boardContainer.replaceChildren();
      drawBoard( board )( knight );

    };
const drawCell
  = cell =>
    rowElement =>
      knight => {

        const cellElement = document.createElement( "span" );
        const cellClass   = cellElement.classList.add( "cell" );
        cellElement.append( cell.content );

        // style cell based on content
        const cellStyle = styleCell( cell )( cellElement );
        rowElement.append( cellElement );
        const listener = cellElement.addEventListener(
          "click",
          () => {

            if ( !knight ) {

              return addKnight( cell );

            }
            addPath( knight )( cell );

          },
          { once: true }
        );

      };
const styleCell
= cell =>
  cellElement => {

    if ( cell.content === "K" ) {

      return cellElement.classList.add( css`
        & { color: hsl( 60deg 50% 100% ); }
      ` );

    }

    return cellElement.classList.add( css`
        & { color: hsl( 127deg 100% 50% ); }
      ` );

  };
const drawBoard
  = input =>
    knight => {

      input.map( row => {

        const rowElement = document.createElement( "div" );
        rowElement.classList.add( "row" );
        row.map( cell =>
          drawCell( cell )( rowElement )( knight ) );
        return boardContainer.append( rowElement );

      } );
      return content.append( boardContainer );

    };

drawBoard( sampleBoard )();
