import {useState, React} from 'react';

import { SafeAreaView, Text, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Icon } from '@rneui/themed';

import styles from '../../../styles';

export default function QuizQuestion() {

  const navigation = useNavigation();

  const route = useRoute();
  const { currentQuestion, quizData, key } = route.params;

  // console.log(currentQuestion);
  // console.log(quizData);
  // console.log(key);

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const handleSelectQuestion = (item) => {
    // console.log("Selected:", item);
    // console.log("Selected Answers:", selectedAnswers);

    setSelectedAnswers((prev) => {
      if (prev.includes(item)) {
        // Deselect if already selected
        return prev.filter(ans => ans !== item);
      } else {
        // Select new item
        return [...prev, item];
      }
    });
  };

  const checkAnswers = () => {
    // send correct answers into an array
    const correctAnswersArray = Array.isArray(currentQuestion.correct)
      ? currentQuestion.correct
      : [currentQuestion.correct];
    
    // convert selected answer to indexes
    const selectedIndices = selectedAnswers.map(answer => 
      currentQuestion.choices.indexOf(answer)
    );

    // console.log("Selected Indices:", selectedIndices);
    // check if lengths match and all correct indices selected
    const isCorrect = 
      correctAnswersArray.length === selectedIndices.length &&
      correctAnswersArray.every(index => selectedIndices.includes(index));
      // console.log("Is correct:", isCorrect);
    return isCorrect;
  };


  const handleNavigateNextQuestion = () => {
    const isCurrentCorrect = checkAnswers();
    const updatedResults = [
      ...correctAnswers, 
      { questionId: currentQuestion.id, correct: isCurrentCorrect }
    ];
    
    const currentIndex = quizData.findIndex(q => q.id === currentQuestion.id);
    
    if (currentIndex >= quizData.length - 1) {
      navigation.navigate('QuizEnd', {
        results: updatedResults,
        quizData: quizData
      });
    } else {
      const nextQuestion = quizData[currentIndex + 1];
      setSelectedAnswers([]);
      setCorrectAnswers(updatedResults);
      
      navigation.navigate('QuizQuestion', {
        currentQuestion: nextQuestion,
        quizData: quizData,
        key: nextQuestion.id
      });
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedAnswers.includes(item);

    return (
      <Button
        key={item.key} 
        title={item}
        onPress={() => handleSelectQuestion(item)}
        type = {isSelected ? 'outline' : 'solid'}
        titleStyle={isSelected ? styles.selectedQuestionButtonTitle : styles.QuestionButtonTitle}
        buttonStyle={isSelected ? styles.selectedQuestionButton : styles.QuestionButton}
      />
    );
  };

  const buttonColor = styles.button.color || 'defaultColor';
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Quiz {key}
      </Text>
      <Text style={styles.questionTitle}>
        {currentQuestion.prompt}
      </Text>
      <FlatList 
        data={currentQuestion.choices}
        renderItem={renderItem}
      />
      <Button onPress={handleNavigateNextQuestion} quizData={quizData} buttonStyle={styles.button}>
        Next Question!
        <Icon name='arrow-forward-outline' type='ionicon' color={buttonColor} />
      </Button>
    </SafeAreaView>
  );
}