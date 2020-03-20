import React from 'react';
import Button from '../Button/Button';

const Home = ({history})=>{//Route Componentsを使っている、
    return(//{history}→props内のhistoryを使うと設定
    <div>
        <h1>ホーム</h1>
        <Button onClickHandler = {()=>{
            history.push('/quiz');
        }}>
            クイズページへ移動
        </Button>
    </div>
    );
};

export default Home;