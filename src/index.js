import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './helper.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import myTheme from "./components/theme";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
