import { Category, EasyTriviaUtil, Question } from "easy-trivia";
import { CustomQuestion } from "../Typings/interfaces";

/**
 * Takes an array of custom questions and parses them to be trivia game ready.
 * @param {CustomQuestion[]} questions - The custom questions.
 * @returns {Question[]} The parsed questions.
 */
export default function prepareCustomQuestions(
  questions: CustomQuestion[]
): Question[] {
  return questions.map((q) => {
    const { value, difficulty, correctAnswer, incorrectAnswers, category } = q;
    const parsedQuestion: Question = {
      value,
      category: Category.strictToPrettyName(category || "GENERAL_KNOWLEDGE")!,
      type: incorrectAnswers.length == 1 ? "boolean" : "multiple",
      difficulty: difficulty || "medium",
      correctAnswer,
      incorrectAnswers,
      allAnswers: EasyTriviaUtil.shuffleArray([
        correctAnswer,
        ...incorrectAnswers,
      ]),
      checkAnswer: (arg: string) => {
        return arg.toLowerCase() == correctAnswer.toLowerCase();
      },
    };

    return parsedQuestion;
  });
}
