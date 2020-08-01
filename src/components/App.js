import React from 'react';
import Card from './Card/Card';
import Timezones from './Timezones/Timezones.json';
import './App.css';
import Logo from '../assets/img/logo.png';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.addTimeZone = this.addTimeZone.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            clocks: [],
            selectedClock: 'Asia/Kabul'
        };
    }

    handleChange(e) {
        this.setState({ selectedClock: e.target.value });
    }

    addTimeZone() {
        if (this.state.clocks.findIndex(c => c.Timezone === this.state.selectedClock) < 0) {
            let zone = Timezones.find(k => k.Timezone === this.state.selectedClock);
            this.setState(prevState => ({
                clocks: [...prevState.clocks, zone]
            }));
        }
    }

    removeClick(zone) {
        let updateClocks = this.state.clocks;
        let index = updateClocks.findIndex(t => t.Timezone === zone);
        updateClocks.splice(index, 1)
        this.setState({
            clocks: updateClocks
        });
    }


    render() {
        let optionItems = Timezones.map((zone) =>
            <option value={zone.Timezone} key={zone.Timezone} onChange={this.handleChange}>{zone.Country} ({zone.Timezone})</option>
        );

        let clocks = this.state.clocks.map((zone) =>
            <Card {...zone} key={zone.Timezone} removeClick={() => this.removeClick(zone.Timezone)} />
        )

        return (
            <div>
                <header className="header">
                    <div className="container">
                        <h1><img src={Logo} className="logo" alt="React" /> React World Clock</h1>
                        <h2>Choose a timezone</h2>
                        <select className="form-input" value={this.state.selectedClock} onChange={this.handleChange}>
                            {optionItems}
                        </select>
                        <button onClick={this.addTimeZone} className="form-btn">Add Clock</button>
                    </div>
                </header>
                <div className="container">
                    <div className="body">{clocks}</div>
                </div>
            </div>
        );
    }
}

export default App;
