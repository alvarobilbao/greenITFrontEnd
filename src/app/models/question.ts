import { Choice } from './choice';
export class Question {
  id: number;
  question: string;
  topic: string;
  subtopic: string;
  type: number;
  choices: Choice[];
  subquestions: Question[];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
