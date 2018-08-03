import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input1: '',
      input2: '',
      select: 'default',
      display: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  displayData(data) {
    if (typeof data === 'number') {
      this.setState({display: data.toString() });
    } else {
      this.setState({display: JSON.stringify(data)});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name } = e.target;
    const { input1, input2, select } = this.state;

    if(name === 'form1' && input1 !== '') {
      axios.post('/str', { str: input1 })
      .then(({ data }) => this.displayData(data))
      .catch(err => console.log(err));


    } else if(name === 'form2' && select !== 'default') {
      axios.post('/api', { url: input2, method: select })
      .then(({ data }) => this.displayData(data))
      .catch(err => console.log(err));
    }

    this.setState({
      input1: '',
      input2: '',
      select: 'default'
    })
  }

  render() {
    return (
      <div className="app">

        <form className="form" name="form1" onSubmit={this.handleSubmit}>
          <label className="form__label">Enter a string to be reversed</label>
          <input placeholder="Enter string..." className="form__input" type="text" onChange={e => this.setState({ input1: e.target.value })} value={this.state.input1}/>
          <button className="form__btn" type="submit">Submit</button>
        </form>

        <form className="form" name="form2" onSubmit={this.handleSubmit}>
          <label className="form__label">Enter a URL</label>
          <input placeholder="http://www..." className="form__input" type="url" onChange={e => this.setState({ input2: e.target.value })} value={this.state.input2}/>
          <label className="form__label">Select a Request Method</label>
          <select className="form__select" value={this.state.select} onChange={e => this.setState({ select: e.target.value })}>
            <option value="default"></option>
            <option value="get">GET</option>
            <option value="post">POST</option>
          </select>
          <button className="form__btn" type="submit">Submit</button>
        </form>

        <div className="display">
          <p className="display__txt">{this.state.display}</p>
        </div>
      </div>
    )
  }
}

export default App;
