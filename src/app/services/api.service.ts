import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Answer } from '../models/answer';


const API_URL = 'http://vps613446.ovh.net';
// const API_URL = 'http://localhost:5000';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  // TODO save real data
  // TODO call the other services
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  save(answers: Answer[]) {
    /* answers = [{
      'ans_type': 1,
      'content': {'a_id': 1},
      'id_question': 1
    }]; */
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post<boolean>(
      API_URL + '/save/',  // Always add slash behind url, otherwise you will get 301 error
      JSON.stringify(answers),  // All the data need to be passed with header content-type as app/json.
      options
    );
  }
}
