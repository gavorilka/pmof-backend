import { NodeMailerInterface } from './interface/node-mailer.interface';

export default (): NodeMailerInterface => ({
  host: process.env.SM_HOST,
  port: Number(process.env.SM_PORT),
  secure: Boolean(process.env.SM_SECURE),
  auth: {
    user: process.env.SM_USER,
    pass: process.env.SM_USER_PASSWORD,
  },
});
