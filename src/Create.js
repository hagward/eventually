import React from 'react';
import { withRouter } from 'react-router';

class Create extends React.PureComponent {

  constructor() {
    super();

    this.handleCreateEvent = this.handleCreateEvent.bind(this);
  }

  render() {
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Create new event
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <form className="container">
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input className="input" type="text" placeholder="Dinner with friends"
                  ref={title => { this.title = title; }} />
              </div>
            </div>
            <div className="field">
              <label className="label">Time</label>
              <div className="control">
                <input className="input" type="text" placeholder="2017-10-05 18:00"
                  ref={time => { this.time = time; }} />
              </div>
            </div>
            <div className="field">
              <label className="label">Details</label>
              <div className="control">
                <textarea className="textarea" type="text" placeholder="Details about my event..."
                  ref={details => { this.details = details; }}></textarea>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary" onClick={this.handleCreateEvent}>Create event</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  }

  handleCreateEvent(event) {
    event.preventDefault();

    const body = {
      title: this.title.value,
      time: this.time.value,
      details: this.details.value
    };

    fetch('http://192.168.0.8:12345/api/event', {
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
      this.props.history.push('/' + json.id);
    });
  }
}

export default withRouter(Create);
