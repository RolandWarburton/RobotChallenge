import { Cardinal, cardinal } from "./interface/cardinal.type.js";
import Table from "./table";
import events from "events";

class Robot {
	public x: number;
	public y: number;
	public angle: Cardinal;
	public table: Table;
	public emitter: events.EventEmitter;

	constructor(x: number, y: number, table: Table, rotate: Cardinal) {
		this.x = x;
		this.y = y;
		this.angle = rotate;
		this.table = table;
		this.emitter = new events.EventEmitter();
	}

	public bindParserEmitter() {
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

	public unbindParserEmitter() {
		this.emitter.removeAllListeners();
	}

	private move() {
		function inBounds(x: number, y: number, table: Table) {
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

	private rotate(_rotate: string) {
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

	private report() {
		console.log(`${this.x} ${this.y} ${this.angle}`);
	}
}

export default Robot;
