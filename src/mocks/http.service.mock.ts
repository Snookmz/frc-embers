import { Observable, of } from "rxjs";

export class HttpServiceMock {
  public get(url: string, config?: any): Observable<any> {
    return of('unit test response');
  }

}
