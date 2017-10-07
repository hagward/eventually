import React from 'react';

export default class View extends React.PureComponent {
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
    fetch('http://192.168.0.8:12345/api/event/' + this.props.match.params.id, {
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
              <h1 className="title">{this.state.title}</h1>
              <h2 className="subtitle"><i className="fa fa-clock-o"></i> {this.state.time}</h2>
            </div>
          </div>
        </section>

        {this.state.details &&
          <section className="section">
            <h2 class="subtitle">Details</h2>
            <p>{this.state.details}</p>
          </section>
        }

        <section className="section">
          <h2 class="subtitle">People</h2>
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
              <button className="button is-primary" onClick={this.handleAddPerson}>I'm coming</button>
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

    fetch('http://192.168.0.8:12345/api/event/' + this.props.match.params.id + '/person', {
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
      }), () => this.name.value = '');
    });
  }
}
