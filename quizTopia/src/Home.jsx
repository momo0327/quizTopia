import { useNavigate } from "react-router-dom"
import GetQuiz from "./GetQuiz"
import SignUp from "./signUp"
import CreateQuiz from "./CreateQuiz"



function Home() {
    const navigate = useNavigate()

    function send(){
        navigate('/signUp')
    }

    return (
        <div>
           <h1>QuizTopia</h1>
            <button onClick={send}>Sign Up</button>
            <GetQuiz/>
            <button onClick={()=>{navigate('createQuestion')}}>Create Question</button>

        </div>
    )
}

export default Home