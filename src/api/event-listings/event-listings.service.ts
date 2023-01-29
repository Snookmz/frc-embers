import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { map, Observable } from "rxjs";

@Injectable()
export class EventListingsService {
  
  private eventListingUrl = '/2023/events';
 
  constructor(
    private authorizationCode: string,
    private baseUrl: string,
    private readonly httpService: HttpService,
  ) {
  }
  
  public getEvents(): Observable<object> {
    return this.httpService.get(this.baseUrl + this.eventListingUrl, {headers: {Authorization: this.authorizationCode}}).pipe(map(res => {
      return res.data;
    }))
  }
  
}
