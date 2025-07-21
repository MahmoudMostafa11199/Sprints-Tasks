import React from 'react';

class StopWatch extends React.Component {
  constructor() {
    super();

    this.state = {
      elapsedTime: 0,
      isRunning: false,
      laps: [],
    };

    // Binding
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % 3600000) / (1000 * 60));
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    const format =
      `${hours}`.padStart(2, '0') +
      ':' +
      `${minutes}`.padStart(2, '0') +
      ':' +
      `${seconds}`.padStart(2, '0') +
      ':' +
      `${centiseconds}`.padStart(2, '0');

    return format;
  }

  increment() {
    this.setState((state) => ({
      elapsedTime: state.elapsedTime + 1,
    }));
  }

  startTimer() {
    if (this.state.isRunning) return;

    this.timer = setInterval(() => this.increment(), 1);

    this.setState({ isRunning: true });
  }

  onLap = () => {
    if (this.state.isRunning) {
      const newLap = {
        id: this.state.laps.length + 1,
        time: this.formatTime(this.state.elapsedTime),
      };

      this.setState((state) => ({
        laps: [newLap, ...state.laps],
      }));
    }
  };

  stopTimer() {
    clearInterval(this.timer);
    this.setState({ isRunning: false });
  }

  resetTimer() {
    clearInterval(this.timer);
    this.setState({
      elapsedTime: 0,
      laps: [],
      isRunning: false,
    });
  }

  render() {
    return (
      <div className="stopWatch">
        <p className="stopWatch-value">
          {this.formatTime(this.state.elapsedTime)}
        </p>

        <div className="form-desc">
          <button
            onClick={this.startTimer}
            className="btn btn--start"
            disabled={this.state.isRunning}
          >
            Start
          </button>
          <button
            onClick={this.stopTimer}
            className="btn btn--stop"
            disabled={!this.state.isRunning}
          >
            Stop
          </button>
          <button
            onClick={this.onLap}
            className="btn btn--lap"
            disabled={!this.state.isRunning}
          >
            Lap
          </button>
          <button
            onClick={this.resetTimer}
            className="btn btn--reset"
            disabled={this.state.isRunning || !this.state.elapsedTime}
          >
            Reset
          </button>
        </div>

        <h3>{this.state.laps.length} Lap(s)</h3>

        <ol className="laps-list">
          {this.state.laps.map((lap) => (
            <li className="lap" key={lap.id}>
              {lap.id}: {lap.time}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default StopWatch;
