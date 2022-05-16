import React from 'react'
import { useState } from 'react'
import Request from './Request'
const defaultForm = { text: '', disabled: false }

export function Form_AddNote({notes}) {
  const [form, setForm] = useState(defaultForm);
  const handleSubmit = evt => {
    const data = { content: form.text };
    evt.preventDefault();
    setForm({ text: 'Загрузка...', disabled: true });
    (async () => {
      await Request.add(data);
      notes.update();
      setForm(defaultForm);
    })();
  }
  const handleChange = evt => {
    setForm({ text: evt.target.value, disabled: false });
  }
  const handleRefresh = evt => {
    evt.preventDefault();
    notes.update();
  }
  return (
    <form className="form_add" onSubmit={handleSubmit}>
      <textarea
        id="note"
        cols="30"
        rows="10"
        value={form.text}
        onChange={handleChange}
        disabled={form.disabled && 'disabled'}>
      </textarea>
      <button id="send">+</button>
      <button id="refresh" onClick={handleRefresh}>{`\u{27F3}`}</button>
    </form>
  );
}

export function Notes({notes}) {
  return (
    <div className="notes">
      { notes.all.map(o => <Note update={notes.update} text={o.content} key={o.id} id={o.id} />)}
    </div>
  )
}

class Note extends React.Component {
  render() {
    const handleRemove = async (evt) => {
      console.log(evt.target.dataset.id);
      await Request.delete(evt.target.dataset.id)
      this.props.update();
    }
    return (
      <div className="note" id={this.props.id}>
        <span>{this.props.text}</span>
        <div className="remove" data-id={this.props.id} onClick={handleRemove}>{`\u{00D7}`}</div>
      </div>
    );
  }
}
