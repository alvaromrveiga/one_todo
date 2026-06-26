import type { TodoItem } from "../types/TodoItem";

export function findNextUndone(list: TodoItem[], currentIndex: number): number {
  for (let i = currentIndex; i < list.length; i++) {
    const item = list[i];
    if (!item) return list.length;

    if (item.done === false) {
      return i;
    }
  }

  return list.length;
}
