import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import rootReducer from "./redux/reducers"
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import './index.css';

const store = createStore(
  rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
))

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
