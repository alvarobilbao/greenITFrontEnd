export class Answer {
  id_question: number;
  ans_type: number;
  content: any;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
