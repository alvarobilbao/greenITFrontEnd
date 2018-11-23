import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../models/answer';


const API_URL = 'http://51.75.125.218:80';
@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  // TODO save real data
  // TODO call the other services
  save(answers: Answer[]) {
    answers = [{
      'id_type': 1,
      'content': {'a_id': 1},
      'id_question': 1
    }];
    return this.http.post<boolean>(API_URL + '/save', answers);
  }

}
