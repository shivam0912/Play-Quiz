const apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple";

const questionElement = document.querySelector(".question");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const submit = document.querySelector("#submit");
const answers = document.querySelectorAll('.answer')
const showScore = document.querySelector('#showScore')

let currentQuestion = 0;
let score = 0;
let questions = [];


function fetchQuestion() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      questions = data.results;

      showQues();
    });
}

function showQues() {
  const ques = questions[currentQuestion];
  questionElement.innerText = `Q${currentQuestion+1}. `+ques.question;

  const choices = [...ques.incorrect_answers, ques.correct_answer];
  //console.log(choices);
  shuffleArray(choices);
  //console.log(choices);
  option1.innerText = choices[0];
  option2.innerText = choices[1];
  option3.innerText = choices[2];
  option4.innerText = choices[3];
  //console.log(option1.getAttribute('for'))

}
submit.addEventListener('click',()=>{
    const checkedAnswer = getCheckAnswer();
    const rightAns = document.querySelector(`label[for="${checkedAnswer}"]`)
  //  console.log(rightAns.innerText ===questions[currentQuestion].correct_answer )
  
    if(rightAns.innerText ===questions[currentQuestion].correct_answer){score++;}
   
    currentQuestion++;
    
    deselectAll();
    if(currentQuestion<questions.length)
    fetchQuestion()
    else {
        showScore.innerHTML =`
        <h3> Your score ${score}/${questions.length}  ✌ </h3>
        <button class="btn" onclick="location.reload()">Play Again</button>
        `;
        showScore.classList.remove('scoreArea')
    }

})

const deselectAll =()=>{
    answers.forEach((currAnsEle)=> currAnsEle.checked = false)
}

const getCheckAnswer = ()=>{
    let ans;

    answers.forEach((currAnsEle)=>{
        if(currAnsEle.checked){
            ans =currAnsEle.id;

        }
    })
    return ans;
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
fetchQuestion();

