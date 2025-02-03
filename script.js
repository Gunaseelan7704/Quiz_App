let questions = [
          {
              ques : "How do you write 'Hello World' in an alert box?",
              options : ["msg('Hello World');", "alert('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');"],
              correct : "alert('Hello World');"
          },
          {
              ques : "Which of the following is the correct way to write a JavaScript array?",
              options : ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 1=('red'), 2=('green'), 3=('blue')", "var colors = 'red', 'green', 'blue'"],
              correct : "var colors = ['red', 'green', 'blue']"
          },
          {
              ques : "How do you find the number with the highest value of x and y?",
              options : ["Math.ceil(x, y)", "Math.max(x, y)", "top(x, y)", "ceil(x, y)"],
              correct : "Math.max(x, y)"
          },
          {
              ques : "Which event occurs when the user clicks on an HTML element?",
              options : ["onmouseover", "onchange", "onclick", "onmouseclick"],
              correct : "onclick"
          },
          {
              ques : "How do you declare a JavaScript variable?",
              options : ["v carName;", "variable carName;", "var carName;", "declare carName;"],
              correct : "var carName;"
          },
          {
              ques : "Which operator is used to assign a value to a variable?",
              options : ["*", "=", "-", "+"],
              correct : "="
          },
          {
              ques : "What will the following code return: Boolean(10 > 9)?",
              options : ["true", "false", "NaN", "undefined"],
              correct : "true"
          },
          {
              ques : "Is JavaScript case-sensitive?",
              options : ["Yes", "No", "Depends on the browser", "Only for variables"],
              correct : "Yes"
          },
          {
              ques : "How do you write a comment in JavaScript?",
              options : [" /This is comment", "//This is a comment", " 'This is a comment' ", "**This is a comment**"],
              correct : "//This is a comment"
          },
          {
              ques : "What is the output for given code ? <br> console.log(typeof null);",
              options : ["object","null","undefined","string"],
              correct : "object"
          }
        ];

        let quesbox = document.getElementById("ques");
        let ansbox = document.getElementById("options");

        let currquesidx = 0;
        let score = 0;
        let userAnswers = [];

        function startQuiz(){
            document.getElementById("welcome").style.display = "none";
            document.getElementById("quizapp").style.display = "block";
            showQuestion();
        }

        function showQuestion() {
            let currques = questions[currquesidx];
            let quesNo = currquesidx + 1;
            quesbox.innerHTML = quesNo + ". " + currques.ques;
  
            ansbox.innerHTML = "";
            for (let i = 0; i < currques.options.length; i++) {
                let option = document.createElement("p");
                option.innerText = currques.options[i];
                option.className = "opt"; 
                option.onclick = function () {
                userAnswers[currquesidx] = currques.options[i];
                highlightSelected(option);
               };
                ansbox.appendChild(option);
            }
  
            if (userAnswers[currquesidx]) {
                let options = ansbox.getElementsByTagName("p");
                for (let opt of options) {
                if (opt.innerText === userAnswers[currquesidx]) {
                opt.style.backgroundColor = "rgb(238, 144, 4)";
                }
              }
            }
        }
  
        function highlightSelected(selectedOption) {
            let options = ansbox.getElementsByTagName("p");
            for (let opt of options) {
                opt.style.backgroundColor = "";
            }
            selectedOption.style.backgroundColor = "rgb(238, 144, 4)";
        }

        function nextQuestion() {
            if (currquesidx < questions.length - 1) {
                currquesidx++;
                showQuestion();
            } else {
                calculateScore();
            }
        }

        function prevQuestion() {
            if (currquesidx > 0) {
                currquesidx--;
                showQuestion();
            }
        }

        function calculateScore() {
            score = 0;
            for (let i = 0; i < questions.length; i++) {
                if (userAnswers[i] === questions[i].correct) {
                    score++;
                }
            }
            showResult();
        }

        function showResult() {
            let percentage = score / questions.length * 100;
            let result = "";
            if(percentage > 80)
            {
                result = "Excellent!";
            }
            else if(percentage >= 50 && percentage <= 80)
            {
                result = "Good Job!";
            }else{
                result = "Keep Practicing!";
            }
            quesbox.innerHTML = "Quiz Completed!";
            ansbox.innerHTML = `<br><p><b>${result}</b></p> <br> <p class = "scoresenence"><b>Your score is ${score} out of ${questions.length}.</b></p><br>`;
            let restartButton = document.createElement("button");
            restartButton.innerText = "Restart Quiz";
            restartButton.className = "restart";
            restartButton.onclick = restartQuiz;
            ansbox.appendChild(restartButton);

            document.querySelector(".nextprev").style.display = "none";
            document.getElementById("text").style.display = "none";
        }

        let restartQuiz = () => {
            currquesidx = 0;
            score = 0;
            userAnswers = [];
            document.querySelector(".nextprev").style.display = "block";
            showQuestion();
        }