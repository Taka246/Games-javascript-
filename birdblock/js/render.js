var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var W = 351, H = 429;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;
var img= new Image();


function render() {
    ctx.clearRect( 0, 0, W, H );
    ctx.strokeStyle = 'black';
    for ( var x = 0; x < COLS; ++x ) {
	for ( var y = 0; y < ROWS; ++y ) {
	    if ( board[ y ][ x ] ) {
		ctx.fillStyle = colors[ board[ y ][ x ] -1 ];
		drawBlock( x, y );
	    }
	}
    }
    for ( var y = 0; y < 3; ++y ) {
	for ( var x = 0; x < 3; ++x ) {
	    if ( current[ y ][ x ] ) {
		ctx.fillStyle = colors[ current[ y ][ x ] -1 ];
		drawBlock( currentX + x, currentY + y );
	    }
	}
    }
}
setInterval( render, 30 );

function drawBlock( x, y ) {
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H -1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H -1 );
}


    
