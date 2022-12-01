const test = document.getElementById("test");
let current_question = 0;

function runTest() {
    document.getElementById("header").style.display = "none";
    test.innerHTML = renderQuestion(current_question);
    renderNav();
}

function renderNav(curr) {
    const nav = document.getElementById("nav");
    
    const exit = document.createElement("button");
    exit.innerText = "Exit";

    const next = document.createElement("button");
    next.innerText = "Next";
    
    const prev = document.createElement("button");
    prev.innerText = "Previous";
    
    const submit = document.createElement("button");
    submit.innerText = "Submit";
    

    switch(curr) {
        case curr === 0:
            nav.appendChild(next);
            break;
        case curr < assessment.length && curr > 0:
            nav.appendChild(prev);
            nav.appendChild(next);
            break;
        case curr === assessment.length:
            nav.appendChild(prev);
            nav.appendChild(submit);
            
    }

    nav.appendChild(exit);
}

function renderQuestion(id) {
    const questionJSON = assessment[id];
    
    const element = document.createElement("div");
    const question = document.createElement("h2");
    question.innerText = questionJSON.question; 
    const options = document.createElement("div");

    switch (questionJSON.type) {
        case 'multiple-choice':
            questionJSON.options.forEach((opt)=> {
                const option = document.createElement("input");
                option.setAttribute("type", "radio");
                option.setAttribute("id", opt);
                option.setAttribute("name", "question_" + id);
                option.setAttribute("value", opt);
                
                const label = document.createElement("label");
                label.setAttribute("for", opt);
                label.innerHTML = opt;


                options.appendChild(option);
                options.appendChild(label);
            })
            break;
        case 'tf':
            break;
        case 'typed':
            break;
        default:
            break;
    }

    element.append(question);
    element.append(options);

    return element.innerHTML;    
}