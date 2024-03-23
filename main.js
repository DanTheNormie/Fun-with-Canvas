var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canvas = document.querySelector('.canvas');
var context = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
var Shape = /** @class */ (function () {
    function Shape(x, y, color) {
        this.dragging = false;
        this.distFromMouseX = 0;
        this.distFromMouseY = 0;
        this.x = x;
        this.y = y;
        this.color = color;
    }
    return Shape;
}());
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(x, y, color, size) {
        var _this = _super.call(this, x, y, color) || this;
        _this.size = size;
        return _this;
    }
    Square.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    };
    Square.prototype.isShapeClicked = function (mouseX, mouseY) {
        if ((mouseX >= this.x && mouseX <= (this.x + this.size)) &&
            mouseY >= this.y && mouseY <= (this.y + this.size)) {
            this.distFromMouseX = mouseX - this.x;
            this.distFromMouseY = mouseY - this.y;
            console.log('Square Clicked');
            return true;
        }
        return false;
    };
    return Square;
}(Shape));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(x, y, color, width, height) {
        var _this = _super.call(this, x, y, color) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Rectangle.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Rectangle.prototype.isShapeClicked = function (mouseX, mouseY) {
        if ((mouseX >= this.x && mouseX <= (this.x + this.width)) &&
            mouseY >= this.y && mouseY <= (this.y + this.height)) {
            this.distFromMouseX = mouseX - this.x;
            this.distFromMouseY = mouseY - this.y;
            console.log('Rectangle Clicked');
            return true;
        }
        return false;
    };
    return Rectangle;
}(Shape));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, radius, color) {
        var _this = _super.call(this, x, y, color) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    };
    Circle.prototype.isShapeClicked = function (mouseX, mouseY) {
        if (Math.sqrt(Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2)) <= this.radius) {
            this.distFromMouseX = mouseX - this.x;
            this.distFromMouseY = mouseY - this.y;
            console.log('Circle Clicked');
            return true;
        }
        return false;
    };
    return Circle;
}(Shape));
var shapes = [];
shapes.push(new Square(500, 200, 'blue', 200));
shapes.push(new Rectangle(300, 500, 'green', 100, 200));
var c1 = new Circle(200, 200, 100, 'red');
var c2 = new Circle(600, 200, 100, 'red');
shapes.push(c1);
shapes.push(c2);
var calculate_curves = function (c1, c2) {
    var angleRad = Math.atan((c2.y - c1.y) / (c2.x - c1.x));
    var angleDeg = angleRad * 180 / Math.PI;
    console.log("angleDeg", angleDeg);
    var perpendicularRad1 = angleRad + (3 * Math.PI / 2);
    var perpendicularAngle1 = perpendicularRad1 * 180 / Math.PI;
    console.log("perp angle", perpendicularAngle1);
    var X1 = c1.radius * Math.cos(perpendicularRad1);
    var Y1 = c1.radius * Math.sin(perpendicularRad1);
    var perpendicularRad2 = angleRad + (Math.PI / 2);
    var perpendicularAngle2 = perpendicularRad2 * 180 / Math.PI;
    console.log("perp angle", perpendicularAngle2);
    var X2 = c1.radius * Math.cos(perpendicularRad2);
    var Y2 = c1.radius * Math.sin(perpendicularRad2);
    var ax = X1 + c1.x;
    var ay = Y1 + c1.y;
    var bx = X2 + c1.x;
    var by = Y2 + c1.y;
    var cx = X1 + c2.x;
    var cy = Y1 + c2.y;
    var dx = X2 + c2.x;
    var dy = Y2 + c2.y;
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
    context.fillStyle = 'red';
    context.beginPath();
    context.moveTo(ax, ay);
    context.bezierCurveTo((c1.x + c2.x) / 2, (c1.y + c2.y) / 2, (c1.x + c2.x) / 2, (c1.y + c2.y) / 2, cx, cy);
    context.lineTo(dx, dy);
    context.quadraticCurveTo((c1.x + c2.x) / 2, (c1.y + c2.y) / 2, bx, by);
    context.fill();
    context.closePath();
    /* context.moveTo(X1+c1.x,Y1+c1.y)
    context.lineTo(X2+c2.x,Y2+c2.y)

    context.moveTo(X2+c1.x,Y2+c1.y)
    context.lineTo(X2+c2.x,Y2+c2.y) */
    //context.stroke()
};
var drawAll = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
        var shape = shapes_1[_i];
        shape.draw(context);
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
    calculate_curves(c2, c1);
};
var onDragStart = function (x, y, shapes) {
    for (var _i = 0, shapes_2 = shapes; _i < shapes_2.length; _i++) {
        var shape = shapes_2[_i];
        if (shape.isShapeClicked(x, y)) {
            shape.dragging = true;
            return;
        }
    }
};
var onDragEnd = function (shapes) {
    for (var _i = 0, shapes_3 = shapes; _i < shapes_3.length; _i++) {
        var shape = shapes_3[_i];
        if (shape.dragging) {
            shape.dragging = false;
            return;
        }
    }
};
var onDragging = function (x, y, shapes) {
    for (var _i = 0, shapes_4 = shapes; _i < shapes_4.length; _i++) {
        var shape = shapes_4[_i];
        if (shape.dragging) {
            shape.x = x - shape.distFromMouseX;
            shape.y = y - shape.distFromMouseY;
            drawAll();
        }
    }
};
canvas.addEventListener('mouseup', function (e) {
    e.preventDefault();
    onDragEnd(shapes);
});
canvas.addEventListener('mouseout', function (e) {
    e.preventDefault();
    onDragEnd(shapes);
});
canvas.addEventListener('mousedown', function (e) {
    e.preventDefault();
    onDragStart(e.clientX, e.clientY, shapes);
});
canvas.addEventListener('mousemove', function (e) {
    e.preventDefault();
    onDragging(e.clientX, e.clientY, shapes);
});
var resize = function () {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 10;
    canvas.style.border = '5px solid black';
    drawAll();
};
window.addEventListener('resize', resize);
window.addEventListener('DOMContentLoaded', resize);
