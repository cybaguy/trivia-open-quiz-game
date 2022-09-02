export default function home(props){
    return(
        <div className="1">
     <h1 className='home_header'>Quizzical</h1>
      <h3 className='home_desc'>Some description if needed</h3>
      <button className='start_quiz' onClick={props.flipPage}>Start Quiz</button>
     </div>
    )
}
