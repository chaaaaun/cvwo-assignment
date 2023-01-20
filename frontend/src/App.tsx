import React, { FormEventHandler } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="App">
      <LoginForm message='login' />
      <LoginForm message='register' />
    </div>
  );
}

export default App;
