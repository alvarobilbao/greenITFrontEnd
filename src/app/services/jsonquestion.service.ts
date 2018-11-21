import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JsonquestionService {

  constructor(private http: HttpClient) { }

  public getQuestions() {
    return this.http.get<any>('./assets/data/questions.json')
  }

}
