import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiService } from "./api/api.service";
import { HttpService } from "@nestjs/axios";
import * as fs from "fs";
import { FileService } from "./file/file.service";

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  const app = await NestFactory.createApplicationContext(AppModule);
  // application logic...

  const authCode = readAuthCode();
  const httpService: HttpService = new HttpService()
  const apiService: ApiService = new ApiService(httpService);
  const fileService: FileService = new FileService();
  apiService.authCode = 'Basic ' + authCode;

  apiService.getTeams(5).subscribe(teams => {
    console.log('teams.length: ', teams.length);
    fileService.saveTeamsToFile('', 'teams.json', teams);
  });

  // apiService.getNumberOfPagesForTeams().subscribe(res => {
  //   console.log('------- result: ', res);
  // }, err => {
  //   console.error('---------- error: ', err);
  // })

  await app.close();

}
bootstrap();

function readAuthCode(): string {
  let authCode = fs.readFileSync('./authCode.txt', 'utf-8');
  const match = /\r|\n/.exec(authCode);
  if (match) {
    authCode = authCode.replace('\n', '');
    authCode = authCode.replace('\r', '');
  }
  return authCode;
}
