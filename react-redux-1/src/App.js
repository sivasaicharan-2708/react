import './App.css';
// import CakeContainer from './components/CakeContainer';
// import IceCreamContainer from './components/IceCreamContainer';
import store from './redux/store';
import { Provider } from 'react-redux';
import Users from './components/Users';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <CakeContainer />*/}
        {/* <IceCreamContainer />*/}
        <Users />
      </div>
    </Provider>
  );
}

export default App;
