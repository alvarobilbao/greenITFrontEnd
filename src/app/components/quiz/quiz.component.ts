import { Question } from '../../models/question';
import { JsonquestionService } from '../../services/jsonquestion.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Answer } from '../../models/answer';

const API_URL = 'http://vps613446.ovh.net';

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
  answer: any;
  textFieldAnswer: string;
  mcAnswer: any[];
  iterateInSubquestions: boolean;
  allAnswers: Answer[];
  constructor(private questionService: JsonquestionService, private apiService: ApiService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(data => {
      console.log(data);
      this.questions = data;
      this.currentQuestion = this.questions[0];
      this.currentQuestionIndex = 0;
      this.currentQuestionId = 0;
      this.allAnswers = [];
    });
  }

  // TODO create the answers array;
  // TODO add the logic to skip questions when needed
  nextQuestion() {
    const questionId = this.currentQuestionId;
    this.addAnswer();
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

  addAnswer() {
    const self = this;
    if (this.currentQuestion.type === 1) {
      const answer = new Answer(
        {
          id_question: self.currentQuestion.id,
          ans_type: 1,
          content: {a_id: this.answer.id}
        }
      );
      this.allAnswers.push(answer);
    }
    if (this.currentQuestion.type === 2) {
      const answer = new Answer(
        {
          id_question: self.currentQuestion.id,
          ans_type: 2,
          content: this.mcAnswer
        }
      );
      this.allAnswers.push(answer);
    }
    if (this.currentQuestion.type === 3) {
      const answer = new Answer(
        {
          id_question: self.currentQuestion.id,
          ans_type: 3,
          content: {a_id: this.answer.id, text: this.textFieldAnswer}
        }
      );
      this.allAnswers.push(answer);
    }
    if (this.currentQuestion.type === 4) {
      const answer = new Answer(
        {
          id_question: self.currentQuestion.id,
          ans_type: 4,
          content: this.textFieldAnswer
        }
      );
      this.allAnswers.push(answer);
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
    this.apiService.save(this.allAnswers).subscribe(data => {
      alert('Here is the link you have generated: ' + API_URL + '/' + data['id']);
      // data will be called as json when you call http://vps613446.ovh.net/get/<id>
    });
  }

  submit() {
    console.log('submit api call');
  }
}
