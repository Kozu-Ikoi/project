import React from 'react';
import './Button.css';

const Button = (props) => {
    let { onClickHandler } = props;//let onClickHandler = props.onClickHandler

    //onClickHandlerに関数以外の値がセットされていたら、
    //ボタンクリック時にエラーを出さないために何も中身のない
    //関数を実行する

if(typeof onClickHandler !== 'function'){
    onClickHandler = () => {};
}

return (
    <div
    className="Button"
    onClick={onClickHandler}
    >
        {props.children}
    </div>//props.childrenはButtonコンポーネントの開始タグと終了タグの全ての範囲(Restart)を指す
);
};

export default Button;
