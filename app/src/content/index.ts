import { Module } from "./types";
import { mhudi } from "./mhudi";

// Registry of all literary modules. Add new pillars here as their content files land
// (ityala-lamawele, indaba, vilakazi — see specs/tasks.md).
export const modules: Module[] = [mhudi];

export const moduleById = (id: string) => modules.find((m) => m.id === id);

export * from "./types";
