import MutationStrategy from "../MutationStrategy";

class BufferMutator {
  private strategy: MutationStrategy;

  constructor(strategy: MutationStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: MutationStrategy): void {
    this.strategy = strategy;
  }

  mutate(buf: Buffer): Buffer {
    return this.strategy.apply(buf);
  }
}

export default BufferMutator;