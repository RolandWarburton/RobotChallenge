import Parser from "./parser.js";
import Table from "./table.js";

const table = new Table(5, 5);
const parser = new Parser(table);
parser.listen();
