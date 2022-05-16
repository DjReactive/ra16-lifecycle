import logo from '../logo.svg';
import './App.css';
import React from 'react'
import { Form_AddWatch, WatchBlocks } from './Watch'
import { useState } from 'react'

function App() {
  const [watches, setWatches] = useState([]);
  const handleAddWatch = (form) => {
    setWatches(prev => [...prev, form]);
    console.log(form);
  }
  return (
    <div className="content">
      <Form_AddWatch onSubmit={handleAddWatch} />
      <WatchBlocks watches={watches} setWatches={setWatches} />
    </div>
  );
}



export default App;
