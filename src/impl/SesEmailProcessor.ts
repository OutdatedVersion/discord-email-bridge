import { simpleParser as mailParser } from 'mailparser';
import { IEmailProcessor, IParsedEmailMessage } from '../api/processor';

interface IAmazonNotifcation {
  Type: 'Notifcation';
  // UUID
  MessageId: string;
  TopicArn: string;
  Subject: string;
  Message: any;
  // ISO-8601
  Timestamp: string;
  SignatureVersion: string;
  Signature: string;
  SigningCertURL: string;
  UnsubscribeURL: string;
}

export class SesEmailProcessor implements IEmailProcessor<IAmazonNotifcation> {
  public async process(
    rawData: IAmazonNotifcation
  ): Promise<IParsedEmailMessage> {
    // TODO: verify event signature
    // TODO: verify that the email is from the list of configured emails

    // SES parses a few common things, but not the body
    // Message.content holds the raw SMTP data
    const data = JSON.parse(rawData.Message);

    const email = await mailParser(data.content);

    return {
      content: email.text,
      timestamp: email.date ? email.date.getTime() : new Date().getTime()
    };
  }
}
