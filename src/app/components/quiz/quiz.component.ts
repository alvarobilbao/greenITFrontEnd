import { Question } from '../../models/question';
import { JsonquestionService } from '../../services/jsonquestion.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: Question[];
  subquestions: Question[];
  currentQuestion: Question;
  currentQuestionId: number;
  currentQuestionIndex: number;
  answer: string;
  textFieldAnswer: string;
  iterateInSubquestions: boolean;
  constructor(private questionService: JsonquestionService, private apiService: ApiService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(data => {
      console.log(data);
      this.questions = data;
      this.currentQuestion = this.questions[0];
      this.currentQuestionIndex = 0;
      this.currentQuestionId = 0;
    });
  }

  // TODO create the answers array;
  // TODO add the logic to skip questions when needed
  nextQuestion() {
    const questionId = this.currentQuestionId;
    if (!this.iterateInSubquestions && this.currentQuestion.subquestions && this.currentQuestion.subquestions.length > 0) {
      this.subquestions = this.currentQuestion.subquestions;
      this.iterateInSubquestions = true;
      this.currentQuestionIndex = 0;
      this.currentQuestion = this.subquestions[0];
      return;
    }

    if (this.iterateInSubquestions) {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.subquestions.length) {
        this.currentQuestion = this.subquestions[this.currentQuestionIndex];
        return;
      } else {
        this.iterateInSubquestions = false;
        this.subquestions = [];
        this.currentQuestionIndex = 0;
        this.currentQuestionId = this.currentQuestion.id;
      }
    }
    if (questionId === 4 && this.answer && this.answer['text'] === 'No') {
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
  onChoiceChange(choice) {
    this.answer = choice;
    console.log('choice', choice);
  }

  onTextFieldChange(field) {
    console.log(field.value);
    this.textFieldAnswer = field.value;
  }

  // TODO create the answer array and manipulate it
  onMultipleChoiceChange(option, event) {
    console.log('option', option);
    console.log('event', event);
  }

  saveQuestionnaire() {
    console.log('calling save api');
    this.apiService.save([]).subscribe(data => {
      console.log('service was called');
    });
  }

  submit() {
    console.log('submit api call');
  }
}
