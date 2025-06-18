import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { useGetQuestionQuery } from '../../generated/graphql';
import { useCountdown } from '../../components/useCountdown';
import {
  CircularProgress,
  CircularProgressLabel,
  Button,
  Heading,
  VStack,
  Text,
  Image,
  HStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useCorrectQuestionsMutation } from '../../generated/graphql';

interface Answer {
  acteur: string;
  film: string;
  isFilmChoice: boolean;
}
const Play: NextPage = () => {
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameOver'>('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const seconds = useCountdown(60);
  const [{ data }] = useGetQuestionQuery();
  const [, correctQuestions] = useCorrectQuestionsMutation();
  const [answersData, setAnswersData] = useState<Answer[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedHighScore = sessionStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('highScore', highScore.toString());
  }, [highScore]);

  const handleSubmit = async () => {
    const result = await correctQuestions({ answers: answersData });
    const correctAnswers = result.data?.correctQuestions.filter((item) => item === true);
    if (correctAnswers) {
      setScore(correctAnswers.length);
    }
  };

  useEffect(() => {
    if (seconds === 0 && gameState === 'playing') {
      setGameState('gameOver');
      handleSubmit();
    }
  }, [seconds, gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = async (answer: boolean) => {
    if (!data?.getQuestion || currentQuestionIndex >= data.getQuestion.length) return;
    const currentQuestion = data.getQuestion[currentQuestionIndex];
    const answers = [
      {
        acteur: currentQuestion.acteur,
        film: currentQuestion.film,
        isFilmChoice: answer,
      },
    ];
    setAnswersData([...answersData, ...answers]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const replayGame = () => {
    startGame();
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState('waiting');
    router.back();
  };

  // Initial screen
  if (gameState === 'waiting') {
    return (
      <Layout>
        <VStack spacing={8} align="center">
          <Heading>Ze Movie Quizz</Heading>
          <Text fontSize="xl">Test your movie knowledge! Was this actor in this film?</Text>
          <Button colorScheme="blue" size="lg" onClick={startGame}>
            Play
          </Button>
        </VStack>
      </Layout>
    );
  }

  // Game over screen
  if (gameState === 'gameOver') {
    return (
      <Layout>
        <VStack spacing={8} align="center">
          <Heading>Game Over!</Heading>
          <Text fontSize="2xl">Your Score: {score}</Text>
          <Text fontSize="xl">High Score: {highScore}</Text>
          <Button colorScheme="blue" size="lg" onClick={replayGame}>
            Play Again
          </Button>
        </VStack>
      </Layout>
    );
  }

  // Render loading state
  if (!data?.getQuestion) {
    return (
      <Layout>
        <VStack spacing={8} align="center">
          <Heading>Ze Movie Quizz</Heading>
          <Text>Loading questions...</Text>
        </VStack>
      </Layout>
    );
  }

  // Render gameplay
  const currentQuestion = data.getQuestion[currentQuestionIndex % data.getQuestion.length];

  return (
    <Layout>
      <VStack spacing={8} align="center">
        <Heading>Ze Movie Quizz</Heading>
        <CircularProgress value={seconds} size="100px" color="green.200" max={60}>
          <CircularProgressLabel>{seconds}</CircularProgressLabel>
        </CircularProgress>
        <Text fontSize="xl">Score: {score}</Text>
        <VStack spacing={4} align="center">
          <Image
            src={currentQuestion.filmImage}
            alt="Movie Poster"
            boxSize="200px"
            objectFit="cover"
            borderRadius="md"
          />
          <Heading fontSize="2xl" fontWeight="bold">
            Did {currentQuestion.acteur} star in {currentQuestion.film}?
          </Heading>
        </VStack>
        <Formik initialValues={{ answers: {} as Answer }} onSubmit={() => {}}>
          {({ isSubmitting }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <HStack spacing={4}>
                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={() => handleAnswer(true)}
                  isDisabled={isSubmitting}
                >
                  Yes
                </Button>
                <Button
                  colorScheme="red"
                  size="lg"
                  onClick={() => handleAnswer(false)}
                  isDisabled={isSubmitting}
                >
                  No
                </Button>
              </HStack>
            </Form>
          )}
        </Formik>
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Play);
