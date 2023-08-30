import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

const LIMIT_QUESTIONS = 10

export default function StartButton() {
	// get state from store
	const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions) // get the update function from store

	function handleClick() {
		fetchQuestions(LIMIT_QUESTIONS)
	}

	return (
		<Button onClick={handleClick} variant="contained">
			Start!
		</Button>
	)
}
