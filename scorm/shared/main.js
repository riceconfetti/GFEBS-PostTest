import assessment from './assessment.json' assert {type: json}

const test = document.getElementById("test");
let current_question = 0;

function startTest() {
    document.getElementById("header").style.display = "none";
    test.innerHTML = renderQuestion(current_question);
}

function renderQuestion(question) {
    const questionJSON = assessment[question];
    
    const question = document.createElement("h2");
    const option = document.createElement("form");
    
    switch (question.type) {
        case 'multiple-choice':
            break;
        case 'tf':
            break;
        case 'typed':
            break;
        default:
            break;
    }

    question.append(questionJSON.question);
    
}