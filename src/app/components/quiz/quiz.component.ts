import { Question } from '../../models/question';
import { JsonquestionService } from '../../services/jsonquestion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: Question[];
  constructor(private questionService: JsonquestionService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(data => {
      console.log(data);
      this.questions = data;
    });
  }
  
  

}
