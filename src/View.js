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
          <h2 className="title is-2">{this.state.title}</h2>
          <h4 className="subtitle is-4"><i className="fa fa-clock-o"></i> {this.state.time}</h4>
          <p>{this.state.details}</p>
        </section>
        <section className="section">
          <h3 className="subtitle is-3">People</h3>
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Coming</th>
              </tr>
            </thead>
            <tbody>
              {this.state.people.map((person, index) =>
                <tr key={index}>
                  <td>{person.name}</td>
                  <td>Yes</td>
                </tr>
              )}
            </tbody>
          </table>
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
