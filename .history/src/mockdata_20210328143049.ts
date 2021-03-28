const data: Form = {
    questions: [
        {
            type: 'input',
            id:'name',
            label: '姓名'
        }, {

            type: 'radio',
            id: 'gender',
            label: '性别',
            options: [
                {
                    id:0,
                    label:'男'
                },
                {
                    id:1,
                    label:'女'
                }
            ]
        }
    ]
}
export default {
    
}