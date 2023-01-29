import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiService } from "./api/api.service";
import { HttpService } from "@nestjs/axios";
import * as fs from "fs";
import { FileService } from "./file/file.service";
import { EventListingsService } from "./api/event-listings/event-listings.service";
import { DistrictListingsService } from "./api/district-listings/district-listings.service";
import { ScheduleService } from "./api/schedule/schedule.service";

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  const app = await NestFactory.createApplicationContext(AppModule);
  // application logic...

  const authCode = readAuthCode();
  const baseUrl = 'https://frc-api.firstinspires.org/v3.0';
  const httpService: HttpService = new HttpService()
  const apiService: ApiService = new ApiService(httpService);
  const fileService: FileService = new FileService();
  apiService.authCode = 'Basic ' + authCode;

 
  // GET EVENTS and save to output/events.json
  // const eventListing: EventListingsService = new EventListingsService('Basic ' + authCode, baseUrl, httpService);
  // eventListing.getEvents().subscribe(events => {
  //   console.log('----------- getEvents result: ', events);
  //   fileService.saveJSONToFile('output/', 'events.json', events);
  // })
  
  // Get the schedule for an event and save to output/events.json
  // const schedule: ScheduleService = new ScheduleService('Basic ' + authCode, baseUrl, httpService);
  // const code = 'ALHU';
  // const tournamentLevel = 'Playoff';
  // schedule.getScheduleForEvent(code, tournamentLevel).subscribe(schedules => {
  //   console.log('----------- getScheduleForEvent result: ', schedules);
  //   const fileName = `schedule-${code}-${tournamentLevel}.json`
  //   fileService.saveJSONToFile('output/', fileName, schedules);
  // })

  // Get Districts and save to output/districts.json
  // const districtListing: DistrictListingsService = new DistrictListingsService('Basic ' + authCode, baseUrl, httpService);
  // districtListing.getDistricts().subscribe(districts => {
  //   console.log('----------- getDistricts result: ', districts);
  //   fileService.saveJSONToFile('output/', 'districts.json', districts);
  // })
  

  // GET TEAMS and s ave to output/teams.json
  // apiService.getTeams(5).subscribe(teams => {
  //   console.log('teams.length: ', teams.length);
  //   fileService.saveTeamsToFile('output/', 'teams.json', teams);
  // });

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
