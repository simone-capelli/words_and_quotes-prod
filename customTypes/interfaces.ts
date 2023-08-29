export interface Word {
  _id: string;
  userId: string;
  word: string;
  meaning: string;
  createdTime: Date;
  isLearned: boolean;
  tag: string;
  color: string;
}

export const initialFormData = {
  name: '',
  surname: '',
  email: '',
  msg: '',
};
export interface ErrorMessage {
  name: string;
  surname: string;
  email: string;
  msg: string;
}
export const errorMessage: ErrorMessage = {
  name: '',
  surname: '',
  email: '',
  msg: '',
};
