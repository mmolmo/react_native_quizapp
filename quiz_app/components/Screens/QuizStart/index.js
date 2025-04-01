import React from 'react';

import { SafeAreaView, Text } from 'react-native';

import styles from '../../../styles'; // Assuming styles are in a separate file

import { useNavigation } from '@react-navigation/native';

import { Button, Icon } from '@rneui/themed';

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
//   const renderItem = ({ item }) => (
//     <ExerciseNavCard
//       key={item.key} // Ensure unique key
//       exercise={item}
//       allExercises={exerciseData}
//     />
//   );

const navigation = useNavigation();

const startingQuestion = quizData[0];

handleNavigateQuizQuestion = () => {
    console.log(startingQuestion);
    navigation.navigate('QuizQuestion', { currentQuestion: startingQuestion, quizData: quizData, key: startingQuestion.id });
}

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: '#black', fontSize: 32, fontWeight: 'bold' }}>
        Quizzzzz
      </Text>
      <Text style={{ color: '#B0B0B0', fontSize: 16, marginTop: 8 }}>
        Let's get started!
      </Text>
      <Button onPress={handleNavigateQuizQuestion} quizData={quizData} style={{ marginTop: 20 }}>
        Start the quiz! 
        <Icon name='arrow-right' type='font-awesome' color='#000000' />
      </Button>
    </SafeAreaView>
  );
}