import React from 'react';

import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from '@rneui/themed';

import styles from '../../../styles';

const quizData = [
    {
      "prompt": "This is the question...",
    "type": "multiple-choice",
    "choices": [
      "choice 1",
      "choice 2",
      "choice 3",
      "choice 4",
    ],
    "correct": 0,
    id: "question1",
  },
    {
      "prompt": "This is another question...",
    "type": "multiple-answer",
    "choices": [
      "choice 1",
      "choice 2",
      "choice 3",
      "choice 4",
    ],
    "correct": [0,2],
    id: "question2",
  },
    {
    "prompt": "This is the third question...",
    "type": "true-false",
    "choices": [
      "choice 1",
      "choice 2",
    ],
    "correct": 1,
    id: "question3",
  },
  ]

export default function QuizStart() {

  const navigation = useNavigation();

  const startingQuestion = quizData[0];

  const handleNavigateQuizQuestion = () => {
    console.log(startingQuestion);
    navigation.navigate('QuizQuestion', { currentQuestion: startingQuestion, quizData: quizData, key: startingQuestion.id });
  }
  const buttonColor = styles.button.color || 'defaultColor';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Home
      </Text>
      <Text style={styles.questionTitle}>
        Let's get started!
      </Text>
      <Button onPress={handleNavigateQuizQuestion} quizData={quizData} buttonStyle={styles.button}>
        Start the quiz! 
        <Icon name='arrow-forward-outline' type='ionicon' color={buttonColor} />
      </Button>
    </SafeAreaView>
  );
}