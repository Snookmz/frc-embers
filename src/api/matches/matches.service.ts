import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { map, Observable } from "rxjs";

@Injectable()
export class MatchesService {
  private matchUrl = '/2023/match';
  
  // scoreUrl = '{{baseUrl}}/:season/scores/:eventCode/:tournamentLevel'
  
  constructor(
    private authorizationCode: string,
    private baseUrl: string,
    private readonly httpService: HttpService,
  ) {
  }
  
  // https://frc-api.firstinspires.org/v3.0/:season/matches/:eventCode?tournamentLevel=&teamNumber=&matchNumber=&start=&end=
  public getMatchResults(season: string, eventCode: string, tournamentLevel: string): Observable<object> {
    const scoreUrl = `${this.baseUrl}/${season}/matches/${eventCode}?tournamentLevel=${tournamentLevel}`
    console.log('--------- scoreUrl: ', scoreUrl);
    return this.httpService.get(scoreUrl,
      {headers: {Authorization: this.authorizationCode}}).pipe(map(res => {
      return res.data;
    }))
  }
  
  public getScoreForEvent(season: string, eventCode: string, tournamentLevel: string): Observable<object> {
    const scoreUrl = `${this.baseUrl}/${season}/scores/${eventCode}/${tournamentLevel}`
    console.log('--------- scoreUrl: ', scoreUrl);
    return this.httpService.get(scoreUrl,
      {headers: {Authorization: this.authorizationCode}}).pipe(map(res => {
      return res.data;
    }))
  }
}
