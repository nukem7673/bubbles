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
		this.rx = this.x - props.circle.cp[0];
		this.ry = this.y - props.circle.cp[1];
                this.strokeStyle = props.strokeStyle;
                this.radius = props.radius;
                this.velocity = props.velocity;
                this.circle = props.circle;
                this.update = this.update.bind(this);
		this.cr = props.circle.radius;
                this.isPressed = false;
		this.theta = null;
                this.isOutsideCircle = this.isOutsideCircle.bind(this)
                console.log(`New bubble with color ${this.color}`)

		window.addEventListener("touchstart", () => {
			this.isPressed = true;
			const h = Math.sqrt((this.rx)**2 + (this.ry)**2);
			const cosine = this.rx / h;
			this.theta = Math.acos(cosine);
		})
		window.addEventListener("touchend", () => {
                        this.isPressed = false;
		})
        }


        update(frameCount) {
                const distanceToCenter = this.isOutsideCircle();
		
		if (this.isPressed || distanceToCenter > (this.cr + 25)) {
			this.x = (Math.cos(this.theta*2) * distanceToCenter) + this.circle.cp[0];
			this.y = (Math.sin(this.theta*2) * distanceToCenter) + this.circle.cp[1];
			this.theta += frameCount % 2 == 0 ? 0 : .01;
		}

                else if (distanceToCenter > this.circle.radius) {
                        // we'll use the tangent plane intersection as the origin, simplifies dot product significantly
                        // since the radius line's x coord is 0. Also, we'll always use a magnitude of 1 for the same line leaving us with . . . 
                        const v = this.velocity;
                        const cc = this.circle.cp; // circle center
                        const cp = [this.x + v[0], this.y + v[1]]; // collision point 

                        if (distanceToCenter > (this.circle.radius + 20)){
                                this.x = cc[0];
                                this.y = cc[1];
                        }
                        
                        // Subtract the collision point from all other vector points to normalize to 0,0
                        const ncp = [0, 0];
                        const nr = [Number( (cp[0] - (cp[0] * 2) ).toFixed(5)), Number( (cp[1] - (cp[1] * 2) ).toFixed(5))] // move normal to 0,0 projection
                        const nx = Number( (this.x - cp[0]).toFixed(5));
                        const ny = Number( (this.y - cp[1]).toFixed(5));
                        const h = Number( (Math.sqrt(nx**2 + ny**2)).toFixed(5));

                        // Get dot product
                        const dotProd = Number( ((nx * nr[0]) + (ny * nr[1]) ).toFixed(5) );  // x1*x2 + y1*y2
                        
                        // Divide by magnitude for cosine
                        const vmag = Number( (Math.sqrt((nx**2) + (ny**2))).toFixed(5) );
                        const nmag = Number( (Math.sqrt((nr[0]**2) + (nr[1]**2))).toFixed(5) );
                        const mags = Number( (vmag * nmag).toFixed(5) );
                        const cosine = Number( (dotProd / mags).toFixed(5) );

                        // Get theta from cosine
                        const theta = Number( (Math.acos(cosine) * 180 / Math.PI).toFixed(5) );

                        // console.log(`dotProd = ${dotProd} . . . ${typeof dotProd}`)
                        // console.log(`dotx: nx(${nx}) * nr[0](${nr[0]}) = ${nx * nr[0]}`);
                        // console.log(`doty: ny(${ny}) * nr[1](${nr[1]}) = ${ny * nr[1]}`);
                        // console.log(`mags: ${mags}`);
                        // console.log(`radius: ${this.circle.radius}`);
                        // normal x == this.x + adjacent
                        const normalX = Number( (nx + (Math.cos(90 - theta) * h)).toFixed(5) );
                        const normalY = Number( (ny + (Math.sin(90 - theta) * h)).toFixed(5) );

                        const xDiff = Number( (nx - normalX).toFixed(5) );
                        const yDiff = Number( (ny - normalY).toFixed(5) );

                        const newX = Number( (nx - (xDiff * 2)).toFixed(5) );
                        const newY = Number( (ny - (yDiff * 2)).toFixed(5) );

                        // Normalize velocity to a max of 1 on an axis per frame
                        const largest = Number( (Math.max(newX, newY)).toFixed(5) );
                        let vx = Number( (newX / h).toFixed(5) );
                        let vy = Number( (newY / h).toFixed(5) );

                        // console.log(`cosine: ${cosine}\ntheta: ${theta}\ncurrent nx,ny: ${nx}, ${ny}\ncp: ${JSON.stringify(ncp)},\nnormal xy: ${normalX}, ${normalY}\nnew xy: ${newX}, ${newY}\nnr: ${nr[0]}, ${nr[1]}\noldSlope: ${this.velocity[0]}, ${this.velocity[1]}\nnewSlope: ${vx}, ${vy}`);

                        this.velocity = [vx, vy];
                        // console.log(`dotProd = Vy(${this.velocity[1]}) * radius(${this.circle.radius})`);
                        this.x += this.velocity[0];
                        this.y += this.velocity[1];                        
                } else {
                        this.x += this.velocity[0];
                        this.y += this.velocity[1];
                }


                this.context.beginPath()
                this.context.arc(this.x, this.y, this.radius, 0, (2 * Math.PI), false)
                this.context.strokeStyle = this.strokeStyle;
                this.context.fillStyle = this.color
                this.context.lineWidth = 2
                this.context.fill()
                this.context.stroke()

        }

        isOutsideCircle() {
                const xDelta = Math.abs(this.circle.cp[0] - (this.x + this.velocity[0]));
                // console.log(`this.x = ${this.x} . . . this.circle.cp[0] = ${this.circle.cp[0]}`)
                const yDelta = Math.abs(this.circle.cp[1] - (this.y + this.velocity[1]));
                // console.log(`this.y = ${this.y} . . . this.circle.cp[1] = ${this.circle.cp[1]}`)
                const distanceToCenter = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2));
                // console.log(`xDelta: ${xDelta} . . . yDelta: ${yDelta} . . . dttc: ${distanceToCenter} . . . radius: ${this.circle.radius}`);
                return distanceToCenter;
        }
}


export default Bubble
