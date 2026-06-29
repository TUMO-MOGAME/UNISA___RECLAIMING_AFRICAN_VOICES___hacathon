import { Module } from "./types";
import { mhudi } from "./mhudi";
import { ityalaLamawele } from "./ityala-lamawele";
import { indaba } from "./indaba";

// Registry of all literary modules. Add new pillars here as their content files land
// (vilakazi next — see specs/tasks.md).
export const modules: Module[] = [mhudi, ityalaLamawele, indaba];

export const moduleById = (id: string) => modules.find((m) => m.id === id);

export * from "./types";
