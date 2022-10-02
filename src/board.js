import fp from  "lodash/fp";

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
const getMovesWithDepth
  = position =>
    ( depth = 2 ) => {

      const board = createBoard( 8 )( 8 )();

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
          address : board[ move.row ][ move.column ].address,
          content : "·",
          next    : getMovesWithDepth( move )( depth - 1 ),
          previous: position,
        } ) );

    };
const addRandomKnight = () =>
  ( {
    address: {
      column: Math.floor( Math.random() * board[ 0 ].length ),
      row   : Math.floor( Math.random() * board.length ),
    },
    content: "K",
  } );
const checkIfMovePresent
  = path =>
    move =>
      !!path.some( pathMove =>
        fp.isEqual( pathMove )( move.address ) );
const markPath
  = path =>
    path.map( move =>
      ( {
        address: move,
        content: fp.indexOf( move )( path ) + 1,
      } ) );
const sortMovesByDistance
  = allMoves =>
    destination =>
    // eslint-disable-next-line fp/no-mutating-methods
      [...allMoves]
        .sort( ( previous, next_ ) =>
          ( Math.abs( previous.address.column - destination.column )
        + Math.abs( previous.address.row - destination.row ) )
        - (
          Math.abs( next_.address.column - destination.column )
          + Math.abs( next_.address.row - destination.row ) ) );
const addLength
  = sortedMoves =>
    path =>
      sortedMoves.map( move =>
        ( {
          ...move,
          length: path.length + 1,
        } ) );
const getPath
  = allMoves =>
    destination =>
      ( path = [] ) => {

        if ( fp.isEqual( path[ path.length - 1 ] )( destination ) ) {

          return markPath( path );

        }

        const sortedMoves = sortMovesByDistance( allMoves )( destination );
        const nextMove    = sortedMoves.find( move =>
          !checkIfMovePresent( path )( move.address ) );
        return getPath(
          getMovesWithDepth( nextMove.address )( 2 )
        )( destination )( [
          ...path,
          nextMove.address,
        ] );

      };
const board = createBoard( 8 )( 8 )();
export { addRandomKnight, createBoard, getMovesWithDepth, getPath };
