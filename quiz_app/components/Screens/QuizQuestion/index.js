import {useState, React} from 'react';

import { SafeAreaView, Text, FlatList } from 'react-native';

import styles from '../../../styles'; // Assuming styles are in a separate file

import { useNavigation, useRoute } from '@react-navigation/native';

import { Button, Icon } from '@rneui/themed';

export default function QuizQuestion() {
//   const renderItem = ({ item }) => (
//     <ExerciseNavCard
//       key={item.key} // Ensure unique key
//       exercise={item}
//       allExercises={exerciseData}
//     />
//   );

const navigation = useNavigation();

const route = useRoute();
const { currentQuestion, quizData, key } = route.params;

// console.log(currentQuestion);
// console.log(quizData);
// console.log(key);


const [selectedAnswers, setSelectedAnswers] = useState([]);
const [correctAnswers, setCorrectAnswers] = useState([]);

const handleSelectQuestion = (item) => {
    console.log("Selected:", item);
    console.log("Selected Answers:", selectedAnswers);

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
    // Normalize correct answers into an array
    const correctAnswersArray = Array.isArray(currentQuestion.correct)
        ? currentQuestion.correct
        : [currentQuestion.correct];
    
    // Convert selected answer strings to their indices
    const selectedIndices = selectedAnswers.map(answer => 
        currentQuestion.choices.indexOf(answer)
    );

    console.log("Selected Indices:", selectedIndices);
    // Check if lengths match and all correct indices are selected
    const isCorrect = 
        correctAnswersArray.length === selectedIndices.length &&
        correctAnswersArray.every(index => selectedIndices.includes(index));
    console.log("Is correct:", isCorrect);
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
            key={item.key} // Ensure unique key
            title={item}
            onPress={() => handleSelectQuestion(item)}
            buttonStyle={{
                backgroundColor: isSelected ? "blue" : "gray", // Change color based on selection
                padding: 10,
            }}
        />
    );
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: '#black', fontSize: 32, fontWeight: 'bold' }}>
        Quiz {key}
      </Text>
      <Text style={{ color: '#black', fontSize: 16, marginTop: 8 }}>
        {currentQuestion.prompt}
      </Text>
      <FlatList 
        data={currentQuestion.choices}
        renderItem={renderItem}
      />
      <Button onPress={handleNavigateNextQuestion} quizData={quizData} style={{ marginTop: 20 }}>
        Next Question!
        <Icon name='arrow-right' type='font-awesome' color='#000000' />
      </Button>
    </SafeAreaView>
  );
}