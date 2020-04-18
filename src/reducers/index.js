import { combineReducers }from 'redux';
import { quizReducer }from './quizReducer';

export default combineReducers({
    quizInfo: quizReducer
});//プロパティ名はquizInfoとした