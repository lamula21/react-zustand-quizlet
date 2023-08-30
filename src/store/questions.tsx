// zustand store
import { create } from 'zustand'
import { type Question } from '../types/types'
import confetti from 'canvas-confetti'
// captures all changes from store then sync to local-storage, or session-storage, etc
import { persist } from 'zustand/middleware' // local-storage
import { fetchAllQuestions } from '../services/fetchQuestions'

// describes state types
interface State {
	questions: Question[]
	currentQuestion: number
	fetchQuestions: (limit: number) => Promise<void>
	selectAnswer: (questionId: number, answerIndex: number) => void
	goNextQuestion: () => void
	goPreviousQuestion: () => void
	reset: () => void
}

export const useQuestionsStore = create<State>()(
	persist(
		(set, get) => {
			// callback, must return the global state/store (an object)
			// the object must contain: global state, and the function to updates the global state
			return {
				questions: [], // global state 1
				currentQuestion: 0, // global state 2, array pos of questions[]

				// function to update the global state
				fetchQuestions: async (limit: number) => {
					const json = await fetchAllQuestions()

					const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
					set({ questions })
				},

				selectAnswer: (questionId: number, answerIndex: number) => {
					const { questions } = get() // get() accesses global states from store

					// structure clone: deep copy object
					const newQuestion = structuredClone(questions) // cloning all questions
					// find question index
					const questionIndex = newQuestion.findIndex(
						(q) => q.id === questionId
					)
					// obtain question information
					const questionInfo = newQuestion[questionIndex]
					// ascertain if user selected correct answer
					const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
					if (isCorrectUserAnswer) confetti()
					// take changes into the question clone
					newQuestion[questionIndex] = {
						...questionInfo,
						isCorrectUserAnswer,
						userSelectedAnswer: answerIndex,
					}
					// update the state
					set({ questions: newQuestion })
				},

				// pagination forwards
				goNextQuestion: () => {
					const { currentQuestion, questions } = get()
					const nextQuestion = currentQuestion + 1

					if (nextQuestion < questions.length) {
						set({ currentQuestion: nextQuestion })
					}
				},
				// pagination backwards
				goPreviousQuestion: () => {
					const { currentQuestion } = get()
					const previousQuestion = currentQuestion - 1

					if (previousQuestion >= 0) {
						set({ currentQuestion: previousQuestion })
					}
				},

				reset: () => {
					set({ currentQuestion: 0, questions: [] })
				},
			}
		},
		{
			// by default, this is stored in local-storage
			name: 'questions',
			// could add other storage here
		}
	)
)
