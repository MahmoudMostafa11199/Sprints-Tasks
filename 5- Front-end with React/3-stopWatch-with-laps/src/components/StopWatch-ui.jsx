import React from 'react';

class StopWatch extends React.Component {
  constructor() {
    super();

    this.state = { date: new Date(), laps: [], isRunning: true };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // Add new lap
  handleSubmit = (e) => {
    e.preventDefault();

    const newLap = {
      id: Date.now(),
      title: e.target[1].value.trim(),
      time: this.state.date.toLocaleTimeString(),
    };

    this.setState((prevState) => ({
      laps: [...prevState.laps, newLap],
    }));

    e.target.reset();
  };

  // Delete Lap by id
  onDelete = (id) => {
    const newLaps = this.state.laps.filter((lap) => lap.id !== id);
    this.setState({ laps: newLaps });
  };

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return (
      <React.Fragment>
        <p>It is {this.state.date.toLocaleTimeString()}</p>

        <form className="form-ui" onSubmit={this.handleSubmit}>
          <button className="save-lap-ui" type="submit">
            Save Lap
          </button>
          <input
            type="text"
            className="title-lap-ui"
            placeholder="Enter yout lap title"
          />
        </form>

        <ol className="laps-list">
          {this.state.laps.map((lap) => (
            <li className="lap" key={lap.id}>
              <div>
                <p>{lap.title}</p>
                <p>{lap.time}</p>
              </div>
              <button
                className="delete-lap-ui"
                onClick={() => this.onDelete(lap.id)}
              >
                X
              </button>
            </li>
          ))}
        </ol>
      </React.Fragment>
    );
  }
}

export default StopWatch;
