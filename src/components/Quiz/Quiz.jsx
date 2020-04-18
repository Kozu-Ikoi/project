import React from 'react';//Reactのコンポーネント（部品）、Quizページの動作
import { Link } from 'react-router-dom';// import {モジュール名} from 'ファイルパス'
import { connect } from 'react-redux';//quizコンポーネントと連携する
import Button from  '../Button/Button';
import { fetchQuizzes }from '../../actions/quizActionCreator';
import './Quiz.css';

class Quiz extends React.Component{//クラス→オブジェクト指向
    constructor(props){
        super(props);

        this.state = {//stateのクイズではなく、reduxで管理しているquizReducerのquizzesを使うようにしたいので定義していない
            currentIndex: 0,
            numberOfCorrects: 0
        };
    }

　　 componentDidMount(){//renderメソッド実行、DOMを更新後に実行する
    　　 this.restart();
    }

　　 restart(){
        this.setState({
            currentIndex: 0,
            numberOfCorrects: 0//情報のリセット
        });
        this.props.fetchQuizzes();//props経由でコンテナーから受け取った。このクイズの情報を活用していく
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
        const { quizzes } = this.props.quizInfo;//props経由で受け取ったquizInfoを使う
        const { currentIndex } = this.state;
        
        //読み込み中
        if( quizzes.length === 0){
            return this.renderLoading();
        }

        //クイズ中
        if(quizzes.length > 0 && currentIndex < quizzes.length){
            return this.renderQuiz();
        }

        //クイズ結果
        if(quizzes.length > 0 && currentIndex >= quizzes.length){
            return this.renderResult();
        }
    }

    renderLoading(){//読み込み中のメソッド
        return (
            <div>
                <h1>クイズページ</h1>
                <p>Now loading...</p>
                <hr/>
              　<Link to="/">トップページへ</Link>
            </div>//toに移動先のURLをセット
        );
    }

    renderQuiz(){//出題クイズを実装する
        const {currentIndex } = this.state;
        const { quizzes } = this.props.quizInfo;//props経由で受け取ったquizInfoを使う
        const quiz = quizzes[currentIndex];
        const answers = quiz.shuffleAnswers().map((answer, index) => {//シャッフルしたクイズを配列していく
            return (//keyの値を入力しないと警告される
                <li key={index}>
                    <Button
                      onClickHandler = {() => {this.selectAnswer(quiz, answer) }}//正解か不正解かを実行する
                    >
                        {answer}
                    </Button>
                </li>
            );//thisは自分自身の参照→この場合、this===answers
        });//map→新しい配列の生成

        return (//クイズの回答一覧、quiz.questionは問題文
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
        const { numberOfCorrects } = this.state;
        const { quizzes } = this.props.quizInfo;//props経由で受け取ったquizInfoを使う

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

const mapStateToProps = (state) => {
    return{
        quizInfo: state.quizInfo,
    };//quizInfoプロパティで返す
};

const mapDispatchToProps = {//quizActionCreatorをimportしてきた
    fetchQuizzes
};

/*
const mapDispatchToProps = (dispatch)=>{
    return{
        fetchQuizzes: ()=>{
            dispatch( fetchQuizzes());
        }
    }
}

*/

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);