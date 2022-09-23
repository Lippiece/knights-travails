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
const getMoves
  = position =>
    ( board = createBoard( 8 )( 8 )() ) =>
      [
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
const getRoute
    = start =>
      end =>
        ( counter = 0 ) => {

          console.log( counter );
          if ( counter > 5 ) { return [] }

          const moves = getMoves( start )()
            .map( move =>
              ( {
                address : move.address,
                content : move.content,
                previous: start,
              } ) );
          if ( moves
            .some( cell =>
              cell.address.column === end.column
             && cell.address.row === end.row ) ) {

            return [start, moves.find( cell =>
              cell.address.column === end.column
             && cell.address.row === end.row ).address];

          }
          return [start,
            moves.map( move =>
              ( {
                address : move.address,
                content : move.content,
                next    : getRoute( move.address )( end )( counter + 1 ),
                previous: start,
              } ) )[ 0 ].next].flat();

        };
console.log(
  getRoute( { column: 0, row: 0 } )( { column: 6, row: 6 } )()
);
export { addKnight, createBoard, getMoves };
