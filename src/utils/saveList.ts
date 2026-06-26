import { writeFileSync } from "fs";
import type { TodoItem } from "../types/TodoItem";

export function saveList(filePath: string, list: TodoItem[]): void {
  try {
    writeFileSync(filePath, JSON.stringify(list, null, "\t") + "\n", {
      encoding: "utf8",
      flag: "w",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`ERROR: could not write to ${filePath}. Message: ${message}`);
    process.exit(5);
  }
}
