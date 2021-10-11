import { cardinal } from "./interface/cardinal.type.js";
import events from "events";
class Robot {
    constructor(x, y, table, rotate) {
        this.x = x;
        this.y = y;
        this.angle = rotate;
        this.table = table;
        this.emitter = new events.EventEmitter();
    }
    bindParserEmitter() {
        this.emitter.on("MOVE", () => {
            this.move();
        });
        this.emitter.on("LEFT", () => {
            this.rotate("LEFT");
        });
        this.emitter.on("RIGHT", () => {
            this.rotate("RIGHT");
        });
        this.emitter.on("REPORT", () => {
            this.report();
        });
    }
    unbindParserEmitter() {
        this.emitter.removeAllListeners();
    }
    move() {
        function inBounds(x, y, table) {
            return x >= 0 && x <= table.width && y >= 0 && y <= table.height;
        }
        switch (this.angle) {
            case "NORTH":
                if (inBounds(this.x, this.y + 1, this.table)) {
                    this.y++;
                }
                break;
            case "EAST":
                if (inBounds(this.x + 1, this.y, this.table)) {
                    this.x++;
                }
                break;
            case "SOUTH":
                if (inBounds(this.x, this.y - 1, this.table)) {
                    this.y--;
                }
                break;
            case "WEST":
                if (inBounds(this.x - 1, this.y, this.table)) {
                    this.x--;
                }
                break;
        }
    }
    rotate(_rotate) {
        // get the max cardinal value (will always be 3, or the cardinal.length - 1)
        const max = 3;
        // get the current cardinal value index
        const currentAngleIndex = cardinal.findIndex((value) => value === this.angle);
        // if going left subtract, and right add
        let index = _rotate === "LEFT" ? currentAngleIndex - 1 : currentAngleIndex + 1;
        // if we are at the end of the array, we need to go back to the beginning
        if (index > max) {
            index = 0;
        }
        // if we are at the beginning of the array, we need to go to the end
        if (index < 0) {
            index = max;
        }
        // set the new angle
        this.angle = cardinal[index];
    }
    report() {
        console.log(`${this.x} ${this.y} ${this.angle}`);
    }
}
export default Robot;
