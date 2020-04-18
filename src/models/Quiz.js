import _ from 'lodash';//何のクイズを管理しているか、管理データをどのように操作するかのデータの管理
import he from 'he';
import QuizFetcher from '../data_fetchers/QuizFetcher';//データを読み込む用

class Quiz{
    constructor({question, correctAnswer, incorrectAnswers}){//{}はオブジェクトを受け取るという意味{question}→questionプロパティを受け取る

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
        const quizDataList = await QuizFetcher.fetch();//API取得データ

       return Quiz.createQuizInstancesWithData(quizDataList.results);
        /*
        return quizDataList.results.map(result =>{//配列の生成
            return{//heライブラリ→he.decodeによって特殊文字を読める文字にする
                question: he.decode(result.question),
                correctAnswer: he.decode(result.correct_answer),
                incorrectAnswers: result.incorrect_answers.map(str => he.decode(str))
            };
        })
        .map(quizData =>{//quizDataListが入ってくる
            return new Quiz(quizData);
        })
        */
    }

    static createQuizInstancesWithData(quizDataList){//引数経由でクイズデータを受け取っている
        return quizDataList.map(quizData => {
            return{
            question: he.decode(quizData.question),
            correctAnswer: he.decode(quizData.correct_answer),
            incorrectAnswers: quizData.incorrect_answers.map(str => he.decode(str))
         };
        })
        .map(quizData => {//クイズインスタンスに格納する
            return new Quiz(quizData);
        })
    }
}

export default Quiz;