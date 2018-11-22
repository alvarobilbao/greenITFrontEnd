export class Choice {
  id: number;
  text: string;
  hasTextField: boolean;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
