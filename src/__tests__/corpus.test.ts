// case 1: test create a corpus
// case 2: test getLength function, it should return the number of files in the corpus
// case 3: test generateInput function, the function will generate random input for fuzzing, it should return a buffer
// case 4: test putBuffer function, it should add the buffer to the corpus

import * as fs from "fs";
import { Corpus } from "../corpus";

let corpus: Corpus;
beforeAll(() => {
  corpus = new Corpus(["./src/__tests__/testData"], false);
});

describe("Corpus", () => {
  it("creates a corpus", () => {
    expect(corpus).toBeDefined();
  });

  it("test getLength", () => {
    expect(corpus.getLength()).toBe(2);
  });

  it("test generateInput", () => {
    const input = corpus.generateInput();
    expect(input).toBeInstanceOf(Buffer);
  });

  it("test generateInput with mutation", () => {
    // the mutation will be triggered when the seed are all used
    for (let i = 0; i < corpus.getLength(); i++) corpus.generateInput();
    const input = corpus.generateInput();
    expect(input).toBeInstanceOf(Buffer);
  });

  it("test putBuffer", () => {
    const input = corpus.generateInput();
    corpus.putBuffer(input);
    expect(corpus.getLength()).toBe(3);
  });
});

afterAll(() => {
  const dir = fs.readdirSync("./src/__tests__/testData");
  dir.forEach((file) => { // remove all files created by the test
    if (!file.endsWith(".jpg")) fs.unlinkSync(`./src/__tests__/testData/${file}`);
  });
});