import React from 'react';

import { View, SafeAreaView, Text, FlatList } from 'react-native';

import styles from '../../../styles'; // Assuming styles are in a separate file

import { useNavigation, useRoute } from '@react-navigation/native';

import { Button, Icon } from '@rneui/themed';

export default function QuizEnd() {

    const navigation = useNavigation();
    const route = useRoute();
    const { results, quizData } = route.params;

    console.log("results", results);
    console.log("data", quizData);

    handleNavigateQuizStart = () => {
        navigation.navigate('QuizStart');
    }

    const totalQuestions = quizData.length;
    const correctAnswers = results.filter(result => result.correct).length;

    const score = correctAnswers;

    console.log("score", score);
    console.log("correctAnswers", correctAnswers);

    const isChoiceCorrect = (question, choiceIndex) => {
        if (question.type === 'multiple-answer') {
          return question.correct.includes(choiceIndex);
        } else {
          return choiceIndex === question.correct;
        }
    };
    
    const renderQuestionItem = ({ item }) => (
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 8, textAlign: 'center' }}>
            {item.prompt}
          </Text>
          {item.choices.map((choice, index) => {
            const correct = isChoiceCorrect(item, index);
            return (
              <Text
                key={index}
                style={{
                  color: correct ? 'green' : '#B0B0B0',
                  fontSize: 14,
                  marginLeft: 8,
                  marginTop: 4,
                  textAlign: 'center',
                }}
              >
                {choice}
              </Text>
            );
          })}
        </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: '#black', fontSize: 32, fontWeight: 'bold' }}>
        Summary
      </Text>
      <Text style={{ color: '#black', fontSize: 32, fontWeight: 'bold' }}>
        Score: {correctAnswers}/{totalQuestions}
      </Text>
      <Text style={{ color: '#black', fontSize: 16, marginTop: 8 }}>
        Results here
      </Text>
      <FlatList
        data={quizData}
        renderItem={renderQuestionItem}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 8, width: '100%' }}
      />
      <Button onPress={handleNavigateQuizStart} style={{ marginTop: 20 }}>
        Start the quiz! 
        <Icon name='arrow-right' type='font-awesome' color='#000000' />
      </Button>
    </SafeAreaView>
  );
}