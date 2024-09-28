const FontColor = document.getElementById("color-picker");
const CanvasColor = document.getElementById('canvas-color');
const FontSize = document.getElementById('font-size');
const Canvas = document.getElementById("my-canvas");

const Clear = document.getElementById('clear-button');
const SaveButton = document.getElementById('save-button');
const Retrive = document.getElementById('retrive-button');

const ctx = Canvas.getContext('2d')

FontColor.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

Canvas.addEventListener('mousedown',(e)=>{
     isDrawing = true;
     lastX = e.offsetX;
     lastY = e.offsetY;
})

Canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
        }
})

Canvas.addEventListener('mouseup',()=>{
    isDrawing = false;
})

CanvasColor.addEventListener('change',(e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,1100,500);
})

FontSize.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;
})

Clear.addEventListener('click', ()=>{
    ctx.clearRect(0,0,Canvas.width,Canvas.height)
})

SaveButton.addEventListener('click',()=>{
    localStorage.setItem('CanvasContents', Canvas.toDataURL());

    let link = document.createElement('a');

    link.download = 'my-canvas.png';

    link.href = Canvas.toDataURL();

    link.click();
})

Retrive.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('CanvasContents');

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0)
    }
})