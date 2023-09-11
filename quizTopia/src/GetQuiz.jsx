import { useState } from "react"
import { Navigate } from "react-router-dom"
import CreateQuiz from "./CreateQuiz"
import ShowQuiz from "./ShowQuiz"

 function GetQuiz(){
    const [quizzes, setquizzes] = useState()


async function getQuizApi(){

    const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz')
    const data = await response.json()
    setquizzes(data.quizzes)


}
 const content = quizzes?.map((quiz)=>{
    return <ShowQuiz name= {quiz.username} question = {quiz.questions}/>
    
})


  



    return(
        <div>
            <button onClick={getQuizApi}>show questions</button>

           {content}
        </div>
    )
}


export default GetQuiz