/* global fetch */
import 'babel-polyfill';
import React from 'react';
import moment from 'moment';
import cx from 'classnames';
import business from 'moment-business';
import Dashboard from './../dashboard';

const dates = [
  {
    idx: 'aurora',
    label: 'Aurora',
    date: moment('2017-08-07', 'YYYY-MM-DD'),
  },
  {
    idx: 'beta',
    label: 'Beta',
    date: moment('2017-10-02', 'YYYY-MM-DD'),
  },
  {
    idx: 'release',
    label: 'Release',
    date: moment('2017-11-14', 'YYYY-MM-DD'),
  },
];

export default class QuantumCountdown extends React.Component {
  state = {
    seconds: 0,
  };

  componentDidMount() {
    window.setInterval(this.countDown.bind(this), 1000);
  }

  countDown() {
    this.setState({
      seconds: Math.round(moment.duration(dates[0].date.diff(moment())).as('seconds')),
    });
  }

  render() {
    const { seconds } = this.state;
    const $counters = dates.map((entry, idx) => {
      const weekDays = business.weekDays(moment(), entry.date);
      const weeks = Math.floor(weekDays / 5);
      const extraDays = weekDays - (weeks * 5);
      const humanized = moment.duration(entry.date.diff(moment())).humanize(true);
      const cls = cx('row', `channel-${entry.idx}`);
      const $days = (extraDays < 1) ? null : (
        <div>
          <h3 className='countdown-number'>{extraDays}</h3>
          <small>week days</small>
        </div>
      );
      const $seconds = (idx !== 0) ? null : (
        <div>
          <h3 className='countdown-number'>{seconds.toLocaleString()}</h3>
          <small>seconds</small>
        </div>
      );
      return (
        <section
          className={cls}
          key={entry.idx}
        >
          <h2>{entry.label}</h2>
          <h3 className='countdown-date'>{entry.date.format('ddd, MMM Do')}</h3>
          <small>{humanized}</small>
          <h3 className='countdown-number'>{weeks}</h3>
          <small>work weeks</small>
          {$days}
          {$seconds}
        </section>
      );
    });
    return (
      <Dashboard
        title='Firefox 57 (Quantum MVP)'
        subtitle='Merge Day Countdown'
        className='status-index quantum-countdown'
      >
        {$counters}
      </Dashboard>
    );
  }
}

QuantumCountdown.defaultProps = {
};
QuantumCountdown.propTypes = {
};