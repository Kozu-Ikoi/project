import React from 'react';
import {
  HashRouter as Router,
  Route
}from 'react-router-dom';//HashRouterによって"#"をつけている（常に同じページという意味）
import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import './App.css';

function App() {
  return (
    <div className = "App">
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/quiz" exact component={Quiz} />
    </Router>
    </div>
  );//exactはurl『完全一致』のページのみを開くようにする、pathにはurl、componentには表示するコンポーネントをセット
}

export default App;
