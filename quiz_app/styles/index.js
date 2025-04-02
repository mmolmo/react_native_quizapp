import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },
  text: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor:  "#2588e0",
    color: 'white',
    padding: 10,
    width: 160,
    marginBottom: 8,
    borderWidth: 2,
  },
  title: {
    color: '#black', 
    fontSize: 32, 
    fontWeight: 'bold'
  },
  questionTitle: {
    color: '#black', 
    fontSize: 16, 
    marginTop: 8 
  },
  quizSummarySubtitle: {
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#black', 
    marginBottom: 8, 
    textAlign: 'center'
  },
  selectedQuestionButton: {
    backgroundColor: "white",
    color: "#black",
    padding: 10,
    width: 160,
    marginBottom: 8,
    borderWidth: 2,
  },
  QuestionButton: {
    backgroundColor: "#2588e0",
    color: "white",
    padding: 10,
    width: 160,
    marginBottom: 8,
    borderWidth: 2,
  },
  selectedQuestionButtonTitle: {
    color: "black"
  },
  QuestionButtonTitle: {
    color: "white"
  },
  summaryQuestionText: {
    color: '#B0B0B0',
    fontSize: 14,
    marginLeft: 8,
    marginTop: 4,
    textAlign: 'center',
  },
  summaryCorrectQuestionText: {
    color: 'green',
    fontSize: 14,
    marginLeft: 8,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default styles;
