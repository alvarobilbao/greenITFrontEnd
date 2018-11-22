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
  answer: string;
  textFieldAnswer: string;
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

  // TODO navigate through the subquestions
  // TODO create the answers array;
  // TODO add the logic to skip questions when needed
  nextQuestion() {
    const questionId = this.currentQuestionId;
    if (questionId === 4) {
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
    // console.log(field.value);
    this.textFieldAnswer = field.value;
  }
}
