let canvas:HTMLCanvasElement = document.querySelector('.canvas') as HTMLCanvasElement
let context:CanvasRenderingContext2D = canvas?.getContext('2d') as CanvasRenderingContext2D

abstract class Shape{
    x:number;
    y:number;
    color:string;
    dragging:boolean = false;
    distFromMouseX:number = 0;
    distFromMouseY:number = 0;
    constructor(x:number, y:number, color:string){
        this.x = x;
        this.y = y;
        this.color = color;
    }
    abstract draw(ctx:CanvasRenderingContext2D):void;

    abstract isShapeClicked(mouseX:number, mouseY:number):boolean
}

class Square extends Shape{
    size:number;

    constructor(x:number, y:number, color:string, size:number){
        super(x,y,color);
        this.size = size;
    }

    draw(ctx:CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.size,this.size)
    }

    isShapeClicked(mouseX: number, mouseY: number): boolean {
        if((mouseX >= this.x && mouseX <= (this.x+this.size)) &&
            mouseY >= this.y && mouseY <= (this.y+this.size)){
            this.distFromMouseX = mouseX - this.x
            this.distFromMouseY = mouseY - this.y
            console.log('Square Clicked');
            return true;
        }
        return false;
    }

}

class Rectangle extends Shape{
    width:number;
    height:number;

    constructor(x:number, y:number, color:string, width:number, height:number){
        super(x,y,color);
        this.width = width;
        this.height = height;
    }
    draw(ctx:CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    isShapeClicked(mouseX: number, mouseY: number): boolean {
        if((mouseX >= this.x && mouseX <= (this.x+this.width)) &&
            mouseY >= this.y && mouseY <= (this.y+this.height)){
            this.distFromMouseX = mouseX - this.x
            this.distFromMouseY = mouseY - this.y
            console.log('Rectangle Clicked');
            return true;
        }
        return false
    }
}

class Circle extends Shape{
    radius:number;

    constructor(x:number, y:number, radius:number, color:string){
        super(x,y,color);
        this.radius = radius
    }
    draw(ctx:CanvasRenderingContext2D):void{
        ctx.fillStyle = this.color;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath()
    }

    isShapeClicked(mouseX: number, mouseY: number): boolean {

        if(Math.sqrt(Math.pow(mouseX-this.x,2)+Math.pow(mouseY-this.y,2)) <= this.radius){
            this.distFromMouseX = mouseX - this.x
            this.distFromMouseY = mouseY - this.y
            console.log('Circle Clicked');
            return true;
        }
        
        return false;
    }
}

let shapes:Shape[] = []

shapes.push(new Square(500, 200, 'blue', 200))
shapes.push(new Rectangle(300,500,'green',100, 200))

const c1 = new Circle(200, 200, 100, 'red')
const c2 = new Circle(600, 200, 100, 'red')

shapes.push(c1)
shapes.push(c2)

const calculate_curves = (c1:Circle,c2:Circle)=>{

    
    const angleRad = Math.atan((c2.y-c1.y)/(c2.x - c1.x))
    let angleDeg = angleRad * 180/Math.PI

    console.log("angleDeg", angleDeg);

    const perpendicularRad1 = angleRad + (3*Math.PI/2);
    const perpendicularAngle1 = perpendicularRad1 * 180/Math.PI

    console.log("perp angle", perpendicularAngle1);

    const X1 = c1.radius*Math.cos(perpendicularRad1)
    const Y1 = c1.radius*Math.sin(perpendicularRad1)

    const perpendicularRad2 = angleRad + (Math.PI/2);
    const perpendicularAngle2 = perpendicularRad2 * 180/Math.PI

    console.log("perp angle", perpendicularAngle2);

    const X2 = c1.radius*Math.cos(perpendicularRad2)
    const Y2 = c1.radius*Math.sin(perpendicularRad2)

    const ax = X1+c1.x
    const ay = Y1+c1.y

    const bx = X2+c1.x
    const by = Y2+c1.y

    const cx = X1+c2.x
    const cy = Y1+c2.y

    const dx = X2+c2.x
    const dy = Y2+c2.y

    /* context.fillStyle = "green"
    context.beginPath()
    context.arc(ax,ay,10,0,Math.PI*2,false);
    context.fill()
    context.closePath()

    context.fillStyle = "yellow"
    context.beginPath()
    context.arc(bx,by,10,0,Math.PI*2,false);
    context.fill()
    context.closePath()

    context.fillStyle = "green"
    context.beginPath()
    context.arc(cx,cy,10,0,Math.PI*2,false);
    context.fill()
    context.closePath()

    context.fillStyle = "yellow"
    context.beginPath()
    context.arc(dx,dy,10,0,Math.PI*2,false);
    context.fill()
    context.closePath()

    context.fillStyle = "black"
    context.beginPath()
    context.arc((ax+cx)/2,(ay+cy)/2,10,0,Math.PI*2,false);
    context.fill()
    context.closePath()
    
    context.beginPath()
    context.arc((bx+dx)/2,((by+dy)/2),10,0,Math.PI*2,false);
    context.fill()
    context.closePath()

    context.beginPath()
    context.arc((c1.x+c2.x)/2,(c1.y+c2.y)/2,10,0,Math.PI*2,false);
    context.fill()
    context.closePath() */

    context.fillStyle='red'
    context.beginPath()
    context.moveTo(ax,ay)
    context.bezierCurveTo((c1.x+c2.x)/2,(c1.y+c2.y)/2,(c1.x+c2.x)/2,(c1.y+c2.y)/2,cx,cy);

    context.lineTo(dx,dy)
    context.quadraticCurveTo((c1.x+c2.x)/2,(c1.y+c2.y)/2,bx,by);
    context.fill()
    context.closePath()
    

    /* context.moveTo(X1+c1.x,Y1+c1.y)
    context.lineTo(X2+c2.x,Y2+c2.y)

    context.moveTo(X2+c1.x,Y2+c1.y)
    context.lineTo(X2+c2.x,Y2+c2.y) */
    
    //context.stroke()
    
}

const drawAll = ()=>{
    context.clearRect(0,0,canvas.width, canvas.height)
    for(let shape of shapes){
        shape.draw(context)
    }
    /* context.beginPath()
    context.moveTo(c1.x,c1.y)
    context.lineTo(c2.x,c2.y)
    context.stroke()
    
    context.moveTo(c1.x-c1.radius,c1.y)
    context.lineTo(c1.x+c1.radius,c1.y)
    context.stroke()

    context.moveTo(c1.x,c1.y+c1.radius)
    context.lineTo(c1.x,c1.y-c1.radius)
    context.stroke()

    context.moveTo(c2.x-c2.radius,c2.y)
    context.lineTo(c2.x+c2.radius,c2.y)
    context.stroke()

    context.moveTo(c2.x,c2.y+c2.radius)
    context.lineTo(c2.x,c2.y-c2.radius)
    context.stroke()
    context.closePath() */
    calculate_curves(c2,c1);
}

const onDragStart = (x:number, y:number, shapes:Shape[])=>{

    for(let shape of shapes){
        if(shape.isShapeClicked(x,y)){
            shape.dragging = true;
            return;
        }
    }
}

const onDragEnd = (shapes:Shape[])=>{
    for(let shape of shapes){
        if(shape.dragging){
            shape.dragging = false;
            return;
        }
    }
}

const onDragging = (x:number, y:number, shapes:Shape[])=>{
    for(let shape of shapes){
        if(shape.dragging){
            shape.x = x - shape.distFromMouseX
            shape.y = y - shape.distFromMouseY
            drawAll()
        }
    }
    
}

canvas.addEventListener('mouseup', (e)=>{
    e.preventDefault();
    onDragEnd(shapes)
})

canvas.addEventListener('mouseout', (e)=>{
    e.preventDefault();
    onDragEnd(shapes)
})

canvas.addEventListener('mousedown', (e)=>{
    e.preventDefault();
    onDragStart(e.clientX, e.clientY, shapes)
})

canvas.addEventListener('mousemove', (e)=>{
    e.preventDefault();
    onDragging(e.clientX, e.clientY, shapes)
})

const resize = ()=>{
    canvas.width = window.innerWidth - 20
    canvas.height = window.innerHeight - 10

    canvas.style.border = '5px solid black'
    drawAll()
    
}
window.addEventListener('resize',resize)
window.addEventListener('DOMContentLoaded', resize)
