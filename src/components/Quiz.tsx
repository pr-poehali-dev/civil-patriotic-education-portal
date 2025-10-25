import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  category: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'В каком году Юрий Гагарин совершил первый полёт в космос?',
    options: ['1957', '1961', '1969', '1975'],
    correctAnswer: 1,
    points: 50,
    category: 'Космонавтика'
  },
  {
    id: 2,
    question: 'Кто основал Санкт-Петербург?',
    options: ['Иван Грозный', 'Пётр I', 'Екатерина II', 'Александр I'],
    correctAnswer: 1,
    points: 50,
    category: 'История городов'
  },
  {
    id: 3,
    question: 'Какое сражение произошло в 1380 году?',
    options: ['Невская битва', 'Куликовская битва', 'Бородинское сражение', 'Полтавская битва'],
    correctAnswer: 1,
    points: 50,
    category: 'Военная история'
  },
  {
    id: 4,
    question: 'Кто написал роман "Война и мир"?',
    options: ['Фёдор Достоевский', 'Антон Чехов', 'Лев Толстой', 'Александр Пушкин'],
    correctAnswer: 2,
    points: 50,
    category: 'Литература'
  },
  {
    id: 5,
    question: 'В каком году была основана Москва?',
    options: ['1047', '1147', '1247', '1347'],
    correctAnswer: 1,
    points: 50,
    category: 'История городов'
  },
  {
    id: 6,
    question: 'Кто победил шведов в Невской битве?',
    options: ['Дмитрий Донской', 'Александр Невский', 'Владимир Мономах', 'Иван Калита'],
    correctAnswer: 1,
    points: 50,
    category: 'Военная история'
  },
  {
    id: 7,
    question: 'В каком году открылся МГУ?',
    options: ['1655', '1705', '1755', '1805'],
    correctAnswer: 2,
    points: 50,
    category: 'Наука'
  },
  {
    id: 8,
    question: 'Кто был первым российским императором?',
    options: ['Иван IV', 'Пётр I', 'Павел I', 'Александр I'],
    correctAnswer: 1,
    points: 50,
    category: 'Правители'
  }
];

interface QuizProps {
  onComplete: (score: number) => void;
}

const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === question.correctAnswer) {
      setScore(score + question.points);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onComplete(score + (selectedAnswer === question.correctAnswer ? question.points : 0));
    }
  };

  const getAnswerClassName = (index: number) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-primary/10 hover:border-primary border-2 border-muted';
    }

    if (index === question.correctAnswer) {
      return 'bg-green-100 border-2 border-green-500';
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'bg-red-100 border-2 border-red-500';
    }

    return 'bg-white border-2 border-muted opacity-50';
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Card className="p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="text-sm">
              {question.category}
            </Badge>
            <div className="flex items-center gap-2">
              <Icon name="Star" className="text-primary" size={20} />
              <span className="text-xl font-bold text-primary">{score}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Вопрос {currentQuestion + 1} из {quizQuestions.length}
            </span>
            <span className="text-sm font-semibold text-primary">
              {correctAnswers} правильных
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${getAnswerClassName(
                  index
                )} ${!isAnswered ? 'hover-scale cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isAnswered
                        ? index === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : index === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{option}</span>
                  {isAnswered && index === question.correctAnswer && (
                    <Icon name="Check" className="ml-auto text-green-500" size={24} />
                  )}
                  {isAnswered &&
                    index === selectedAnswer &&
                    index !== question.correctAnswer && (
                      <Icon name="X" className="ml-auto text-red-500" size={24} />
                    )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {isAnswered && (
          <div className="animate-scale-in">
            {selectedAnswer === question.correctAnswer ? (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <Icon name="Trophy" className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-green-700">
                      Правильно! 🎉
                    </div>
                    <div className="text-sm text-green-600">
                      +{question.points} баллов
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border-2 border-red-200 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                    <Icon name="X" className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-red-700">
                      Неправильно
                    </div>
                    <div className="text-sm text-red-600">
                      Правильный ответ: {question.options[question.correctAnswer]}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleNext}
              size="lg"
              className="w-full hover-scale"
            >
              {currentQuestion < quizQuestions.length - 1 ? (
                <>
                  Следующий вопрос
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </>
              ) : (
                <>
                  Завершить викторину
                  <Icon name="Flag" className="ml-2" size={20} />
                </>
              )}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Quiz;
