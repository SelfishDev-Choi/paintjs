const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');

const colors = document.getElementsByClassName("jsColor");

const range = document.getElementById("jsRange");

const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";

//const CANVAS_WIDTH = 700;
//const CANVAS_HEIGHT = 700;

//canvas.width = CANVAS_WIDTH;
//canvas.height = CANVAS_HEIGHT;

colors[0].innerText = "📌";

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);    
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5;

let painting = false;
let filling = false;

function stopPainting(){
    if(!filling){
        painting = false;
    }
}

function startPainting(){
    if(!filling){
        painting = true;
    }
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    
    if(!painting){
        ctx.beginPath(); //painting 가 false가 되면 path의 시작점을 변경해 주어야 한다. 
        //ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke()
    }
    
}

function handleClick(event){
    if(filling){
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);    
    }
}

/*
function onMouseDown(event){
    painting = true;
}


function onMouseUp(event){
    stopPainting();
}

function onMouseLeave(event){
    stopPainting();
}
*/

function handleColorClick(event){
    //console.log(event.target.style);
    const clr = event.target.style.backgroundColor;
    ctx.strokeStyle = clr;

    Array.from(colors).forEach(color => color.innerText="");

    event.target.innerText = "📌"


}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event){
    //console.log(event.target);
    if(filling === false){
        filling = true;
        mode.innerText = "Fill";
    }else{
        filling = false;
        mode.innerText = "Paint";
    }

 }

function handleSaveClick(event){
    //const image = canvas.toDataURL("image/jpeg"); //저장 포멧을 jpeg으로 변경
    const image = canvas.toDataURL(); //기본 저장포멧 png 사용
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🇰🇷]"
    link.click();
}

function handleContextMenuClick(event){
    event.preventDefault(); //이벤트를 무력화 시킨다.
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleContextMenuClick);
    canvas.addEventListener("click", handleClick); //click 이벤트를 생성해서 클릭시 filling 처리
}

//console.log(Array.from(colors));
//console.log(range);

if(colors)
{
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}
