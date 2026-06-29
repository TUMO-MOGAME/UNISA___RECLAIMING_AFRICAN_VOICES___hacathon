import { Module } from "./types";
import { mhudi } from "./mhudi";
import { ityalaLamawele } from "./ityala-lamawele";
import { indaba } from "./indaba";
import { vilakazi } from "./vilakazi";

// Registry of all literary modules — the four pillars.
export const modules: Module[] = [mhudi, ityalaLamawele, indaba, vilakazi];

export const moduleById = (id: string) => modules.find((m) => m.id === id);

export * from "./types";
