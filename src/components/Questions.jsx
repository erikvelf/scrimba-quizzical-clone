import { nanoid } from 'nanoid';
import React from 'react';
import Question from './Question';
import { Score } from './Score';
import Loader from './Loader';

function shuffleAnswers(answers) {
    // providing a number N to sort() will make that element the order N in the sorted array
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    return (shuffledAnswers)
}

const transformFetchedData = (data) => data?.results? data.results.map((questionData, index) => ({
    // inserting the questions data and the id to find it in the state
    ...questionData,
    answers: shuffleAnswers([...questionData.incorrect_answers, questionData.correct_answer]),
    order: index,
    isSelected: false,
    id: nanoid()
})) : undefined


const colors = {
    wrong: "#f4dadd",
    right: "#94d7a2",
    selected: "#d6daf4"
}

const APIUrl = "https://opentdb.com/api.php?amount=5&type=multiple"


export const Questions = ({checkAnswers, setCheckAnswers, isQuestionsEmpty, setIsQuestionsEmpty}) => {
    // Taking the data from the API
    const [questionsData, setQuestionsData] = React.useState([])
    let score = 0
    
	const controller = new AbortController()

	function getQuestions(APIUrl) {
        fetch(APIUrl)
        .then(response => response.json())
        .then(transformFetchedData)
        .then(data => {
            return data
        })
        .then(transformedData => {
            setQuestionsData(transformedData)
            setCheckAnswers(false)
        })
        .catch(error => console.error('Error:', error));
    }

	React.useEffect(() => {
        setTimeout(() => {
        if (isQuestionsEmpty) {
            setIsQuestionsEmpty(false)
            getQuestions(APIUrl)
        }}, 5000)

	return () => controller.abort()
	}, [isQuestionsEmpty])

    if (checkAnswers) {
        for (let i = 0; i < Object.keys(questionsData).length; i++) {
            if (questionsData[i].selectedAnswer === questionsData[i].correct_answer) [
                score += 1
            ]
        }
    }
    

    return questionsData.length > 0 ? (
        <>
            {questionsData.map(questionData => <Question 
                key={nanoid()} 
                questionData={questionData}
                updateAnswers={setQuestionsData}
                checkAnswers={checkAnswers}
                colors={colors}
            />)}

            <div>
                {checkAnswers && <Score score={score} numberOfQuestions={questionsData.length} />}
            
            </div>

        </>
    ) : <Loader />
}