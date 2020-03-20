import axios from 'axios';//APIにアクセスするライブラリ

const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

class QuizFetcher{
    static async fetch(){
        const response = await axios.get(API_URL);//axios.getでAPI_URLを受け取る
        return response.data;
    }
}

export default QuizFetcher;