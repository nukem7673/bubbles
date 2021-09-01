// Particle

class Bubble {
        constructor(props) {
                // ID
                this.key = props.key;

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
                this.z = props.z;
                this.velocity = props.velocity;
                this.mag = this.magnitude(this.x, this.y);
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
                this.loco = false;
                this.shouldSpiralIn = false;

                // Styling
                this.color = props.color;
                this.radius = props.radius;
                this.strokeStyle = props.strokeStyle;
                this.colorOne = this.key == "center" ? "#55cc00" : "#ff00e177";
                this.colorTwo = this.key == "center" ? "#00ffffcc" : "#00ffff";

                // Tail
                this.tailLength = props.tailLength;
                this.tailPoints = [];

                // Binds
                this.drawBubble = this.drawBubble.bind(this);
                this.drawTail = this.drawTail.bind(this);
                this.update = this.update.bind(this);
                this.onClick = this.onClick.bind(this);
                this.onRelease = this.onRelease.bind(this);
                this.getDtc = this.getDtc.bind(this);
                this.spiralIn = this.spiralIn.bind(this);
                this.spiralOut = this.spiralOut.bind(this);
                this.updateTail = this.updateTail.bind(this);
                this.handleSlider = this.handleSlider.bind(this);
                this.handleLocoBtn = this.handleLocoBtn.bind(this);
                this.handleTailSlider = this.handleTailSlider.bind(this);
                this.handleSizeSlider = this.handleSizeSlider.bind(this);

                // Controls
                this.shapeSidesInput = document.getElementById("customRange");
                this.sizeSlider = document.getElementById("sizeRange");
                this.tailSlider = document.getElementById("tailRange");
                this.locoBtn = document.getElementById("spiralBtn");

                // Shape Parameters
                this.sides = this.shapeSidesInput.value;
                this.spiralOut = this.locoBtn.classList[1] == "btn-outline-success";

                // Listeners
                if (props.key != "center") {
                        this.context.canvas.addEventListener("touchstart", this.onClick);
                        this.context.canvas.addEventListener("mousedown", this.onClick);

                        this.context.canvas.addEventListener("mouseup", this.onRelease);
                        this.context.canvas.addEventListener("touchend", this.onRelease)

                        this.shapeSidesInput.addEventListener("input", this.handleSlider);
                        this.tailSlider.addEventListener("input", this.handleTailSlider);
                        this.sizeSlider.addEventListener("input", this.handleSizeSlider);

                        this.locoBtn.addEventListener("click", this.handleLocoBtn);
                }
        }


        update(frameCount) {
                // DTC (distance to center) is used in many functions. Always update
                this.dtc = this.getDtc();
                // DTC if velocity is added
                const nextDTC = this.magnitude(this.x + this.velocity[0] - this.cp[0], this.y + this.velocity[1] - this.cp[1]);

                // If user is holding input
                if (this.isPressed) {
                        // this.spiralOut(frameCount);
                        // this.expandOut();
                        this.spiralOutShape(frameCount);
                }

                // If bubble is stuck and moving out
                else if (!this.isPressed && this.dtc > (this.cr + 25)) {
                        this.spiralIn(frameCount);
                }

                // If Loco mode is active, user has released input, and bubble has not made it back to center of circle
                else if (!this.isPressed && this.shouldSpiralIn) {
                        this.spiralIn();
                }

                else if (nextDTC > this.c.radius) {
                        // Define a bounce (reflection) off the inner curved surface of the circle

                        // Collision point (if logic passes this far) is the next point
                        const collisionPoint = [this.x + this.velocity[0], this.y + this.velocity[1]];

                        // NORMALIZE - Subtract center point of circle from each point to get a "0" origin
                        const vOne = [this.x - this.cp[0], this.y - this.cp[1]];
                        const vTwo = [collisionPoint[0] - this.cp[0], collisionPoint[1] - this.cp[1]];

                        // Current theta - (x,y)
                        const ct = Math.atan2(vOne[1], vOne[0]);
                        // Reflection theta - (collision point's x,y)
                        const rt = Math.atan2(vTwo[1], vTwo[0]);
                        // New theta - (double the difference between ct and rt)
                        const nt = ct - ((ct - rt) * 2);

                        // New Point - Apply theta with curent magnitude - aka this.dtc (distance to center)
                        const np = [(Math.cos(nt) * this.dtc), (Math.sin(nt) * this.dtc)];

                        // Get velocity by finding the difference of collision point and new point
                        const xd = np[0] - vTwo[0];
                        const yd = np[1] - vTwo[1];

                        // Change velocity to new values
                        this.velocity = [xd, yd];

                        // Apply velocity before new draw
                        this.x += this.velocity[0];
                        this.y += this.velocity[1];

                        // To simulate 3d effects, toggle visibility on every collision (as if it were behind the circle)
                        this.z *= -1;

                        // Empty tail to avoid spikey graphics
                        this.tailPoints = [];
                } else {
                        this.x += this.velocity[0];
                        this.y += this.velocity[1];
                }
                //     0.3824048086
                //     0.3814533465

                // Draw tail first for layering
                this.updateTail([this.x, this.y]);
                this.drawTail();


                // Then draw circle for greater z-index
                this.drawBubble();
        }

        magnitude(x, y) {
                let sqrt = Math.sqrt(x ** 2 + y ** 2);
                // if (x < 0)
                //         sqrt *= -1;
                // if (y < 0)
                //         sqrt *= -1;
                return sqrt;
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

                this.tailPoints = [];
                // console.log(`a: ${this.x - this.cp[0]}, c: ${this.cosine}, h: ${this.dtc}, theta: ${this.theta}, deg: ${this.degrees}, acos: ${Math.acos(this.cosine)}`)
        };

        onRelease() {
                this.isPressed = false;
                this.dtc = this.getDtc();

                // If loco mode is active, bubbles should spiral inwards
                if (this.loco) {
                        this.shouldSpiralIn = true;
                        this.tailPoints = [];
                }
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
                this.x = Math.sin(this.theta) * this.dtc * .98 + this.cp[0];
                this.y = Math.cos(this.theta) * this.dtc * .98 + this.cp[1];
                this.theta -= frameCount % 2 == 0 ? 0 : .1;

                // Once the bubble makes it back to center of circle, resume normal velocity
                if (this.dtc < 50) {
                        this.shouldSpiralIn = false;
                }
        }

        spiralOut(frameCount) {
                this.x = (Math.cos(this.theta) * this.dtc * 1.01) + this.cp[0];
                this.y = (Math.sin(this.theta) * this.dtc * 1.01) + this.cp[1];


                this.theta += frameCount % 2 == 0 ? 0 : .1;
        }

        spiralOutShape(frameCount) {
                let mag = this.r * Math.cos(this.theta * this.sides);

                if (this.loco) {
                        mag = this.theta * Math.cos(this.theta * this.sides) + this.r;
                        this.theta += .1;
                }
                // if (this.color == "#00ffff") { console.log(`cos(theta) = ${Math.cos(this.theta)}`); }

                if ( (Math.cos(this.theta) < 0 && this.z > 0 ) || (Math.cos(this.theta) > 0 && this.z < 0) )
                        this.z *= -1;

                this.x = Math.cos(this.theta) * (mag) + this.cp[0];
                this.y = Math.sin(this.theta) * (mag) + this.cp[1];
                // this.z *= Math.cos(this.dtc / 100);

                // Special case for NON-loco-mode when sides are '1' 
                if (this.sides == 1 && !this.loco) {
                        // shift back to left
                        this.x -= (this.cp[0] / 2.9);
                        this.theta += .005;
                }
                this.theta += .01;


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
                }
                if (this.tailPoints.length > this.tailLength) {
                        this.tailPoints.pop();
                }
                this.tailPoints.unshift(newPoints);
        }

        drawBubble() {
                // Then draw circle for greater z-index
                this.context.beginPath()
                this.context.arc(this.x, this.y, this.radius - (this.radius / 4), 0, (2 * Math.PI), false)

                this.bubbleColor = this.context.createRadialGradient(this.x, this.y, this.radius / 40, this.x, this.y, this.radius / 1.1);
                
                if (this.key == "center") {
                        this.bubbleColor.addColorStop(0, "#220077fe")

                        // this.bubbleColor.addColorStop(.13, "#00ffff")
                        // this.bubbleColor.addColorStop(.45, "#e3fff0")
                        // this.bubbleColor.addColorStop(.55, "#00fff0")
                        this.bubbleColor.addColorStop(1, "#ccffffdd")

                        const outlineGradient = this.context.createLinearGradient(0, 0, this.context.canvas.width, this.context.canvas.height);
                        outlineGradient.addColorStop(0, "#00ffff");
                        outlineGradient.addColorStop(1, "#ff00ff");

                        this.context.strokeStyle = outlineGradient;
                        this.context.lineWidth = 5
                        this.context.stroke()
                } else {
                        this.bubbleColor.addColorStop(0, this.colorOne)
                        this.bubbleColor.addColorStop(1, this.colorTwo)
                }


                this.context.fillStyle = this.bubbleColor
                this.context.fill()
        }

        drawTail() {
                // Skip if no points exist
                if (this.tailPoints.length < 1) {
                        return;
                }
                // Shorthand
                const ctx = this.context;

                // Create gradient based on point locations
                this.tailColor = ctx.createLinearGradient(this.tailPoints[0][0], this.tailPoints[0][1], this.tailPoints[this.tailPoints.length - 1][0], this.tailPoints[this.tailPoints.length - 1][1]);
                this.tailColor.addColorStop(0, "#ff00e1");
                this.tailColor.addColorStop(1, "#00ffff00");

                ctx.beginPath();
                ctx.moveTo(this.tailPoints[0][0], this.tailPoints[0][1]);

                this.tailPoints.map(point => {
                        ctx.lineTo(point[0], point[1]);
                })

                ctx.strokeStyle = this.tailColor;

                ctx.lineWidth = this.radius == 4 ? 1 : this.radius;
                ctx.stroke();
        }

        handleSlider(e) {
                e.preventDefault();
                this.sides = this.shapeSidesInput.value;
        }

        handleLocoBtn() {
                this.loco = !this.loco;
        }

        handleTailSlider(e) {
                e.preventDefault();
                this.tailLength = this.tailSlider.value;
                this.tailPoints = this.tailPoints.slice(0, this.tailLength - 1);
        }

        handleSizeSlider(e) {
                e.preventDefault();
                this.radius = this.sizeSlider.value;
        }
}


export default Bubble

