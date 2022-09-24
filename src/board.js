const createBoard
  = rows =>
    columns =>
      ( input = [{
        address: { column: 0, row: 0 },
        content: " ",
      }] ) =>
        Array.from( { length: rows }, ( _, row ) =>
          Array.from( { length: columns }, ( __, column ) =>
            input.find( cell =>
              cell.address.column === column
                && cell.address.row === row )
                 || {
                   address: { column, row },
                   content: " ",
                 } ) );
const getMoves
  = position =>
    ( board = createBoard( 8 )( 8 )() ) =>
      depth => {

        if ( depth === 0 ) { return [position] }
        const addresses = [
          { column: position.column + 2, row: position.row + 1 },
          { column: position.column + 2, row: position.row - 1 },
          { column: position.column - 2, row: position.row + 1 },
          { column: position.column - 2, row: position.row - 1 },
          { column: position.column + 1, row: position.row + 2 },
          { column: position.column + 1, row: position.row - 2 },
          { column: position.column - 1, row: position.row + 2 },
          { column: position.column - 1, row: position.row - 2 },
        ].filter( move =>
          move.column >= 0
          && move.column < board[ 0 ].length
          && move.row >= 0
          && move.row < board.length );

        return addresses.map( move =>
          ( {
            address: board[ move.row ][ move.column ].address,
            content: 3 - depth,
            next   : getMoves( move )( board )( depth - 1 ),
          } ) );

      };
const addKnight
  = board =>
    ( {
      address: {
        column: Math.floor( Math.random() * board[ 0 ].length ),
        row   : Math.floor( Math.random() * board.length ),
      },
      content: "K",
    } );
console.log(
  getMoves(
    addKnight( createBoard( 8 )( 8 )() ).address
  )(
    createBoard( 8 )( 8 )()
  )( 3 )
);
export { addKnight, createBoard, getMoves };
