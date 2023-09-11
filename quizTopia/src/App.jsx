import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import SignUp from './signUp'
import Home from './Home'
import { useNavigate } from "react-router-dom";
import GetQuiz from './GetQuiz'
import ShowQuiz from './ShowQuiz'
import CreateQuiz from './CreateQuiz'




function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: 'signUp',
      element: <SignUp/>
    },{
      path: 'createQuestion',
      element: <CreateQuiz/>
    }
  ])


  
  

  return (
    <div>
       <RouterProvider router={ router }/>

    </div>
  )
}

export default App
