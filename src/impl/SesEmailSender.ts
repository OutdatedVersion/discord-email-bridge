import { SES } from 'aws-sdk';
import { IEmailSender } from '../api/email/IEmailSender';

export class SesEmailSender implements IEmailSender {
  private sesClient: SES;

  constructor(sesClient?: SES) {
    this.sesClient =
      sesClient ||
      new SES({
        apiVersion: '2010-12-01'
      });
  }

  public async send(htmlContent: string): Promise<void> {
    const request = {
      Destination: {
        ToAddresses: ['ben@outdatedversion.com']
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlContent
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'I want to send you HTML content, not plain text ):'
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Message digest'
        }
      },
      Source: 'out@test-chamber.outdatedversion.com'
    };

    await this.sesClient.sendEmail(request).promise();
  }
}
