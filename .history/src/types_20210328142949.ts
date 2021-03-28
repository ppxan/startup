interface Option {
    label: string;
    id: number;
}

type Question = {
    label: string;
    id: string;
    type: 'input';
   
} | {
    options: Option[];

    label: string;
    id: string;
    type: 'input';
}

interface Form {
    questions: Question[];
}