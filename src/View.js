import React from 'react';

export default class View extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      type: 'event',
      title: '',
      time: '',
      details: '',
      status: 'unanswered',
      invites: []
    };

    this.handleInvite = this.handleInvite.bind(this);
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

              {this.state.type === 'invite' &&
                <div className="container">
                  <div className="field has-addons">
                    <p className="control">
                      <button className={'button is-primary is-inverted' + (this.state.status !== 'yes' ? ' is-outlined' : '')} onClick={() => this.handleReply('yes')}>
                        Going
                      </button>
                    </p>
                    <p className="control">
                      <button className={'button is-primary is-inverted' + (this.state.status !== 'no' ? ' is-outlined' : '')} onClick={() => this.handleReply('no')}>
                        Not going
                      </button>
                    </p>
                    <p className="control">
                      <button className={'button is-primary is-inverted' + (this.state.status !== 'maybe' ? ' is-outlined' : '')} onClick={() => this.handleReply('maybe')}>
                        Maybe going
                      </button>
                    </p>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>


        {this.state.details &&
          <section className="section">
            <h2 className="subtitle">Details</h2>
            <p>{this.state.details}</p>
          </section>
        }

        <section className="section">
          <h2 className="subtitle">People</h2>
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Invite ID</th>
              </tr>
            </thead>
            <tbody>
              {this.state.invites.map((invite, index) =>
                <tr key={index}>
                  <td>{invite.name}</td>
                  <td>{invite.email}</td>
                  <td>{invite.status}</td>
                  <td>{invite.inviteId}</td>
                </tr>
              )}
            </tbody>
          </table>

          {this.state.type === 'event' &&
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <input className="input" type="text" placeholder="example@email.com"
                  ref={email => { this.email = email; }}/>
              </div>
              <div className="control">
                <button className="button is-primary" onClick={this.handleInvite}>Send invite</button>
              </div>
            </div>
          }
        </section>
      </div>
    );
  }

  handleInvite() {
    const body = {
      email: this.email.value
    };

    // TODO: Move fetch calls to own Api class?
    fetch('http://192.168.0.8:12345/api/event/' + this.props.match.params.id + '/invite', {
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
      console.log('invite response:', json);

      this.setState(prevState => ({
        invites: [...prevState.invites, json]
      }), () => this.email.value = '');
    });
  }

  handleReply(status) {
    const body = {
      status: status
    };

    fetch('http://192.168.0.8:12345/api/event/' + this.props.match.params.id + '/reply', {
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
      console.log('reply response:', json);

      this.setState({
        status: json.status
      });
    });
  }
}
