import { IsString } from 'class-validator';

export class UploadImageDto {
  @IsString()
  title: string;

  img:File
}
