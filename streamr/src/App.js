import './App.css';
import './css/video.css';
import {Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import VideoPage from './pages/video-page';
function App() {

  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/video" component={VideoPage}/>
    </Switch>
  );
}

export default App;
