import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';


@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ConfigModule,CloudinaryService,CloudinaryModule],
})
export class FilesModule {}
