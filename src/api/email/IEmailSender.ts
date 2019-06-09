export interface IEmailSender {
  send(htmlContent: string): Promise<void>;
}
