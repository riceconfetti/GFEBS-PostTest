const test = document.getElementById("test");

let current_question = 0;
let complete = -1;
let correct = 0;
let questionStart;
let questionEnd;

function handleNavClick(input) {
    switch(input) {
        case 'prev':
            current_question--;
            if (current_question === 0) {
                complete = -1;
            } else if (current_question === assessment.length-2) {
                complete = 0;
            }
            
            renderTest();
            break;
        case 'next':
            current_question++;
            complete = 0;
            if (current_question === (assessment.length-1)) {
                complete = 1;
            } 

            renderTest();
            break;
        case 'submit':
            console.log("Submitted")
            checkScore();
            persistData();    
        case 'exit':
            doExit();
            break;
    }
}

function runTest() {
    document.getElementById("header").style.display = "none";
    renderTest();
}

function renderNav() {
    switch(complete) {
        case -1:
            document.getElementById("next").classList.add('show');
            document.getElementById("prev").classList.remove('show');
            document.getElementById("submit").classList.remove('show');
            document.getElementById("exit").classList.add('show');
            break;
        case 0:
            document.getElementById("next").classList.add('show');
            document.getElementById("prev").classList.add('show');
            document.getElementById("submit").classList.remove('show');
            document.getElementById("exit").classList.add('show');
            break;
        case 1:
            document.getElementById("next").classList.remove('show');
            document.getElementById("prev").classList.add('show');
            document.getElementById("submit").classList.add('show');
            document.getElementById("exit").classList.remove('show');
            break;
    }

    document.getElementById("nav").style.display = "block";
}

function renderTest() {
    test.innerHTML = renderQuestion(current_question);
    setInteractions(current_question);
    renderNav();
}

function checkScore() {
    storeDataValue("cmi.score.scaled", Math.round((correct/assessment.length)*100)/100);
}

function renderQuestion(id) {
    const questionJSON = assessment[id];

    const element = document.createElement("div");
    const question = document.createElement("h2");
    question.innerText = (id + 1) + ". " + questionJSON.question;
    const options = document.createElement("div");
    options.setAttribute("class", "options")

    switch (questionJSON.type) {
        case 'choice':
            questionJSON.options.forEach(function(opt) {
                const row = document.createElement("span");
                row.setAttribute("class", "choice")

                const option = document.createElement("input");
                option.setAttribute("type", "radio");
                option.setAttribute("id", opt);
                option.setAttribute("name", id);
                option.setAttribute("value", opt);

                const label = document.createElement("label");
                label.setAttribute("for", opt);
                label.innerHTML = opt;

                row.appendChild(option);
                row.appendChild(label);
                options.appendChild(row);
            })
            break;
        case 'true-false':
            const tf = [true, false];
            tf.forEach(function(opt) {
                const row = document.createElement("span");
                row.setAttribute("class", "choice")

                const option = document.createElement("input");
                option.setAttribute("type", "radio");
                option.setAttribute("id", opt);
                option.setAttribute("name", id);
                option.setAttribute("value", opt);

                const label = document.createElement("label");
                label.setAttribute("for", opt);
                label.innerHTML = opt;


                row.appendChild(option);
                row.appendChild(label);
                options.appendChild(row);
            })
            break;
        case 'fill-in':
            const option = document.createElement("input");
            option.setAttribute("type", "text");
            option.setAttribute("id", id);
            option.setAttribute("name", id);
            option.setAttribute("class", "choice");

            options.appendChild(option);
            break;
        case 'long_fill_in':
        case 'likert':
        case 'matching':
        case 'performance':
        case 'sequencing':
        case 'numeric':
        case 'other':
        default:
            break;
    }

    element.appendChild(question);
    element.appendChild(options);

    return element.innerHTML;
}

function setInteractions(id) {
    questionStart = new Date();
    const options = document.getElementsByTagName("input");
    console.log(options);
    const timestamp = questionStart.toISOString().slice(0, questionStart.toISOString().indexOf(".")+2) +"Z"; 

    storeDataValue('cmi.interactions.'+id+'.id', "question_"+id);
    storeDataValue('cmi.interactions.'+id+'.timestamp', timestamp);
    storeDataValue('cmi.interactions.'+id+'.type', assessment[id].type);
    assessment[id].answer.forEach(function(answer, i) {
        storeDataValue('cmi.interactions.'+id+'.correct_responses.'+i+'.pattern', answer);
    });

    for (let i =0; i < options.length; ++i) {
        let choice = options[i];
        choice.addEventListener("change", responseHandler);
    }
    
}

function responseHandler(e) {
    storeDataValue('cmi.interactions.'+e.target.name+'.learner_response', e.target.value);
    questionEnd = new Date();
    storeDataValue('cmi.interactions.'+e.target.name+'.latency', ConvertMilliSecondsIntoSCORM2004Time(questionEnd.getTime()-questionStart.getTime()))
    if (e.target.value === assessment[e.target.name].answer) {
        storeDataValue('cmi.interactions.'+e.target.name+'.result', 'correct');
        correct++;
    } else {
        storeDataValue('cmi.interactions.'+e.target.name+'.result', 'incorrect');
    }
}