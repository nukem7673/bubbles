// Particle

class Bubble {
        constructor(props) {
                // Context and canvas props
                this.context = props.context;
                this.ch = this.context.canvas.height;
                this.cw = this.context.canvas.width;
                this.c = props.circle;
                this.cp = this.c.cp;
                this.cr = props.circle.radius;

                // Bubble Positioning
                this.x = props.x;
                this.y = props.y;
                this.velocity = props.velocity;
                this.theta = null;

                // Relative Positioning to Circle's Center
                this.rx = this.x - this.cp[0];
                this.ry = this.y - this.cp[1];

                // Next Position - If velocity applied
                this.nx = this.rx + this.velocity[0];
                this.ny = this.ry + this.velocity[1];
                this.dtc = Math.sqrt(this.rx ** 2 + this.ry ** 2);

                // State
                this.isPressed = false;
                this.isOutside = false;

                // Styling
                this.color = props.color;
                this.radius = props.radius;
                this.strokeStyle = props.strokeStyle;

                // Tail
                this.tailLength = props.tailLength;
                this.tailPoints = [];

                // Binds
                this.update = this.update.bind(this);
                this.onClick = this.onClick.bind(this);
                this.onRelease = this.onRelease.bind(this);
                this.getDtc = this.getDtc.bind(this);
                this.spiralIn = this.spiralIn.bind(this);
                this.spiralOut = this.spiralOut.bind(this);
                this.updateTail = this.updateTail.bind(this);
                this.drawTail = this.drawTail.bind(this);

                // Listeners
                this.context.canvas.addEventListener("touchstart", this.onClick);
                this.context.canvas.addEventListener("mousedown", this.onClick);

                this.context.canvas.addEventListener("mouseup", this.onRelease);
                this.context.canvas.addEventListener("touchend", this.onRelease)
        }


        update(frameCount) {
                this.dtc = this.getDtc();

                if (this.isPressed) {
                        // this.spiralOut(frameCount);
                        // this.expandOut();
                        this.spiralOutShape(frameCount);
                }
                else if (!this.isPressed && this.dtc > (this.cr + 25)) {
                        this.spiralIn(frameCount);
                }

                else if (this.dtc > this.c.radius) {
                        // we'll use the tangent plane intersection as the origin, simplifies dot product significantly
                        // since the radius line's x coord is 0. Also, we'll always use a magnitude of 1 for the same line leaving us with . . . 
                        const v = this.velocity;
                        const cc = this.c.cp; // circle center
                        const cp = [this.x + v[0], this.y + v[1]]; // collision point 

                        // Sometimes we can get stuck at the edge of the circle, so pop it back in the center
                        if (this.dtc > (this.c.radius + 20)) {
                                this.x = cc[0];
                                this.y = cc[1];
                                // Also empty out the tail points to start over
                                this.tailPoints = [];
                        }

                        // Subtract the collision point from all other vector points to normalize to 0,0
                        const ncp = [0, 0];
                        const nr = [Number((cp[0] - (cp[0] * 2)).toFixed(5)), Number((cp[1] - (cp[1] * 2)).toFixed(5))] // move normal to 0,0 projection
                        const nx = Number((this.x - cp[0]).toFixed(5));
                        const ny = Number((this.y - cp[1]).toFixed(5));
                        const h = Number((Math.sqrt(nx ** 2 + ny ** 2)).toFixed(5));

                        // Get dot product
                        const dotProd = Number(((nx * nr[0]) + (ny * nr[1])).toFixed(5));  // x1*x2 + y1*y2

                        // Divide by magnitude for cosine
                        const vmag = Number((Math.sqrt((nx ** 2) + (ny ** 2))).toFixed(5));
                        const nmag = Number((Math.sqrt((nr[0] ** 2) + (nr[1] ** 2))).toFixed(5));
                        const mags = Number((vmag * nmag).toFixed(5));
                        const cosine = Number((dotProd / mags).toFixed(5));

                        // Get theta from cosine
                        const theta = Number((Math.acos(cosine) * 180 / Math.PI).toFixed(5));

                        // console.log(`dotProd = ${dotProd} . . . ${typeof dotProd}`)
                        // console.log(`dotx: nx(${nx}) * nr[0](${nr[0]}) = ${nx * nr[0]}`);
                        // console.log(`doty: ny(${ny}) * nr[1](${nr[1]}) = ${ny * nr[1]}`);
                        // console.log(`mags: ${mags}`);
                        // console.log(`radius: ${this.circle.radius}`);
                        // normal x == this.x + adjacent
                        const normalX = Number((nx + (Math.cos(90 - theta) * h)).toFixed(5));
                        const normalY = Number((ny + (Math.sin(90 - theta) * h)).toFixed(5));

                        const xDiff = Number((nx - normalX).toFixed(5));
                        const yDiff = Number((ny - normalY).toFixed(5));

                        const newX = Number((nx - (xDiff * 2)).toFixed(5));
                        const newY = Number((ny - (yDiff * 2)).toFixed(5));

                        // Normalize velocity to a max of 1 on an axis per frame
                        const largest = Number((Math.max(newX, newY)).toFixed(5));
                        let vx = Number((newX / h).toFixed(5));
                        let vy = Number((newY / h).toFixed(5));

                        // console.log(`cosine: ${cosine}\ntheta: ${theta}\ncurrent nx,ny: ${nx}, ${ny}\ncp: ${JSON.stringify(ncp)},\nnormal xy: ${normalX}, ${normalY}\nnew xy: ${newX}, ${newY}\nnr: ${nr[0]}, ${nr[1]}\noldSlope: ${this.velocity[0]}, ${this.velocity[1]}\nnewSlope: ${vx}, ${vy}`);

                        this.velocity = [vx, vy];
                        // console.log(`dotProd = Vy(${this.velocity[1]}) * radius(${this.circle.radius})`);
                        this.x += this.velocity[0];
                        this.y += this.velocity[1];

                        // Empty tail to avoid spikey graphics
                        this.tailPoints = [];
                } else {
                        this.x += this.velocity[0];
                        this.y += this.velocity[1];
                }


                // Draw tail first for layering
                this.updateTail([this.x, this.y]);
		this.drawTail();


                // Then draw circle for greater z-index
                this.context.beginPath()
                this.context.arc(this.x, this.y, this.radius, 0, (2 * Math.PI), false)
                this.context.strokeStyle = this.strokeStyle;
                this.context.fillStyle = this.color
                this.context.lineWidth = 1
                this.context.fill()
                this.context.stroke()
        }

        toRadians(degree) {
                return (Math.PI / 180) * degree;
        }

        onClick() {
                this.isPressed = true;
                this.getDtc()
                this.cosine = (this.x - this.cp[0]) / this.dtc;
                this.sine = (this.x - this.cp[1]) / this.dtc;
                this.theta = Math.atan2((this.y - this.cp[1]), (this.x - this.cp[0]));
                this.degrees = this.theta / Math.PI / 180;
		this.r = this.dtc;
                // console.log(`a: ${this.x - this.cp[0]}, c: ${this.cosine}, h: ${this.dtc}, theta: ${this.theta}, deg: ${this.degrees}, acos: ${Math.acos(this.cosine)}`)
        };

        onRelease() {
                this.isPressed = false;
                this.dtc = this.getDtc();
        }

        getDtc() {
                const xDelta = this.x - this.cp[0];
                // console.log(`this.x = ${this.x} . . . this.circle.cp[0] = ${this.circle.cp[0]}`)
                const yDelta = this.y - this.cp[1];
                // console.log(`this.y = ${this.y} . . . this.circle.cp[1] = ${this.circle.cp[1]}`)
                const dtc = Math.sqrt(xDelta ** 2 + yDelta ** 2);

                // console.log(`xDelta: ${xDelta} . . . yDelta: ${yDelta} . . . dtc: ${this.dtc} . . `);
                this.dtc = dtc;
                return dtc;
        }

        spiralIn(frameCount) {
                this.x = Math.sin(this.theta) * this.dtc * .99 + this.cp[0];
                this.y = Math.cos(this.theta) * this.dtc * .99 + this.cp[1];
                this.theta -= frameCount % 2 == 0 ? 0 : .1;
        }

        spiralOut(frameCount) {
                this.x = (Math.cos(this.theta) * this.dtc * 1.01) + this.cp[0];
                this.y = (Math.sin(this.theta) * this.dtc * 1.01) + this.cp[1];


                this.theta += frameCount % 2 == 0 ? 0 : .1;
        }

        spiralOutShape(frameCount) {
                // number of sides changes the shape of the spiral
                const input = document.getElementById("customRange");
                const spiralButton = document.getElementById("spiralBtn");

                const sides = input.value;
                const spiralOut = spiralButton.classList[1] == "btn-outline-success";

                let mag = this.r * Math.cos(this.theta * sides) * 2;

                if (spiralOut){
                        mag = this.r * Math.cos(this.r * sides) * 2;
                        console.log('true');
                }

                this.x = Math.cos(this.theta) * (mag) + this.cp[0];
                this.y = Math.sin(this.theta) * (mag) + this.cp[1];

                // Don't extend past window edges
                this.theta += .001;
                this.r += .05;
                
        }

        expandOut() {
                this.x = Math.cos(this.theta) * this.dtc * 1.01 + this.cp[0];
                this.y = Math.sin(this.theta) * this.dtc * 1.01 + this.cp[1];
        }

        updateTail(newPoints) {
                // check to make sure the next tail point isn't longer than 40% of the radius
                if (this.tailPoints.length > 0) {
                        const xd = Math.abs(newPoints[0] - this.tailPoints[0][0]);
                        const yd = Math.abs(newPoints[1] - this.tailPoints[0][1]);
                        const xyd = Math.sqrt(xd ** 2 + yd ** 2);

                        // if (xyd > (this.cr * .4)) {
                        //         this.tailPoints = [];
                        //         return;
                        // }
                }
                if (this.tailPoints.length > this.tailLength) {
                        this.tailPoints.pop();
                }
                this.tailPoints.unshift(newPoints);
        }

        drawTail() {
                // Skip if no points exist
                if (this.tailPoints.length < 1) {
                        return;
                }
                // Shorthand
                const ctx = this.context;

                // Create gradient based on point locations
                this.tailColor = ctx.createLinearGradient(this.tailPoints[0][0], this.tailPoints[0][1], this.tailPoints[this.tailPoints.length-1][0], this.tailPoints[this.tailPoints.length-1][1]);
                this.tailColor.addColorStop(0, "#00ffff");
                this.tailColor.addColorStop(1, "#ff00e1");

                ctx.beginPath();
                ctx.moveTo(this.tailPoints[0][0], this.tailPoints[0][1]);

                this.tailPoints.map(point => {
                        ctx.lineTo(point[0], point[1]);
                })
                
                ctx.strokeStyle = this.tailColor;
                
                ctx.lineWidth = 2;
                ctx.stroke();
        }
}


export default Bubble
