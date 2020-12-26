import './App.css';
import './css/video.css';
import {Route, Switch } from 'react-router-dom';
import Home from './pages/home';
function App() {

  return (
    <Switch>
      <Route path="/" exact component={Home}/>

    </Switch>
  );
}

export default App;
