import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiService } from "./api/api.service";
import { HttpService } from "@nestjs/axios";
import * as fs from "fs";
import { FileService } from "./file/file.service";
import { EventListingsService } from "./api/event-listings/event-listings.service";
import { DistrictListingsService } from "./api/district-listings/district-listings.service";
import { ScheduleService } from "./api/schedule/schedule.service";
import { MatchesService } from "./api/matches/matches.service";
import { createInterface } from "readline";


const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

const authCode = readAuthCode();
const baseUrl = 'https://frc-api.firstinspires.org/v3.0';
const httpService: HttpService = new HttpService()
const apiService: ApiService = new ApiService(httpService);
const fileService: FileService = new FileService();
apiService.authCode = 'Basic ' + authCode;

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  const app = await NestFactory.createApplicationContext(AppModule);
  // application logic...



  
  const readLineAsync = (msg: string) => {
    return new Promise(resolve => {
      readline.question(msg, userRes => {
        resolve(userRes);
      });
    });
  }
 
  askQuestion1();

  
  // const startApp = async() => {
  //   const userRes = await readLineAsync("How are you? ");
  //   readline.close();
  //   console.log("Your response was: " + userRes + " - Thanks!");
  // }
  
  // startApp().then(res => {
  //   console.log('----- startApp res: ', res);
  // })
  
 

  

  
  /**
   * Get the score for season/event/tournamentLevel
   */
  // const code = 'ARFA';
  // const tournamentLevel = 'Playoff';
  // const season = '2015';
  // const matchesService: MatchesService = new MatchesService('Basic ' + authCode, baseUrl, httpService);
  // matchesService.getScoreForEvent(season, code, tournamentLevel).subscribe(scores => {
  //   console.log('----------- getScheduleForEvent result: ', scores);
  //   const fileName = `score-${code}-${tournamentLevel}.json`
  //   fileService.saveJSONToFile('output/', fileName, scores);
  // })
  
  /**
   * Get the match result
   */
  // const code = 'ARFA';
  // const tournamentLevel = 'Playoff';
  // const season = '2015';
  // const matchesService: MatchesService = new MatchesService('Basic ' + authCode, baseUrl, httpService);
  // matchesService.getMatchResults(season, code, tournamentLevel).subscribe(scores => {
  //   console.log('----------- getScheduleForEvent result: ', scores);
  //   const fileName = `match-results-${season}-${code}-${tournamentLevel}.json`
  //   fileService.saveJSONToFile('output/', fileName, scores);
  // })
  
  // Get Districts and save to output/districts.json
  // const districtListing: DistrictListingsService = new DistrictListingsService('Basic ' + authCode, baseUrl, httpService);
  // districtListing.getDistricts().subscribe(districts => {
  //   console.log('----------- getDistricts result: ', districts);
  //   fileService.saveJSONToFile('output/', 'districts.json', districts);
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

function askQuestion1(): void {
  const q1 = `Choose from the following:
  1. Get teams.
  2. Get events.
  3. Get schedule for an event code.
  4. Get score for season/event/tournament level
  5. Get match result for event code/season/tournament level.
  6. Get districts
  $ `;
  
  readline.question(q1, answer => {
    console.log('---- you chose: ', answer);
    
    switch (answer) {
      case '1':
        getTeams()
        break;
      case '2':
        getEvents();
        break;
      case '3':
        readline.question(`Get schedule for event code
code: `, code => {
          getScheduleForEventCode(code);
        })
        break;
      
      default:
        console.log(`'${answer}' is not a valid option.\n`)
    }
  })
}

function getEvents(): void {
  // GET EVENTS and save to output/events.json
  const eventListing: EventListingsService = new EventListingsService('Basic ' + authCode, baseUrl, httpService);
  eventListing.getEvents().subscribe(events => {
    console.log('----------- getEvents result: ', events);
    fileService.saveJSONToFile('output/', 'events.json', events);
  })
}

function getScheduleForEventCode(code: string): void {
  // Get the schedule for an event and save to output/events.json
  const schedule: ScheduleService = new ScheduleService('Basic ' + authCode, baseUrl, httpService);
  // const code = 'ALHU';
  const tournamentLevel = 'Playoff';
  schedule.getScheduleForEvent(code, tournamentLevel).subscribe((schedules: any) => {
    console.log('getScheduleForEvent result: ', schedules);
    if (schedules['Schedule'].length == 0) {
      console.log(`no schedules for code ${code}`)
    }
    const fileName = `schedule-${code}-${tournamentLevel}.json`
    fileService.saveJSONToFile('output/', fileName, schedules);
  })
}

function getTeams(limit?: number): void {
  // GET TEAMS and s ave to output/teams.json
  apiService.getTeams().subscribe(teams => {
    console.log('teams.length: ', teams.length);
    fileService.saveTeamsToFile('output/', 'teams.json', teams);
  });
}
