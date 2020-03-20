import React from 'react';
import { Link } from 'react-router-dom';// import {モジュール名} from 'ファイルパス'
import QuizModel from '../../models/Quiz';
import Button from  '../Button/Button';
import './Quiz.css';

class Quiz extends React.Component{//クラス→オブジェクト指向
    constructor(props){
        super(props);

        this.state = {
            quizzes: [],
            currentIndex: 0,
            numberOfCorrects: 0
        };
    }

    async componentDidMount(){//renderメソッド実行、DOMを更新後に実行する
        await this.restart();
    }

    async restart(){
        this.setState({
            quizzes: [],
            currentIndex: 0,
            numberOfCorrects: 0//情報のリセット
        });

        const quizzes = await QuizModel.fetchAndCreateQuizzes();

        this.setState({ quizzes });
    }

    selectAnswer(quiz, answer){
        let { currentIndex, numberOfCorrects } = this.state;
        const isCorrect = quiz.judgeCorrectAnswer(answer);

        if (isCorrect){
            numberOfCorrects++;
            alert('Correct answer!!');
        }else{
            alert(`Wrong answer... (The correct answer is "${quiz.correctAnswer}")`);
        }
        currentIndex++;

        this.setState({
            currentIndex,
            numberOfCorrects
        });
    }

    render(){
        const { quizzes, currentIndex } = this.state;
        
        //読み込み中
        if( quizzes.length === 0){
            return this.renderLoading();
        }

        //クイズ中
        if(quizzes.length > 0 && currentIndex < quizzes.length){
            return this.renderQuiz();
        }

        if(quizzes.length > 0 && currentIndex >= quizzes.length){
            return this.renderResult();
        }
    }

    renderLoading(){
        return (
            <div>
                <h1>クイズページ</h1>
                <p>Now loading...</p>
                <hr/>
              　<Link to="/">トップページへ</Link>
            </div>//toに移動先のURLをセット
        );
    }

    renderQuiz(){
        const {currentIndex, quizzes } = this.state;

        const quiz = quizzes[currentIndex];
        const answers = quiz.shuffleAnswers().map((answer, index) => {
            return (//keyの値を入力しないと警告される
                <li key={index}>
                    <Button
                      onClickHandler = {() => {this.selectAnswer(quiz, answer) }}
                    >
                        {answer}
                    </Button>
                </li>
            );//thisは自分自身の参照→この場合、this===answers
        });//map→新しい配列の生成

        return (
            <div>
                <h1>クイズページ</h1>
                <div>
                    <p>{quiz.question}</p>
                    <ul className = "QuizList">{answers}</ul>
                </div>
                <hr/>
                　<Link to="/">トップページへ</Link>
            </div>
        );
    }

    renderResult(){
        const { quizzes, numberOfCorrects } = this.state;

        return (
            <div>
                <h1>クイズページ</h1>
                <div>
                    <p id="result">{`${numberOfCorrects}/${quizzes.length}corrects.`}</p>
                    <Button
                      onClickHandler={() => {this.restart()}}
                      >
                    　Restart
                    </Button>
                </div>
                <hr/>
                <Link to="/">トップページへ</Link>
            </div>
        )
    }
}


export default Quiz;