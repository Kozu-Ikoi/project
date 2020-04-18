import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//devツールのcrome-extentionが入っているかをチェック。もしなければcomposeをcomposeEnhancersにセット
const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeEnhancers(//composeはmiddlewareと一緒に読み込む
        applyMiddleware(...middleware)
    )
);

export default store;