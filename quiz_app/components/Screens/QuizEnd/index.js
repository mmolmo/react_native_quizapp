import React from 'react';

import { View, SafeAreaView, Text, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Icon } from '@rneui/themed';

import styles from '../../../styles';

export default function QuizEnd() {

  const navigation = useNavigation();
  const route = useRoute();
  const { results, quizData } = route.params;

  // console.log("results", results);
  // console.log("data", quizData);

  const handleNavigateQuizStart = () => {
    navigation.navigate('QuizStart');
  }

  const totalQuestions = quizData.length;
  const correctAnswers = results.filter(result => result.correct).length;

  // console.log("correctAnswers", correctAnswers);

  const isChoiceCorrect = (question, choiceIndex) => {
    if (question.type === 'multiple-answer') {
      return question.correct.includes(choiceIndex);
    } else {
      return choiceIndex === question.correct;
    }
  };
  
  const renderQuestionItem = ({ item }) => (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.quizSummarySubtitle}>
        {item.prompt}
      </Text>
      {item.choices.map((choice, index) => {
        const correct = isChoiceCorrect(item, index);
        return (
          <Text
            key={index}
            style={correct ? styles.summaryCorrectQuestionText : styles.summaryQuestionText}
          >
            {choice}
          </Text>
        );
      })}
    </View>
  );
  const buttonColor = styles.button.color || 'defaultColor';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Summary
      </Text>
      <Text style={styles.title}>
        Score: {correctAnswers}/{totalQuestions}
      </Text>
      <Text style={styles.questionTitle}>
        Results here
      </Text>
      <FlatList
        data={quizData}
        renderItem={renderQuestionItem}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 8, width: '100%' }}
      />
      <Button onPress={handleNavigateQuizStart} buttonStyle={styles.button}>
        Restart the quiz! 
        <Icon name='arrow-forward-outline' type='ionicon' color={buttonColor} />
      </Button>
    </SafeAreaView>
  );
}