import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { map, Observable } from "rxjs";

@Injectable()
export class ScheduleService {
  
  private scheduleUrl = '/2023/schedule';
  
  constructor(
    private authorizationCode: string,
    private baseUrl: string,
    private readonly httpService: HttpService,
  ) {
  }
  
  public getScheduleForEvent(code: string, tournamentLevel: string): Observable<object> {
    return this.httpService.get(this.baseUrl +
      this.scheduleUrl +
      '/' + code + '?tournamentLevel=' + tournamentLevel,
      {headers: {Authorization: this.authorizationCode}}).pipe(map(res => {
      return res.data;
    }))
  }
  
}
