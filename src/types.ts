export interface Option {
  label: string;
  id: number;
  children?: Question[];
}

export type Question =
  | {
      label: string;
      id: string;
      type: 'input';
    }
  | {
      label: string;
      id: string;
      type: 'radio';
      options: Option[];
    }
  | {
      label: string;
      id: string;
      type: 'checkboxGroup';
      options: Option[];
    };

export interface Form {
  title: string;
  description?: string;
  questions: Question[];
}
