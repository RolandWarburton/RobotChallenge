import Robot from "./robot";

class Table {
	public width: number;
	public height: number;
	public robots: Robot[] = [];
	public activeRobotIndex = -1;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	public setActiveRobot(robot: Robot): Robot {
		this.activeRobotIndex = this.robots.indexOf(robot);
		// console.log(`set active robot to number ${this.activeRobotIndex}`);
		return this.activeRobot;
	}

	public addRobot(robot: Robot) {
		this.robots.push(robot);
	}

	get activeRobot(): Robot {
		return this.robots[this.activeRobotIndex];
	}
}

export default Table;
