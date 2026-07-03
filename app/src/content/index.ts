import { Module } from "./types";
import { mhudi } from "./mhudi";
import { ityalaLamawele } from "./ityala-lamawele";
import { indaba } from "./indaba";
import { vilakazi } from "./vilakazi";
import { unsungHeroes } from "./unsung-heroes";
import { marriageRites } from "./marriage-rites";
import { peoplingOfSa } from "./peopling-of-sa";

// The four literary pillars.
export const modules: Module[] = [mhudi, ityalaLamawele, indaba, vilakazi];

// The Cultural Atlas — grounded, cited heritage entries (history, customs, heroes).
export const atlasModules: Module[] = [unsungHeroes, marriageRites, peoplingOfSa];

// Everything — for reader lookup and source crediting on the About screen.
export const allModules: Module[] = [...modules, ...atlasModules];

export const moduleById = (id: string) => allModules.find((m) => m.id === id);

export * from "./types";
