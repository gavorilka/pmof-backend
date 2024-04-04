import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from './dto/send-email.dto';
import * as process from "process";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTextEmail(
    to: string,
    subject: string,
    text: string,
    replyTo?: string,
    attachments?: any[],
    bcc?: string[] | string,
    from?: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
      replyTo,
      attachments,
      bcc,
      from,
    });
  }
  async sendClientEmail(
    files: Express.Multer.File[],
    sendMailDto: SendMailDto,
  ) {
    const attachments = files.map((file) => {
      return {
        filename: Buffer.from(file.originalname, 'latin1').toString('utf8'),
        content: file.buffer,
      };
    });
    try {
      const text =
        '\r\n' +
        sendMailDto.message +
        '\r\n' +
        '\r\n---------------------------------------------' +
        '\r\nКонтакты из формы:' +
        '\r\n \t Имя: ' +
        sendMailDto.name +
        '\r\n \t Телефон: ' +
        sendMailDto.phone +
        '\r\n \t E-mail: ' +
        sendMailDto.email +
        '\r\n---------------------------------------------';

      await this.sendTextEmail(
        process.env.SM_MAIL,
        `Форма обратной связи ${process.env.SM_FROM_DOMAIN}`,
        text,
        sendMailDto.email,
        attachments,
        process.env.SM_BLIND_CARBON_COPY,
        `"Форма обратной связи ${process.env.SM_FROM_DOMAIN}" <${process.env.SM_USER}>`,
      );
      return { message: 'Письмо успешно отправлено!' };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Ошибка при отправке письма`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
