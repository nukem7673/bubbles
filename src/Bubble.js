import Canvas from "./Canvas";

class Bubble {
    constructor(props) {
        this.context = props.context;
	this.canvas = this.context.canvas;
	this.ch = this.canvas.height;
	this.cw = this.canvas.width;
        this.x = props.x;
        this.y = props.y;
        this.color = props.color;
	this.strokeStyle = props.strokeStyle;
        this.radius = props.radius;
        this.velocity = props.velocity;
        console.log(`initialized a bubble just now. Context: ${this.context}`)
	
	this.update = this.update.bind(this);
    }


    update() {

	 // moved too far right                            
         if (this.x + this.radius > this.cw) {
	 	if (this.velocity[0] >= 0) {
                	this.velocity[0] *= -1.01;
		}
         } 
	 // moved too far left 
         else if(this.x - this.radius <= 0) {
		if (this.velocity[0] < 0) {
         		this.velocity[0] *= -1.01;
		}
         } 
         // moved too far down 
         if ((this.y + this.radius) > this.ch) {
		 if (this.velocity[1] > 0) {
                 	this.velocity[1] *= -1.01;
		 }
         } // moved too far up   
         else if((this.y - this.radius) < 0) {
		 if (this.velocity[1] < 0) {
                 	this.velocity[1] *= -1.01;
		 }
         } 
//	if (this.x + this.velocity
	    this.moveX = Math.sin(this.velocity[0]);
	    this.moveY = Math.sin(this.velocity[1]);
            this.x += this.moveX; 
            this.y += this.moveY;

            this.context.beginPath()
            this.context.arc(this.x, this.y, this.radius, 0, (2 * Math.PI), false)
	    this.context.strokeStyle = this.strokeStyle
            this.context.fillStyle = this.color
            this.context.lineWidth = 2
            this.context.fill()
	    this.context.stroke()

        }

    }


    export default Bubble
