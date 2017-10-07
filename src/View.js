import React, { Component } from 'react';

export default class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      time: '',
      details: '',
      people: []
    };

    this.handleAddPerson = this.handleAddPerson.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:12345/api/event/' + this.props.match.params.id, {
      method: 'GET',
      mode: 'cors',
    })
    .then(response => response.json())
    .then(json => this.setState(json));
  }

  render() {
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                View event
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <h1 className="title is-spaced">{this.state.title}</h1>
          <h3 className="subtitle"><i className="fa fa-clock-o"></i> {this.state.time}</h3>
          <p>{this.state.details}</p>
        </section>
        <section className="section">
          {this.state.people.map((person, index) =>
            <div className="box" key={index}>{person.name}</div>
          )}
          <div className="field has-addons">
            <div className="control">
              <input className="input" type="text" placeholder="John Doe"
                ref={name => { this.name = name; }}/>
            </div>
            <div className="control">
              <button className="button is-primary" onClick={this.handleAddPerson}>Add</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  handleAddPerson() {
    const body = {
      name: this.name.value
    };

    fetch('http://localhost:12345/api/event/' + this.props.match.params.id + '/person', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState(prevState => ({
        people: [...prevState.people, json]
      }));
    });
  }
}
