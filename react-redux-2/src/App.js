import { Provider } from 'react-redux'
import Cake from './components/CakeContainer';
import IceCream from './components/IceCreamContainer';
import Users from './components/UserContainer';
import './App.css';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Cake />
        <IceCream />
        <Users />
      </div>
    </Provider>
  );
}

export default App;
