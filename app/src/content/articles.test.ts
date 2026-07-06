import { test } from "node:test";
import assert from "node:assert/strict";
import { articles, articlesForDay, orderedTimeline, type Article } from "./articles.ts";

test("articlesForDay returns only that day's articles, oldest publication first", () => {
  const a1: Article = { id: "a", dayId: "youth-day", title: "", author: "", source: "", publishedISO: "2019-01-01", publishedLabel: "", url: "", standfirst: "", summary: "", rights: "" };
  const a2: Article = { ...a1, id: "b", publishedISO: "2015-06-01" };
  const a3: Article = { ...a1, id: "c", dayId: "freedom-day", publishedISO: "2010-01-01" };
  const got = [a1, a2, a3].filter((x) => x.dayId === "youth-day").sort((x, y) => x.publishedISO.localeCompare(y.publishedISO));
  assert.deepEqual(got.map((x) => x.id), ["b", "a"]);
  // and the real registry stays sorted + scoped
  const real = articlesForDay("youth-day");
  const isSorted = real.every((x, i) => i === 0 || real[i - 1].publishedISO <= x.publishedISO);
  assert.ok(isSorted, "articles for a day must be oldest-first");
  assert.ok(real.every((x) => x.dayId === "youth-day"));
});

test("orderedTimeline sorts a article's events chronologically", () => {
  const a: Article = {
    id: "x", title: "", author: "", source: "", publishedISO: "2020-01-01", publishedLabel: "", url: "", standfirst: "", summary: "", rights: "",
    timeline: [
      { iso: "2017-06-22", date: "later", event: "" },
      { iso: "1976-06-16", date: "first", event: "" },
      { iso: "1976-06-17", date: "middle", event: "" },
    ],
  };
  assert.deepEqual(orderedTimeline(a).map((e) => e.date), ["first", "middle", "later"]);
});

test("every article is grounded: has a source, a link, and an attribution/rights note", () => {
  for (const a of articles) {
    assert.ok(a.source.length > 0, `${a.id} needs a source`);
    assert.ok(a.url.startsWith("http"), `${a.id} needs a link to the original`);
    assert.ok(a.rights.length > 0, `${a.id} needs a rights/attribution note`);
    assert.ok(a.author.length > 0, `${a.id} needs an author`);
  }
});
