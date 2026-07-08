import { test } from "node:test";
import assert from "node:assert/strict";
import { extForMime, storagePathFor } from "./cloud-util.ts";

test("extForMime maps common audio MIME types", () => {
  assert.equal(extForMime("audio/webm"), "webm");
  assert.equal(extForMime("audio/webm;codecs=opus"), "webm");
  assert.equal(extForMime("audio/mp4"), "m4a");
  assert.equal(extForMime("audio/aac"), "m4a");
  assert.equal(extForMime("audio/mpeg"), "mp3");
  assert.equal(extForMime("audio/wav"), "wav");
  assert.equal(extForMime("audio/ogg"), "ogg");
});

test("extForMime falls back to m4a for unknown / empty", () => {
  assert.equal(extForMime(undefined), "m4a");
  assert.equal(extForMime(null), "m4a");
  assert.equal(extForMime(""), "m4a");
  assert.equal(extForMime("application/octet-stream"), "m4a");
});

test("storagePathFor builds <uid>/<id>.<ext>", () => {
  assert.equal(storagePathFor("uid-123", "rec-9", "webm"), "uid-123/rec-9.webm");
});
