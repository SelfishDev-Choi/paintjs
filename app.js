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

colors[0].innerText = "๐";

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
        ctx.beginPath(); //painting ๊ฐ false๊ฐ ๋๋ฉด path์ ์์์ ์ ๋ณ๊ฒฝํด ์ฃผ์ด์ผ ํ๋ค. 
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

    event.target.innerText = "๐"


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
    //const image = canvas.toDataURL("image/jpeg"); //์ ์ฅ ํฌ๋ฉง์ jpeg์ผ๋ก ๋ณ๊ฒฝ
    const image = canvas.toDataURL(); //๊ธฐ๋ณธ ์ ์ฅํฌ๋ฉง png ์ฌ์ฉ
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[๐ฐ๐ท]"
    link.click();
}

function handleContextMenuClick(event){
    event.preventDefault(); //์ด๋ฒคํธ๋ฅผ ๋ฌด๋ ฅํ ์ํจ๋ค.
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleContextMenuClick);
    canvas.addEventListener("click", handleClick); //click ์ด๋ฒคํธ๋ฅผ ์์ฑํด์ ํด๋ฆญ์ filling ์ฒ๋ฆฌ
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
