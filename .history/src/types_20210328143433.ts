interface Option {
  label: string;
  id: number;
}

type Question =
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
    };

export interface Form {
  questions: Question[];
}
