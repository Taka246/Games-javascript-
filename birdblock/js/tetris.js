var COLS = 9, ROWS = 11;
var board = [];
var lose;
var interval;
var current;
var currentX, currentY;
var shapes = [
    [0,1,0,0,1,1],
    [0,0,0,1,1,1]
];

var colors = [
    'lime', 'orange'
];


function init() {
    for ( var y = 0; y < ROWS; ++y ) {
	board[ y ] = [];
	for ( var x = 0; x < COLS; ++x ) {
	    board[ y ][ x ] = 0;
	}
    }
}

function newShape() {
    var id = Math.floor( Math.random() * shapes.length );
    var shape = shapes[ id ];
    current = [];
    for ( var y = 0; y < 3; ++y ) {
	current[ y ] = [];
	for ( var x = 0; x < 3; ++x ) {
	    var i = 3 * y + x;
	    if ( typeof shape[ i ] != 'undefined' && shape[ i ] ) {
		current[ y ][ x ] = id + 1;
	    }
	    else {
		current[ y ][ x ] = 0;
	    }
	}
    }
    currentX = 3;
    currentY = 0;
}

function tick() {
    if ( valid( 0, 1 ) ) {
	++currentY;
    }
    else {
	freeze();
	clearLines();
	if (lose) {
	    ctx.font = "70px 'ＭＳ Ｐゴシック'";
	    ctx.strokeStyle = "black";
	    ctx.strokeText("オワリ", 80, 234, 300);


	}

	newShape();
    }
}



function rotate( current ) {
    var newCurrent = [];
    for ( var y = 0; y < 3; ++y ) {
	newCurrent[ y ] = [];
	for ( var x = 0; x < 3; ++x ) {
	    newCurrent[ y ][ x ] = current[ 2 - x ][ y ];
	}
    }
    return newCurrent;
}
	
function freeze() {
    for ( var y = 0; y < 3; ++y ) {
	for ( var x = 0; x < 3; ++x ) {
	    if ( current[ y ][ x ] ) {
		board[ y + currentY ][ x + currentX ] = current[ y ][ x ];
	    }
	}
    }
}

function clearLines() {
    var break_flag=false;
     for ( var y = ROWS-3; y >= 0; --y ) {
	for ( var x = 0; x < COLS-2; ++x ) {
	    if ( board[ y ][ x ] >= 1 && board[ y ][ x+1 ] >= 1 && board[ y ][ x+2 ] >= 1 && board[ y+1 ][ x ] >= 1 && board[ y+1 ][ x+1 ] >= 1 && board[ y+1 ][ x+2 ] >= 1 && board[ y+2 ][ x ] >= 1 && board[ y+2 ][ x+1 ] >= 1 && board[ y+2 ][ x+2 ] >= 1  ) {
		document.getElementById( 'clearsound' ).play();
		for ( var yy = y+2; yy >= 3; --yy ){
		    board[ yy ][ x ] = board[ yy - 3 ][ x ];
		    board[ yy ][ x+1 ] = board[ yy - 3 ][ x+1 ];
		    board[ yy ][ x+2 ] = board[ yy - 3 ][ x+2 ];
		   
		   
		}
		for ( var yyy=0; yyy <= 2; ++yyy ){
		    board[ yyy ][ x ] = 0;
		    board[ yyy ][ x+1 ] = 0;
		    board[ yyy ][ x+2 ] = 0;
		}	
		break_flag=true;
		break;
	    }
	     if(break_flag){
		 break;
	     }
	}
	 if(break_flag){
	     break;
	 }
    }
}

function keyPress( key ) {
    switch ( key ) {
    case 'left':
	if ( valid( -1 ) ) {
	    --currentX;
	}
	break;
    case 'right':
	if ( valid( 1 ) ) {
	    ++currentX;
	}
	break;
    case 'down':
	if ( valid( 0, 1 ) ) {
	    ++ currentY;
	}
	break;
    case 'rotate':
	var rotated = rotate( current );
	if ( valid( 0, 0, rotated ) ) {
	    document.getElementById( 'botansound' ).play();
	    current = rotated;
	}
	break;
    }
}




function valid( offsetX, offsetY, newCurrent ) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = currentX + offsetX;
    offsetY = currentY + offsetY;
    newCurrent = newCurrent || current;
    for ( var y = 0; y < 3; ++y ) {
	for ( var x = 0; x < 3; ++x ) {
	    if ( newCurrent[ y ][ x ] ) {
		if ( typeof board[ y + offsetY ] == 'undefined'
		     || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
		     || board[ y + offsetY ][ x + offsetX ]
		     || x + offsetX < 0
		     || y + offsetY >= ROWS
		     || x + offsetX >= COLS ) {
		    if (offsetY == 1 && offsetX - currentX == 0 && offsetY - currentY == 1) {
			console.log('game over');
			lose = true;
		    }
		    return false;
		}
	    }
	}
    }
    return true;
}



function newGame() {
    clearInterval(interval);
    init();
    newShape();
    lose=false;
    interval = setInterval( tick, 200 );
    
}

newGame();
