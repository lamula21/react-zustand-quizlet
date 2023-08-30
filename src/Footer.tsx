//import { useQuestionsStore } from './store/questions'
// custome hook: extract some logic.
// this works because all variables are accessed from a store
// this hook can be used in any component
// const useQuestionsData = () => {
// 	const questions = useQuestionsStore((state) => state.questions)
// 	let correct = 0
// 	let incorrect = 0
// 	let unanswered = 0
// 	// traverse thru questions and populate correct, incorrect, unanswered
// 	questions.forEach((question) => {
// 		const { userSelectedAnswer, correctAnswer } = question
// 		if (question.userSelectedAnswer == null) unanswered++
// 		else if (userSelectedAnswer === correctAnswer) correct++
// 		else incorrect++
// 	})

// 	return { correct, incorrect, unanswered }
// }

import { Button } from '@mui/material'
import { useQuestionsData } from './hooks/useQuestionData'
import { useQuestionsStore } from './store/questions'

export function Footer() {
	const { correct, incorrect, unanswered } = useQuestionsData()
	const reset = useQuestionsStore((state) => state.reset)

	return (
		<footer style={{ marginTop: '16px' }}>
			<strong>{`✅ ${correct} correct - ❌ ${incorrect} incorrect - ❓${unanswered} no response`}</strong>
			<div style={{ marginTop: '16px' }}>
				<Button onClick={() => reset()}>Reset Quiz</Button>
			</div>
		</footer>
	)
}
