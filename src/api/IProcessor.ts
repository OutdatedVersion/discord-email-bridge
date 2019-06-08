export interface IProcessor<T> {
  process(data: T): Promise<void>;
}
