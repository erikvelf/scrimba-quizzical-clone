import React from 'react';
import './App.css'

import { Start } from './components/Start';
import { Questions } from './components/Questions';



function App() {
	const [isQuestionsEmpty, setIsQuestionsEmpty] = React.useState(true)
	const [isQuizStarted, setIsQuizStarted] = React.useState(false)
	const [checkAnswers, setCheckAnswers] = React.useState(false)

	const startQuiz = () => setIsQuizStarted(true)

	const handleClick = () => {
		if (!checkAnswers) {
			setCheckAnswers(!checkAnswers)
			console.log("handleClick: check answers toggled")
		} else {
			if (isInCooldown) {
				console.log("wait a little to get new questions!")
			} else {
				setIsQuestionsEmpty(true)
				console.log("handleClick: questions are empty")
			}
		}
	}

	return isQuizStarted ? <main>
		<Questions checkAnswers={checkAnswers} setCheckAnswers={setCheckAnswers}
		 isQuestionsEmpty={isQuestionsEmpty} setIsQuestionsEmpty={setIsQuestionsEmpty}/>

		{!isQuestionsEmpty && <button id="check-answers-button" onClick={handleClick}>
			{!checkAnswers? "Check answers" : "Play again"}
		</button>}

		{!checkAnswers && !isQuestionsEmpty && <button id="get-new-questions-button" onClick={() => setIsQuestionsEmpty(true)}>
			Get new questions 
		</button>
		}
	</main>
	: <Start onStart={startQuiz}/>
}

export default App
