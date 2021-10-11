class Table {
    constructor(width, height) {
        this.robots = [];
        this.activeRobotIndex = -1;
        this.width = width;
        this.height = height;
    }
    setActiveRobot(robot) {
        this.activeRobotIndex = this.robots.indexOf(robot);
        // console.log(`set active robot to number ${this.activeRobotIndex}`);
        return this.activeRobot;
    }
    addRobot(robot) {
        this.robots.push(robot);
    }
    get activeRobot() {
        return this.robots[this.activeRobotIndex];
    }
}
export default Table;
