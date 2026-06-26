import type { TodoItem } from "../types/TodoItem";
import { readFileSync } from "fs";

export function loadList(filePath: string): TodoItem[] {
  try {
    const file = readFileSync(filePath, { encoding: "utf8" });
    const list = JSON.parse(file) as TodoItem[];

    if (!Array.isArray(list)) {
      console.error(
        `ERROR: ${filePath} does not contain an array! Check example.json for the expected file format!`
      );

      process.exit(1);
    }

    return list;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(
      `ERROR: could not read or parse the contents of ${filePath}. Message: ${message}`
    );
    process.exit(4);
  }
}
