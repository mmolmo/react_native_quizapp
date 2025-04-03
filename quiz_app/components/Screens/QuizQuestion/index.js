import {useState, React} from 'react';

import { SafeAreaView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Icon, ButtonGroup } from '@rneui/themed';

import styles from '../../../styles';

export default function QuizQuestion() {

  const navigation = useNavigation();

  const route = useRoute();
  const { currentQuestion, quizData, key, answerHistory } = route.params;

  // console.log(currentQuestion);
  // console.log(quizData);
  // console.log(key);

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [history, setHistory] = useState(answerHistory || []);

  const isMultiSelect = currentQuestion.type === 'multiple-answer';

  console.log(isMultiSelect);

  const [correctAnswers, setCorrectAnswers] = useState([]);

  let selectedArray = Array.isArray(selectedIndexes)
    ? [...selectedIndexes]
    : [selectedIndexes];

  const checkAnswers = () => {
    const correctAnswersArray = Array.isArray(currentQuestion.correct)
    ? currentQuestion.correct
    : [currentQuestion.correct];
    
    console.log("selected array:", selectedArray);
    console.log("correct answers", correctAnswersArray);
    
    const isCorrect =
      correctAnswersArray.length === selectedArray.length &&
      correctAnswersArray.every(index => selectedArray.includes(index));
      
      console.log("Is correct:", isCorrect);
      return isCorrect;
  };

  const handleNavigateNextQuestion = () => {
    console.log("navgiating");
    // const isCurrentCorrect = checkAnswers();
    const updatedHistory = [
      ...history,
      { questionId: currentQuestion.id, selected: selectedArray, correct: checkAnswers(), correctAnswers:currentQuestion.correct, }
    ];

    const currentIndex = quizData.findIndex(q => q.id === currentQuestion.id);

    if (currentIndex >= quizData.length - 1) {
      navigation.navigate('QuizEnd', {
        results: updatedHistory,
        quizData: quizData,
      });
    } else {
      const nextQuestion = quizData[currentIndex + 1];
      setSelectedIndexes([]);
      setHistory(updatedHistory);
      console.log("updated history:", updatedHistory);
      
      console.log("navgating to new page");
      navigation.navigate('QuizQuestion', {
        currentQuestion: nextQuestion,
        quizData: quizData,
        key: nextQuestion.id,
        answerHistory: updatedHistory,
      });
    }
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
      {/* <FlatList 
        data={currentQuestion.choices}
        renderItem={renderItem}
      /> */}
      <ButtonGroup
        buttons={currentQuestion.choices}
        // isMultiSelect = {true ? selectMultiple : false}
        selectMultiple={isMultiSelect}
        vertical={true}
        selectedIndexes={isMultiSelect ? selectedIndexes : [selectedIndexes]} 
        onPress={(value) => {
          setSelectedIndexes(value);
          console.log(selectedIndexes);
        }}
        containerStyle={{ marginBottom: 20, }}
        buttonStyle={styles.QuestionButton}
        buttonContainerStyle={styles.QuestionButtonContainer}
        // selectedButtonStyle={styles.selectedQuestionButton}
      />
      <Button testID="next-question" onPress={handleNavigateNextQuestion} quizData={quizData} buttonStyle={styles.button}>
        Next Question!
        <Icon name='arrow-forward-outline' type='ionicon' color={buttonColor} />
      </Button>
    </SafeAreaView>
  );
}