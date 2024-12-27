import { assertEquals, assertExists, assertInstanceOf } from "jsr:@std/assert";
import { range, repeatChar } from "$cli";
import { sample } from "jsr:@std/collections";

Deno.test("function range creates an array of length n", function () {
  const float = Math.random() * 100;
  const end = Math.floor(float);
  const start = Math.floor(Math.random() * (end - 1));

  const r = range(start, end);

  assertInstanceOf(r, Array);
  assertEquals(r.length, end - start);
});

Deno.test("function repeatChar repeats a character/atom n times", function () {
  const n = Math.ceil(Math.random() * 10);
  const char = sample(["A", "B", "C"]);

  assertExists(char);

  let want = "";

  for (let i = 0; i < n; i++) {
    want += char;
  }

  const got = repeatChar(char, n);

  assertEquals(got, want);
});
