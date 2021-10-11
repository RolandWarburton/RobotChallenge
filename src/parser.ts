import readline from "readline";
import { isCardinalType } from "./interface/cardinal.type.js";
import events from "events";
import Robot from "./robot.js";
import Table from "./table.js";

class Parser {
	public table: Table;
	eventEmitter = new events.EventEmitter();
	private rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false,
	});

	constructor(table: Table) {
		this.table = table;

		this.eventEmitter.on("ROBOT", (robotIndex) => {
			// little debug print
			// console.log(`Current number of robots is ${this.table.robots.length}`);

			// get the index of the new selected robot
			const newRobotIndex = parseInt(robotIndex.split(" ")[1]);

			// check its in bounds
			if (newRobotIndex > this.table.robots.length) return;

			const newActiveRobot = table.robots[newRobotIndex];

			// set the new active robot
			const activeRobot = table.setActiveRobot(newActiveRobot);

			// unsubscribe all previous robots
			for (const robot of table.robots) {
				robot.unbindParserEmitter();
			}

			// subscribe to the new robot
			activeRobot.bindParserEmitter();

			// debug alert for the new active robot index
			// console.log(`Active robot is now ${robotIndex}`);
		});

		this.eventEmitter.on("PLACE", (line) => {
			// console.log(`Current number of robots is ${table.robots.length}`);

			// expected: [ "PLACE", "1,2,NORTH" ]
			const args = line.split(" ");
			if (args.length !== 2) return;

			// expected: [ "1", "2", "NORTH" ]
			const pos = args[1].split(",");
			if (pos.length !== 3) return;

			// get x and y
			const x = parseInt(pos[0]);
			const y = parseInt(pos[1]);

			// get rotation and check it is valid
			const rotate = pos[2];
			if (!isCardinalType(rotate)) return;

			// console.log(`> Placing robot at ${x}, ${y}, facing ${rotate}`);

			// unsubscribe all previous robots
			for (const robot of table.robots) {
				robot.unbindParserEmitter();
			}

			// create a new robot
			const robot = new Robot(x, y, this.table, rotate);
			table.addRobot(robot);

			// bind the robot to the parser
			table.setActiveRobot(robot);

			// activate the robot
			table.activeRobot.bindParserEmitter();
		});

		// ================================================
		// Bind the parsed actions to the current robots actions
		//
		// I chose to use emitters on the robots as well in case we want to bind multiple robots and
		// control them all at the same time!

		// bind the LEFT action to the active robots LEFT action
		this.eventEmitter.on("LEFT", () => {
			// console.log(`emit LEFT to active robot ${table.robots.indexOf(table.activeRobot)}`);
			if (table.activeRobot) table.activeRobot.emitter.emit("LEFT");
		});

		// bind the RIGHT action to the active robots RIGHT action
		this.eventEmitter.on("RIGHT", () => {
			// console.log(`emit RIGHT to active robot ${table.robots.indexOf(table.activeRobot)}`);
			if (table.activeRobot) table.activeRobot.emitter.emit("RIGHT");
		});

		// bind the MOVE action to the active robots MOVE action
		this.eventEmitter.on("MOVE", () => {
			// console.log(`emit MOVE to active robot ${table.robots.indexOf(table.activeRobot)}`);
			if (table.activeRobot) table.activeRobot.emitter.emit("MOVE");
		});

		// bind the REPORT action to the active robots REPORT action
		this.eventEmitter.on("REPORT", () => {
			// console.log(`emit REPORT to active robot ${table.robots.indexOf(table.activeRobot)}`);
			if (table.activeRobot) table.activeRobot.emitter.emit("REPORT");
		});
	}

	private _getCommandType(line: string): string {
		const args = line.split(" ");
		const cmd = args[0];
		let cmdType: string;
		switch (cmd) {
			case "PLACE":
				cmdType = "PLACE";
				break;
			case "MOVE":
				cmdType = "MOVE";
				break;
			case "LEFT":
				cmdType = "LEFT";
				break;
			case "RIGHT":
				cmdType = "RIGHT";
				break;
			case "REPORT":
				cmdType = "REPORT";
				break;
			case "ROBOT":
				cmdType = "ROBOT";
				break;
			default:
				cmdType = "UNKNOWN";
				break;
		}
		return cmdType;
	}

	private _parse(line: string): void {
		const cmdType = this._getCommandType(line);

		if (cmdType === "UNKNOWN") {
			console.log("Unknown command :)");
			return;
		} else {
			// console.log(`emitting ${cmdType}`);
			this.eventEmitter.emit(cmdType, line);
		}
	}

	listen() {
		this.rl.on("line", (line) => this._parse(line));
	}

	detach() {
		this.rl.close();
	}
}

export default Parser;
