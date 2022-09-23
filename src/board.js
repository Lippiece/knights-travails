const createBoard
  = rows =>
    columns =>
      ( input = [{
        address: { column: 0, row: 0 },
        content: "_",
      }] ) =>
        Array.from( { length: rows }, ( _, row ) =>
          Array.from( { length: columns }, ( __, column ) =>
            input.find( cell =>
              cell.address.column === column
                && cell.address.row === row )
                 || {
                   address: { column, row },
                   content: "_",
                 } ) );
const knightMoves
  = knight =>
    ( board = createBoard( 8 )( 8 )() ) =>
      [
        { column: knight.column + 2, row: knight.row + 1 },
        { column: knight.column + 2, row: knight.row - 1 },
        { column: knight.column - 2, row: knight.row + 1 },
        { column: knight.column - 2, row: knight.row - 1 },
        { column: knight.column + 1, row: knight.row + 2 },
        { column: knight.column + 1, row: knight.row - 2 },
        { column: knight.column - 1, row: knight.row + 2 },
        { column: knight.column - 1, row: knight.row - 2 },
      ].filter( move =>
        move.column >= 0
          && move.column < board[ 0 ].length
          && move.row >= 0
          && move.row < board.length )
        .map( move =>
          ( {
            address: board[ move.row ][ move.column ].address,
            content: "*",
          } ) );
const addKnight
  = board =>
    ( {
      address: {
        column: Math.floor( Math.random() * board[ 0 ].length ),
        row   : Math.floor( Math.random() * board.length ),
      },
      content: "K",
    } );
const printBoard
  = board =>
    console.log( board.map( row =>
      row.map( cell =>
        cell.content )
        .join( " " ) )
      .join( "\n" ) );

export { addKnight, createBoard, knightMoves };
