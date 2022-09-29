import isEqual from  "lodash/fp/isEqual.js";

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
      ( depth = 2 ) => {
        const board = createBoard( 8 )( 8 )()

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
            content : "*",
            next    : getMoves( move )( depth - 1 ),
            previous: position,
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
const getPath
  = start =>
    end =>
      ( path = [] ) => {

        if ( isEqual( path[ path.length - 1 ] )( end ) ) { return path }

        const next = [...start]
          .sort( ( previous, next_ ) =>
            ( Math.abs( previous.address.column - end.column )
              + Math.abs( previous.address.row - end.row ) )
              - (
                Math.abs( next_.address.column - end.column )
              + Math.abs( next_.address.row - end.row ) ) );

        // last some contain the same distance
        if ( isEqual( next[ 0 ].address )( path[ path.length - 2 ] ) ) {

          return getPath( getMoves( next[ 1 ].address )() )( end )( [
            ...path,
            next[ 1 ].address,
          ] );

        }

        return getPath( getMoves( next[ 0 ].address )() )( end )( [
          ...path,
          next[ 0 ].address,
        ] );

      };
const startMoves = getMoves( { column: 0, row: 0 } )( 2 );
console.log( getPath( startMoves )( { column: 7, row: 7 } )() );
export { addKnight, createBoard, getMoves };
