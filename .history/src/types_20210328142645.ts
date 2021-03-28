interface Option {
    label: string;
    id: number;

}

interface Question {
    label: string;
    id: string;
    type: 'input' | 'radio';
    options: Option[];
}

interface Form {
    questions: Question[];
}