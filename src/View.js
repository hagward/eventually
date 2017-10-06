import React, { Component } from 'react';

export default class View extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
      </div>
    );
  }
}
