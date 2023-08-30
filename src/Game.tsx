import {
	Card,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types/types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {
	ArrowBackIos,
	ArrowBackIosNew,
	ArrowForwardIos,
} from '@mui/icons-material'
import { Footer } from './Footer'

// outside of function component, it's created once
// inside of function component, it's created in every rendering
// good practice for injecting testing
const getBackGroundColor = (info: QuestionType, index: number) => {
	const { userSelectedAnswer, correctAnswer } = info
	// user havent selected anything yet
	if (userSelectedAnswer == null) return 'transparent'
	// user selected and solution is incorrect
	if (index !== userSelectedAnswer && index !== correctAnswer)
		return 'transparent'
	// user selection is correct solution
	if (index === correctAnswer) return 'green'
	// user selection is incorrect
	if (index === userSelectedAnswer && index !== correctAnswer) return 'red'
	// none of the previous
	return 'transparent'
}

// each quesiton has
// - question
// - card
// - options
const Question = ({ info }: { info: QuestionType }) => {
	const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

	// A new way to pass function in props
	const createHandleClick = (answerIndex: number) => () => {
		selectAnswer(info.id, answerIndex)
	}
	// function createHandleClick(answerIndex: number) {
	// 	selectAnswer(info.id, answerIndex)
	// }

	return (
		<Card
			variant="outlined"
			sx={{
				textAlign: 'left',
				bgcolor: '#222',
				p: 2,
				marginTop: 4,
				borderRadius: 3,
			}}
		>
			<Typography variant="h5">{info.question}</Typography>

			<SyntaxHighlighter language="javascript" style={gradientDark}>
				{info.code}
			</SyntaxHighlighter>

			<List sx={{ bgcolor: '#333', textAlign: 'center' }} disablePadding>
				{info.answers.map((answer, index) => (
					<ListItem key={index} disablePadding divider>
						<ListItemButton
							onClick={createHandleClick(index)}
							sx={{ backgroundColor: getBackGroundColor(info, index) }}
							disabled={info.userSelectedAnswer != null} // disabled options once user selects answer
						>
							<ListItemText primary={answer} sx={{ textAlign: 'center' }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Card>
	)
}

export default function Game() {
	const questions = useQuestionsStore((state) => state.questions)
	const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
	const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
	const goPreviousQuestion = useQuestionsStore(
		(state) => state.goPreviousQuestion
	)

	const questionInfo = questions[currentQuestion]

	return (
		<>
			<Stack
				direction="row"
				gap={2}
				alignItems="center"
				justifyContent="center"
			>
				<IconButton
					onClick={goPreviousQuestion}
					disabled={currentQuestion === 0}
				>
					<ArrowBackIosNew />
				</IconButton>
				{currentQuestion + 1} / {questions.length}
				<IconButton
					onClick={goNextQuestion}
					disabled={currentQuestion >= questions.length - 1}
				>
					<ArrowForwardIos />
				</IconButton>
			</Stack>

			<Question info={questionInfo} />

			<Footer />
		</>
	)
}
