# Robot Challenge

Robot simulation programming task. Written in typescript.

I left comments and console.logs in the code for debugging purposes (commented out).

## Features

* Robots that can move around the map within a configurable area
* Send command to the robot/s using your keyboard
* Support for multiple robots
* Support for multiple maps of variable and unique areas
* An adaptable pub sub architecture (I decided i wanted to practice events in node so used them a lot)
* Framework to allow for instructing multiple bots to move at the same time from the one command
* Framework to allow for adding more instructions to the command parser

Supported commands:

```none
PLACE X,Y,F - Place the robot at X,Y facing F
MOVE - Move the robot one unit forward in the direction it is facing
LEFT - Turn the robot 90 degrees to the left
RIGHT - Turn the robot 90 degrees to the right
REPORT - Report the X,Y,F position of the robot
```

## Instructions to run

Download this repo.

```none
git clone git@github.com:RolandWarburton/RobotChallenge.git
cd RobotChallenge
```

Then build and run.

```none
npm run build && node dist/index.js
```

## Example Commands

Example of multiple robots.

```none
PLACE 1,2,NORTH
REPORT
1 2 NORTH
PLACE 0,0,WEST
REPORT
0 0 WEST
ROBOT 0
REPORT
1 2 NORTH
```

Example of preserved rotation when selecting different robots.

```none
❯ tsc && node dist/index.js
PLACE 1,2,NORTH
PLACE 1,2,NORTH
LEFT
REPORT
1 2 WEST
ROBOT 0
REPORT
1 2 NORTH
ROBOT 1
REPORT
1 2 WEST
```

Example of border detection.

```none
❯ tsc && node dist/index.js
PLACE 1,2,NORTH
REPORT
1 2 NORTH
MOVE
MOVE
MOVE
MOVE
MOVE
REPORT
1 5 NORTH
MOVE
REPORT
1 5 NORTH
```

Example of moving and rotating.

```none
❯ tsc && node dist/index.js
PLACE 0,0,NORTH
MOVE
REPORT
0 1 NORTH
RIGHT
MOVE
REPORT
1 1 EAST
```
