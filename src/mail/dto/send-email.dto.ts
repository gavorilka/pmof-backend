import { FileResponse } from '../interface/file-response.interface';

export class SendMailDto {
  readonly files?: Express.Multer.File[] | FileResponse[];
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly message: string;
  readonly agreement: boolean;
}
