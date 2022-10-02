import fp from  "lodash/fp";

/**
 * It takes rows and columns and returns a function that
 * takes an array of cells and returns a two dimensional array of them.
 */
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
/**
 * It takes a move and returns an array of all the moves that came before it
 */
const getAllPreviousMoves = move =>
  ( move.previous
    ? [
      ...getAllPreviousMoves( move.previous ),
      move.previous,
    ]
    : [] );
/**
 * It returns an array of possible moves from a position
 */
const possibleMoves = position =>
  ( [
    { column: position.column + 2, row: position.row + 1 },
    { column: position.column + 2, row: position.row - 1 },
    { column: position.column - 2, row: position.row + 1 },
    { column: position.column - 2, row: position.row - 1 },
    { column: position.column + 1, row: position.row + 2 },
    { column: position.column + 1, row: position.row - 2 },
    { column: position.column - 1, row: position.row + 2 },
    { column: position.column - 1, row: position.row - 2 },
  ] )
    .filter( move =>

    // filtering out moves that are out of bounds
      move.column >= 0
      && move.column < board[ 0 ].length
      && move.row >= 0
      && move.row < board.length );
const getMovesWithDepth
  = position =>
    ( depth = 6 ) =>
      ( moves = [] ) => {

        if ( depth === 0 ) { return position }

        const addresses = possibleMoves( position )

          // filtering out moves that are already present in the moves array
          .filter( move =>
            !moves.some( existingMove =>
              fp.isEqual( existingMove.address, move ) ) );

        return addresses.map( branch =>
          ( {
            address: branch,
            next   : getMovesWithDepth( branch )( depth - 1 )( [
              ...moves,
              position,
            ] ),
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
      path.some( pathMove =>
        fp.isEqual( pathMove )( move ) );
const markPath
  = path =>
    path.map( move =>
      ( {
        address: move,
        content: fp.indexOf( move )( path ) + 1,
      } ) );
const sortMovesByDistance
  = inputMoves =>
    destination =>
    // eslint-disable-next-line fp/no-mutating-methods
      [...inputMoves]
        .sort( ( previous, next ) =>
          ( Math.abs( previous.address.column - destination.column )
        + Math.abs( previous.address.row - destination.row ) )
        - (
          Math.abs( next.address.column - destination.column )
          + Math.abs( next.address.row - destination.row ) ) );
const getPath
  = inputMoves =>
    destination =>
      ( path = [] ) => {

        if ( fp.isEqual( path[ path.length - 1 ] )( destination ) ) {

          console.log( "Found path" );
          console.log( "path", { complete: markPath( path ) } );
          return { complete: markPath( path ) };

        }
        if ( !inputMoves[ 0 ] ) {

          return { incomplete: markPath( [...path, inputMoves] ) };

        }
        const sortedMoves = sortMovesByDistance( inputMoves )( destination )
          .slice( 0, 2 )
          .filter( move =>
            !checkIfMovePresent( path )( move.address ) );
        return sortedMoves.flatMap( move =>
          getPath( move.next )( destination )( [
            ...path,
            move.address,
          ] ) )
          .filter( move =>
            move.complete );

      };
const board  = createBoard( 8 )( 8 )();
const knight = addRandomKnight();
const moves  = getMovesWithDepth( knight.address )()();
const path   = getPath( moves )( { column: 7, row: 7 } )();

// filter out paths that don't lead to the destination

console.log(
  "path",
  path.sort( ( previous, next ) =>
    previous.complete.length - next.complete.length )[ 0 ].complete
);
console.log( "end" );

export { addRandomKnight, createBoard, getMovesWithDepth, getPath };
