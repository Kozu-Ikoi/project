import Quiz from '../../../src/models/Quiz';

const createMockQuiz = () => {
    return{
        question: 'クイズの問題',
        correctAnswer: '答え',
        incorrectAnswers: [
            '不正解1',
            '不正解2',
            '不正解3'
        ],
    }
};//オブジェクト

describe('Quizクラスのテスト', ()=>{//jest（テストフレームワーク）のdescribe,it機能
    it('importチェック',()=>{
        expect(typeof Quiz).toStrictEqual('function');//expect→実際の値、toStrictEqual→期待値
    });

    describe('インスタンスメソッド', ()=>{
        describe('constructor', ()=>{
            it('コンストラクタで渡した値をプロパティに保持する', ()=>{
                const quizData = createMockQuiz();//クイズのインスタンス作成時のダミーデータ
                const quiz = new Quiz(quizData);

                expect(quiz._question).toStrictEqual(quizData.question);
                expect(quiz._correctAnswer).toStrictEqual(quizData.correctAnswer);
                expect(quiz._incorrectAnswers).toStrictEqual(quizData.incorrectAnswers);
            });
        });
    });//テスト、itは比較・検証

    describe('getter', ()=>{
        it('questionとcorrectAnswerのgetterが使える', ()=>{
            const quizData = createMockQuiz();
            const quiz = new Quiz(quizData);

            expect( quiz.question ).toStrictEqual(quizData.question);
            expect( quiz.correctAnswer ).toStrictEqual(quizData.correctAnswer);
            expect( quiz.incorrectAnswer ).toStrictEqual(undefined);
        });
    });

    describe('shuffleメソッド', () => {
        it('シャッフルされる', () => {
            const quizData = createMockQuiz();
            const quiz = new Quiz(quizData);

            const shuffledAnswers1 = quiz.shuffleAnswers();
            const shuffledAnswers2 = quiz.shuffleAnswers();
            expect(shuffledAnswers1).not.toStrictEqual(shuffledAnswers2);
        });
    });

    describe('judgeCorrectAnswerメソッド', ()=>{
        it('引数の値が正解ならtrue, 不正解ならfalseが返る',()=>{
            const quizData = createMockQuiz();
            const quiz = new Quiz(quizData);//Quizクラス（ひな形）→Quizインスタンス（実体）の生成

            expect(quiz.judgeCorrectAnswer(quizData.correctAnswer))
             .toStrictEqual(true);

            quizData.incorrectAnswers.forEach(incorrectAnswer=>{
             expect(quiz.judgeCorrectAnswer(incorrectAnswer))
              .toStrictEqual(false);
            });
        });
    });

    describe('クラスメソッド',()=>{
        describe('fetchAndCreateQuizzesメソッド',()=>{
            it('10件のQuizインスタンスが返る', async ()=>{
                const quizzes = await Quiz.fetchAndCreateQuizzes();

                expect(Array.isArray(quizzes)).toStrictEqual(true);
                expect(quizzes.length).toStrictEqual(10);
                quizzes.forEach(quiz=>{
                    expect(quiz instanceof Quiz).toStrictEqual(true);//それぞれのデータがQuizクラスのインスタンスなのかをチェック
            });
        });
    });//テスト
 });
});