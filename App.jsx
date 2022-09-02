import { useEffect, useState} from 'react'
import top_blob from '../public/assets/top_blob.png'
import bottom_blob from '../public/assets/bottom_blob.png'
import './App.css'
import { Question } from './components/Questions'
import Home from './components/Home'
import { nanoid } from 'nanoid'
import parse from 'html-react-parser'


function App() {
  const [count, setCount] = useState(0)
  const [page,setPage]= useState(true)
  const [result,setResult] = useState({})
  const [questions,setQuestions] = useState([{
    question:'',
    question_id:'1234',
    correct_answer:'',
    isSelected:'',
    judged:'',
    answers:''}])
const [judged,setJudge]=useState([])
const [quizon,setQuizOn]=useState(true)
const [good,setGood]=useState(0)
let judgedArray= ['','','','','']
//console.log(judged)
  useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => setResult(data.results))
  
   
  
  },[quizon])
  const resultArray = result
  
  function shuffleArray(array) {
    let shuffled = array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    
    return shuffled

}


  function organize(){
    
    let answers=[]
    let lenght=0
    let scrambledanswers = []
    window.questionArray = []
    for(var quest of resultArray){
      let asked = parse(quest['question'])
      let id=lenght
      lenght=lenght+1
      answers = [
        {value:parse(quest['incorrect_answers'][0]),id:nanoid(),isSelected:false},
        {value:parse(quest['incorrect_answers'][1]),id:nanoid(),isSelected:false},
        {value:parse(quest['incorrect_answers'][2]),id:nanoid(),isSelected:false},
        {value:parse(quest['correct_answer']),id:nanoid(),isSelected:false}
      ]
      scrambledanswers
      scrambledanswers=shuffleArray(answers)
      let scrambledanswers_object = {ans1:scrambledanswers[0],ans2:scrambledanswers[1],ans3:scrambledanswers[2],ans4:scrambledanswers[3]}
      let organised = {
        question:asked,
        correct_answer:parse(quest['correct_answer']),
        question_id:id,
        isSelected:'',
        judged:'',
        answers:scrambledanswers_object
      }
      questionArray.push(organised)
    
  
    }
    setQuestions(questionArray)
  
    
  
  }



//   function selectAnswer(quest_id,id){
//     setQuestions(prevQuestion=>prevQuestion.map(item1=>{
//   if(item1.question_id==quest_id){
//     (item1.answers).map(item_answer=>{
//       if(item_answer.id==id){
//         return {...item_answer,isSelected:!item_answer.isSelected}
//       }
//     })
//   }
// }))
// console.log(questions)
// }


function selectAnswer(quest_id,id){
  setQuestions(prevQuestion=>prevQuestion.map(item=>{
    return item.question_id==quest_id?{...item,isSelected:id}:item
  }))
}




 const questionElement = questions.map(item=>
 <Question
 quest={item}
 key={item.question_id}
 s1={item.answers.ans1}
 grade={grade}
 judged={judged[questions.indexOf(item)]}
 quizon={quizon}
 good={good}
 reset={flipPage}
 

 selectAnswer={selectAnswer}
 />
 
 )
function grade(){
  setQuizOn(!quizon)
  let good1=0
  judgedArray=[]
questions.map(item=>{
  const selected_answer=item.isSelected
  let selected_answer_value=''
if(selected_answer==1){
  selected_answer_value=item.answers.ans1
}
if(selected_answer==2){
  selected_answer_value=item.answers.ans2
}
if(selected_answer==3){
  selected_answer_value=item.answers.ans3
}
if(selected_answer==4){
  selected_answer_value=item.answers.ans4
}
//  console.log(selected_answer_value)
  if(item.correct_answer==selected_answer_value.value){
    good1=good1+1
    judgedArray.push('correct')
    setJudge(judgedArray)
    setGood(good1)
    
  }else{
    judgedArray.push('incorrect')
    setJudge(judgedArray)
  }
})
//console.log(good1)
}
//  function selectAnswer(id){
//   setQuestions(prevState=>{
//     for(var state of prevState){
//       const prevanswer=state.answers
//       for(var answer of prevanswer){
//         if(answer.id==id){
//           console.log("opor")
//         }
//       }

//     }
//   })
  
// }

//console.log(questions)
  

 
 
 //object shuffler
 //let obj = {a:{a:'1'},b:{"b":2}, c:{"c":3}, d:{"d":4}}
  // function shuffleObject(obj){
  //     // new obj to return
  //   let newObj = {};
  //     // create keys array
  //   var keys = Object.keys(obj);
  //     // randomize keys array
  //     keys.sort(function(a,b){return Math.random()- 0.5;});
  //   // save in new array
  //     keys.forEach(function(k) {
  //         newObj[k] = obj[k];
  // });
  //   return newObj;
  // }
  
  // console.log(JSON.stringify(shuffleObject(obj)));
  // console.log(JSON.stringify(shuffleObject(obj)));
  // console.log(JSON.stringify(shuffleObject(obj)));





  function flipPage(){
    setPage(prevPage=>!prevPage)
    organize()
    setJudge([])
    setGood(0)
    if(quizon==false){
      setQuizOn(!quizon)
    }
    
  }





  return (
    <div className="App">
     <div className="quiz_home">
      <img className='top_blob' src={top_blob} alt="" />
      <img className='bottom_blob' src={bottom_blob} alt="" />
     { page==true ?
      <Home flipPage={flipPage}/> : 
      questionElement}
     </div>
    </div>
  )
}

export default App
