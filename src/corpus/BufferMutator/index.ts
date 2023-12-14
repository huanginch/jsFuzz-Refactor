import MutationStrategy from "../MutationStrategy";

class BufferMutator {
  private strategies: MutationStrategy[];

  constructor(strategy: MutationStrategy[]) {
    this.strategies = strategy;
  }

  setStrategy(strategy: MutationStrategy[]): void {
    this.strategies = strategy;
  }

  mutate(buf: Buffer, inputs?: Buffer[]): Buffer {
    const randomIndex = Math.floor(Math.random() * this.strategies.length);
    const selectedStrategy = this.strategies[randomIndex];
    return selectedStrategy.apply(buf, inputs);
  }
}

export default BufferMutator;