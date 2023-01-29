import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { map, Observable } from "rxjs";

@Injectable()
export class DistrictListingsService {
  
  private districtListingUrl = '/2023/districts';
  
  constructor(
    private authorizationCode: string,
    private baseUrl: string,
    private readonly httpService: HttpService,
  ) {
  }
  
  public getDistricts(): Observable<object> {
    return this.httpService.get(this.baseUrl + this.districtListingUrl, {headers: {Authorization: this.authorizationCode}}).pipe(map(res => {
      return res.data;
    }))
  }
  
}
