import { emitKeypressEvents } from "readline";
import { findNextUndone } from "./src/utils/findNextUndone";
import { resolve } from "path";
import { loadList } from "./src/utils/loadList";
import { saveList } from "./src/utils/saveList";

if (!process.stdin.isTTY) {
  console.error("ERROR: Can't pipe input into this program");
  process.exit(2);
}

const [, , fileParam] = process.argv;

if (!fileParam) {
  console.log('No file was provided, defaulting to "example.json"');
}

const filePath = fileParam
  ? resolve(fileParam)
  : resolve(import.meta.dir, "example.json");

console.log(`Loading "${filePath}" file...`);
const list = loadList(filePath);

console.log(
  '\nFile loaded successfully! Press "Enter" or "Space" to mark a task as completed and "Q" or "CTRL + C" to exit'
);

let itemIndex = findNextUndone(list, 0);

if (itemIndex >= list.length) {
  console.log(`\nTodo list ${filePath} is over, well done!`);
  process.exit(0);
}

const firstItem = list[itemIndex];
if (!firstItem) {
  console.error("ERROR: first item of the list is not reachable!");
  process.exit(3);
}

console.log(`\n- [ ] ${firstItem.task}`);

process.on("exit", () => {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(false);
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
emitKeypressEvents(process.stdin);

process.stdin.on("keypress", (_, key) => {
  if ((key.ctrl && key.name === "c") || key.name === "q") {
    process.exit(0);
  }

  if (["return", "enter", "space"].includes(key.name)) {
    const item = list[itemIndex];
    if (!item) return;

    item.done = true;
    item.completedAt = new Date();
    saveList(filePath, list);

    process.stdout.write("\u001b[1A\u001b[2K");
    process.stdout.write(`- [x] ${item.task}\n`);

    itemIndex = findNextUndone(list, itemIndex + 1);
    const nextItem = list[itemIndex];

    if (nextItem && itemIndex < list.length) {
      console.log(`- [ ] ${nextItem.task}`);
    } else {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdin.removeAllListeners("keypress");

      console.log(`\nTodo list ${filePath} is over, well done!`);
      process.exit(0);
    }
  }
});
