import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import nodemailerConfig from './mail/nodemailer.config';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', '..', 'public'),
      exclude: [`/${process.env.API_PREFIX || 'api'}/(.*)`],
    }),
    MailerModule.forRoot({
      transport: nodemailerConfig(),
      defaults: {
        from: `"Письмо с сайта ${process.env.SM_FROM_DOMAIN}" <${process.env.SM_USER}>`,
      },
    }),
    MailModule,
  ],
})
export class AppModule {}
