interface MutationStrategy {
  apply(res: Buffer, inputs?: Buffer[]): Buffer; // each strategy must implement this method
}

export default MutationStrategy;