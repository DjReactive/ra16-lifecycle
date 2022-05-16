import logo from '../logo.svg';
import './App.css';
import React from 'react'
import Request from './Request'
import { Notes, Form_AddNote } from './Notes'
import { useState } from 'react'

class App extends React.Component {
  state = { notes:[] };
  loading = false;
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    console.log('load')
    if (this.loading) return;
    this.loader();
    const getNotes = await Request.get();
    this.setState({ notes: getNotes });
    this.loader(false);
  }
  loader(value = true) {
    this.loading = value;
  }
  render() {
    const obj = { all: this.state.notes, update: this.loadData.bind(this) };
    return (
      <div className="content">
        <Notes notes={obj} />
        <Form_AddNote notes={obj} />
      </div>
    );
  }
}



export default App;
