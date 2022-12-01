const test = document.getElementById("test");
const nav = document.getElementById("nav");
const exit = document.createElement("button");
exit.innerText = "Exit";
exit.addEventListener('click', () => {
    doExit();
}); nav.append(exit);

const next = document.createElement("button");
next.innerText = "Next";
next.addEventListener('click', () => {
    current_question++;
    renderTest();
});

const prev = document.createElement("button");
prev.innerText = "Previous";
prev.addEventListener('click', function () {
    current_question--;
    renderTest();
});

const submit = document.createElement("button");
submit.innerText = "Submit";
submit.addEventListener('click', () => {
    doExit();
});


let current_question = 0;

function runTest() {
    document.getElementById("header").style.display = "none";
    nav.innerHTML = '';
    renderTest();
}

function renderTest() {
    test.innerHTML = renderQuestion(current_question);
    renderNav(current_question);
}

function renderNav(curr) {
    const totalQ = assessment.length - 1;
    nav.innerHTML = "";
    if (curr === totalQ) {
        nav.appendChild(prev);
        nav.appendChild(submit);
    } else if (curr === 0) {
        nav.appendChild(next);
        nav.appendChild(exit);
    } else {
        nav.appendChild(prev);
        nav.appendChild(next);
        nav.appendChild(exit);
    }
    return;
}

function renderQuestion(id) {
    const questionJSON = assessment[id];

    const element = document.createElement("div");
    const question = document.createElement("h2");
    question.innerText = (id + 1) + ". " + questionJSON.question;
    const options = document.createElement("div");
    options.setAttribute("class", "options")

    switch (questionJSON.type) {
        case 'multiple-choice':
            questionJSON.options.forEach((opt) => {
                const row = document.createElement("span");
                row.setAttribute("class", "choice")

                const option = document.createElement("input");
                option.setAttribute("type", "radio");
                option.setAttribute("id", opt);
                option.setAttribute("name", "question_" + id);
                option.setAttribute("value", opt);

                const label = document.createElement("label");
                label.setAttribute("for", opt);
                label.innerHTML = opt;


                row.appendChild(option);
                row.appendChild(label);
                options.appendChild(row);
            })
            break;
        case 'tf':
            const tf = [true, false];
            tf.forEach((opt) => {
                const row = document.createElement("span");
                row.setAttribute("class", "choice")

                const option = document.createElement("input");
                option.setAttribute("type", "radio");
                option.setAttribute("id", opt);
                option.setAttribute("name", "question_" + id);
                option.setAttribute("value", opt);

                const label = document.createElement("label");
                label.setAttribute("for", opt);
                label.innerHTML = opt;


                row.appendChild(option);
                row.appendChild(label);
                options.appendChild(row);
            })
            break;
        case 'typed':
            const option = document.createElement("input");
            option.setAttribute("type", "text");
            option.setAttribute("id", "question_" + id);
            option.setAttribute("name", "question_" + id);
            option.setAttribute("class", "choice")

            options.appendChild(option);
            break;
        default:
            break;
    }

    element.append(question);
    element.append(options);

    return element.innerHTML;
}