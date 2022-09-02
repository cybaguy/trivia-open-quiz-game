
export function Question(props){
    
        const styles = {
            backgroundColor:"#D6DBF5"
        } 

    
    const styles1 = {
        backgroundColor:"inherit"
    }
    const styles_correct = {
        backgroundColor:"#94D7A2"
    } 
    const styles_incorrect = {
        backgroundColor:"#F8BCBC"
    } 
    const condition1 = ((props.judged==undefined && props.quest.isSelected==1)?styles:(props.judged=="correct"&& props.quest.isSelected==1)?styles_correct:(props.judged=="incorrect"&& props.quest.isSelected==1)?styles_incorrect:(props.quest.isSelected!==1&&props.judged=="incorrect"&&props.quest.correct_answer==props.quest.answers.ans1.value)?styles_correct:styles1)
    const condition2 = ((props.judged==undefined && props.quest.isSelected==2)?styles:(props.judged=="correct"&& props.quest.isSelected==2)?styles_correct:(props.judged=="incorrect"&& props.quest.isSelected==2)?styles_incorrect:(props.quest.isSelected!==2&&props.judged=="incorrect"&&props.quest.correct_answer==props.quest.answers.ans2.value)?styles_correct:styles1)
    const condition3 = ((props.judged==undefined && props.quest.isSelected==3)?styles:(props.judged=="correct"&& props.quest.isSelected==3)?styles_correct:(props.judged=="incorrect"&& props.quest.isSelected==3)?styles_incorrect:(props.quest.isSelected!==3&&props.judged=="incorrect"&&props.quest.correct_answer==props.quest.answers.ans3.value)?styles_correct:styles1)
    const condition4 = ((props.judged==undefined && props.quest.isSelected==4)?styles:(props.judged=="correct"&& props.quest.isSelected==4)?styles_correct:(props.judged=="incorrect"&& props.quest.isSelected==4)?styles_incorrect:(props.quest.isSelected!==4&&props.judged=="incorrect"&&props.quest.correct_answer==props.quest.answers.ans4.value)?styles_correct:styles1)
    return(
        <div className="question">
           <div className="quest_det"> 
           <h1 className="quest">{props.quest.question}</h1>
            <button className="options" style={(condition1)} onClick={props.quizon ? (()=>props.selectAnswer(props.quest.question_id,1)):undefined}>{props.quest.answers.ans1.value}</button>
            <button className="options" style={(condition2)} onClick={props.quizon ? (()=>props.selectAnswer(props.quest.question_id,2)):undefined}>{props.quest.answers.ans2.value}</button>
            <button className="options" style={(condition3)} onClick={props.quizon ? (()=>props.selectAnswer(props.quest.question_id,3)):undefined}>{props.quest.answers.ans3.value}</button>
            <button className="options" style={(condition4)} onClick={props.quizon ? (()=>props.selectAnswer(props.quest.question_id,4)):undefined}>{props.quest.answers.ans4.value}</button>
            <hr className="hr"/>
            </div>
            {props.quest.question_id==4 && props.quizon==true?<div className="scoreboard"><button onClick={props.grade} className="check_answers">Check Answers</button></div>:props.quest.question_id==4 && props.quizon==false?<div className="scoreboard"><h1 className="score">You Scored{props.good}/5</h1><button onClick={props.reset} className="check_answers">Go To Home</button></div>:''}
            
        </div>
    )
}
