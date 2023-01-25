import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiService } from './api/api.service';
import { HttpModule } from "@nestjs/axios";
import { FileService } from './file/file.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ApiService, FileService],
})
export class AppModule {}
