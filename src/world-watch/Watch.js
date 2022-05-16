import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { setVisualTime, getTimeZone } from './Functions'

export function Form_AddWatch({ onSubmit }) {
  const defaultForm = {
    name: '',
    timezone: getTimeZone,
  }
  const [form, setForm] = useState(defaultForm);
  const handleOnChange = evt => {
    evt.preventDefault();
    setForm({ ...form, [evt.target.id]: evt.target.value });
  }
  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit({ ...form, id: nanoid() });
    setForm(defaultForm);
  }
  return (
    <form className="form_addwatch" onSubmit={handleSubmit}>
      <div className="form_line">
        <label htmlFor="name">Название</label>
        <input type="text" id="name" pattern="^(.){2,32}$"
        onChange={handleOnChange} value={form.name} required />
      </div>
      <div className="form_line">
        <label htmlFor="timezone">Часовой пояс UTC</label>
        <input type="number" id="timezone"  min="-12" step="1" max="12"
          onChange={handleOnChange}  defaultValue={getTimeZone}/>
      </div>
      <button className="submit">Добавить</button>
    </form>
  )
}

export function WatchBlocks({watches, setWatches}) {
  return (
    <div className="clocks_all">
      { watches.map(o =>
        <Watch clock={o}
          watches={watches}
          setWatches={setWatches}
          key={o.id}
          id={o.id} />) }
    </div>
  );
}

class Watch extends React.Component {
  setWatches = this.props.setWatches;
  state = { clock: this.props.clock, id: this.props.id };
  watchDiv = null;
  componentDidMount() {
    this.watchDiv = document.getElementById(this.state.id);
    this.update();
  }
  componentDidUpdate() {
    window.setTimeout(() => {
      this.setState(prev => ({ ...prev, update: Date.now() }));
      this.update();
    }, 1000);
  }
  update() {
    if (!this.watchDiv) return;

    const result = setVisualTime(Date.now(), this.state.clock.timezone);
    ['.clock_hours', '.clock_minutes', '.clock_seconds'].forEach((o, idx) => {
      this.watchDiv.querySelector(o)
      .style.transform = 'rotate(' + (90 + result[idx]) + 'deg)';
    });
    this.setState(prev => ({ ...prev, update: Date.now() }));
  }
  render() {
    const {clock, id} = this.state;
    const handleClockRemove = (id) => {
      const arr = this.props.watches.filter(o => o.id !== id);
      this.setWatches(arr);
    };
    return (
      <div className="clock_block" id={id}>
        <span className="clock_name">{clock.name}</span>
        <div className="clock">
          <span className="clock_hours"></span>
          <span className="clock_minutes"></span>
          <span className="clock_seconds"></span>
        </div>
        <div className="clock_remove" onClick={() => handleClockRemove(id)}>X</div>
      </div>
    );
  }
}
