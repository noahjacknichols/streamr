import './App.css';
import './css/video.css';
import {Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import VideoPage from './pages/video-page';
import Login from './pages/login';

function App() {

  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/video" component={VideoPage}/>
      <Route path="/login" component={Login}/>
    </Switch>
  );
}

export default App;
