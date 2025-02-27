import React from 'react';
import './App.css'

import { Start } from './components/Start';
import { Questions } from './components/Questions';
import { Score } from './components/Score';



function App() {
	const [isQuestionsEmpty, setIsQuestionsEmpty] = React.useState(true)
	const [isQuizStarted, setIsQuizStarted] = React.useState(false)
	const [checkAnswers, setCheckAnswers] = React.useState(false)

    const [questionsData, setQuestionsData] = React.useState([])
	const [score, setScore] = React.useState(0)

	const startQuiz = () => setIsQuizStarted(true)
	const getNewQuestions = () => {
		setIsQuestionsEmpty(true)
	}

	const handleClick = () => {
		if (!checkAnswers) {
			setCheckAnswers(!checkAnswers)
			console.log("handleClick: check answers toggled")
		} else {
			setIsQuizStarted(false)
			// TODO remove setIsQuestionsEmpty since we have questionsData up here in App
			setIsQuestionsEmpty(true)
			setQuestionsData([])
		}
	}

	return isQuizStarted ? <main>
		<Questions
			checkAnswers={checkAnswers}
			setCheckAnswers={setCheckAnswers}
			isQuestionsEmpty={isQuestionsEmpty}
			setIsQuestionsEmpty={setIsQuestionsEmpty}
			questionsData={questionsData}
			setQuestionsData={setQuestionsData}
			setScore={setScore}
		/>

		<div>
		{checkAnswers && questionsData.length > 0 && <Score score={score} numberOfQuestions={questionsData.length}/>}

		{!isQuestionsEmpty && <button id="check-answers-button" onClick={handleClick}>
			{!checkAnswers? "Check answers" : "Play again"}
		</button>}

		{!checkAnswers && !isQuestionsEmpty && <button id="get-new-questions-button" onClick={getNewQuestions}>
			Get new questions 
		</button>}
		</div>
	</main>
	: <Start onStart={startQuiz}/>
}

export default App
