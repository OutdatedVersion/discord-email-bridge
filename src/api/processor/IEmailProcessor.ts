import { IParsedEmailMessage } from './IParsedEmailMessage';

export interface IEmailProcessor<T> {
  process(data: T): Promise<IParsedEmailMessage>;
}
