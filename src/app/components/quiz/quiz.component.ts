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
  currentQuestion: Question;
  currentQuestionId: number;
  currentQuestionIndex: number;
  answer: any;
  constructor(private questionService: JsonquestionService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(data => {
      console.log(data);
      this.questions = data;
      this.currentQuestion = this.questions[0];
      this.currentQuestionIndex = 0;
      this.currentQuestionId = 0;
    });
  }

  nextQuestion() {
    const questionId = this.currentQuestionId;
    if (questionId === 4 && this.answer === 'No') {
      this.currentQuestionId = 12;
    } else {
      this.currentQuestionId++;
    }
    for (let i = this.currentQuestionIndex; i < this.questions.length; i++) {
      if (this.questions[i].id === this.currentQuestionId) {
        this.currentQuestionIndex = i;
        this.currentQuestion = this.questions[i];
        break;
      }
    }
  }
}
