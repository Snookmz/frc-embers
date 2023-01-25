import { Injectable } from '@nestjs/common';
import { Team } from "../objects/Team";
import * as fs from "fs";

@Injectable()
export class FileService {

  public saveTeamsToFile(path: string, fileName: string, teams: Team[], addTimestampToFilename?: boolean): void {
    console.log('FileService, saveTeamsToFile, %s%s', path, fileName);
    try {
      fs.writeFileSync(`${path}${fileName}`, JSON.stringify(teams, null, 2));
    } catch (err) {
      console.error(err);
    }
  }
  
  public readTeamsFileToTeams(path: string, fileName: string): Team[] {
    console.log('FileService, readTeamsFileToTeams');
    let teams: Team[] = [];
    try {
      const data = fs.readFileSync(`${path}/${fileName}`, 'utf8');
      teams = JSON.parse(data);
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
    
    return teams;
  }

}
