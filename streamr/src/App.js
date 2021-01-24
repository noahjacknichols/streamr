import './App.css';
import './css/video.css';
import {Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import VideoPage from './pages/videoPage';
import Login from './pages/login';
import Upload from './pages/upload';

function App() {

  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/video" component={VideoPage}/>
      <Route path="/login" component={Login}/>
      <Route path="/upload" component={Upload}/>
    </Switch>
  );
}

export default App;
