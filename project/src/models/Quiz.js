import _ from 'lodash';
import he from 'he';
import QuizFetcher from '../data_fetchers/QuizFetcher';

class Quiz{
    constructor({question, correctAnswer, incorrectAnswers}){

        this._question = question;
        this._correctAnswer = correctAnswer;
        this._incorrectAnswers = [...incorrectAnswers];//_は外からアクセスしてはならないプライベートな値として使われる
    }

    get question(){
        return this._question;
    }//getterキーワードを使って、_〇〇を外部へ返す

    get correctAnswer(){
        return this._correctAnswer;
    }

    shuffleAnswers(){
        return _.shuffle([
            this._correctAnswer,
            ...this._incorrectAnswers
        ]);
    }// _.shuffleで引数に渡された配列がシャッフルされる、lodashライブラリをインストールしないとダメ、lodashを_に置き換えた

    judgeCorrectAnswer(answer){//こっちはインスタンスメソッド
        return answer === this._correctAnswer;
    }

    static async fetchAndCreateQuizzes(){//クラスメソッドの前にstaticが先頭に付く、クラス経由で実行するから特有の値は持たない（ひな形のみ）
        const quizDataList = await QuizFetcher.fetch();

        return quizDataList.results.map(result =>{
            return{//heライブラリ→he.decodeによって特殊文字を読める文字にする
                question: he.decode(result.question),
                correctAnswer: he.decode(result.correct_answer),
                incorrectAnswers: result.incorrect_answers.map(str => he.decode(str))
            };
        })
        .map(quizData =>{
            return new Quiz(quizData);
        })
    }
}

export default Quiz;