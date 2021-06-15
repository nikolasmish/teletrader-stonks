import {Switch, Route} from 'react-router-dom'

import Navigation from './components/navigation/navigation.component'

import HomePage from './pages/homepage/homepage.component';
import ProfilePage from './pages/profile/profile.component';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
