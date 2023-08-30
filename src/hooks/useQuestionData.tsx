import { useQuestionsStore } from '../store/questions'
// custome hook: extract some logic.
// this works because all variables are accessed from a store
// this hook can be used in any component
export const useQuestionsData = () => {
	const questions = useQuestionsStore((state) => state.questions)
	let correct = 0
	let incorrect = 0
	let unanswered = 0

	// traverse thru questions and populate correct, incorrect, unanswered
	questions.forEach((question) => {
		const { userSelectedAnswer, correctAnswer } = question
		if (question.userSelectedAnswer == null) unanswered++
		else if (userSelectedAnswer === correctAnswer) correct++
		else incorrect++
	})

	return { correct, incorrect, unanswered }
}
