document.ontouchstart = function(a) {
    a.preventDefault();
} 

var canvas = document.getElementById('canvas');
setCanvas(canvas);
listenToPaint(canvas);

function setCanvas(canvas) {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

function listenToPaint(canvas) {
    var prevPos = currentPos = {x: 0, y: 0};;
    var select = 'pen';
    var paint = canvas.getContext('2d');
    var color = 'rgb(0, 0, 0)';
    var thick = 5;
    var pressdown = false;
    var penIcon = document.getElementById('pen');
    var eraserIcon = document.getElementById('eraser');

    
    if (document.body.ontouchstart === undefined){
        canvas.onmousedown = function(detail) {
            pressdown = true;
            prevPos = {x: detail.clientX, y: detail.clientY};
            paint.moveTo(prevPos.x, prevPos.y);
            if (select === 'eraser') paint.clearRect(prevPos.x, prevPos.y, thick, thick);
        }
    
        canvas.onmousemove = function(detail) {
            if (pressdown){
                currentPos = {x: detail.clientX, y: detail.clientY};
                if (select === 'pen') {
                    drawLine(prevPos.x, prevPos.y, currentPos.x, currentPos.y);
                } else if (select === 'eraser') paint.clearRect(currentPos.x, currentPos.y, thick, thick);
                prevPos = currentPos;
            }
        }

        canvas.onmouseup = function(detail) {
            pressdown = false;
        }   

        penIcon.onclick = function() {
            select = 'pen';
        }
    
        eraserIcon.onclick = function() {
            select = 'eraser';
        }

    } else { 
        canvas.ontouchstart = function(detail) {
            pressdown = true;
            prevPos = {x: detail.touches[0].clientX, y: detail.touches[0].clientY};
            paint.moveTo(prevPos.x, prevPos.y);
            if (select === 'eraser') paint.clearRect(prevPos.x, prevPos.y, thick, thick);
        }
    
        canvas.ontouchmove = function(detail) {
            if (pressdown){
                currentPos = {x: detail.touches[0].clientX, y: detail.touches[0].clientY};
                if (select === 'pen') {
                    drawLine(prevPos.x, prevPos.y, currentPos.x, currentPos.y);
                } else if (select === 'eraser') paint.clearRect(currentPos.x, currentPos.y, thick, thick);
                prevPos = currentPos;
            }
        }

        penIcon.ontouchstart = function() {
            select = 'pen';
        }
    
        eraserIcon.ontouchstart = function() {
            select = 'eraser';
        }
    }

    function drawLine(x1, y1, x2, y2) {
        paint.beginPath();
        paint.strokeStyle = color;
        paint.moveTo(x1, y1);
        paint.lineWidth = thick;
        paint.lineTo(x2, y2);
        paint.stroke();
        paint.closePath();
    }
} 