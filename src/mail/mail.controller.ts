import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SendMailDto } from './dto/send-email.dto';
import { MessageDto } from './dto/message.dto';

@Controller('email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async send(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() sendMailDto: SendMailDto,
  ): Promise<MessageDto> {
    return await this.mailService.sendClientEmail(files, sendMailDto);
  }
}
