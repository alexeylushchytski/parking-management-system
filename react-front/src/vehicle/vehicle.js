import React from 'react';
import fetch from 'cross-fetch';
import { Link } from 'react-router-dom';

export default class Vehicle extends React.Component {
    constructor(props) {
        super(props);
        this.baseURL = 'http://localhost:3000/';
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            vehicles: []
        }
    }

    componentDidMount() {
        this.getVehicleList()
        .then(response => {
            this.setState({ vehicles: response });
        });
    }

    getVehicleList() {
        let userId = this.props.match.params.id
        let url = this.baseURL + 'vehicleList?id=' + userId;
        return fetch(url)
        .then(response => { return Promise.resolve(response.json()) },
        err => { console.log("error") });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    getVehicleData() {
        let items = [];
        for (var i = 0; i < this.state.vehicles.length; i++) {
            items.push(<tr>
                <td>{this.state.vehicles[i].plate_number}</td>
                <td>{this.state.vehicles[i].plate_state}</td>
                <td>{this.state.vehicles[i].make}</td>
                <td>{this.state.vehicles[i].model}</td>
                <td>{this.state.vehicles[i].color}</td>
                </tr>);
        }
        return items;
    }

    addVehicle() {
        let url = this.baseURL + 'addVehicle';
        let vehicle = {};
        vehicle.plateNumber = this.state.plateNumber;
        vehicle.plateSlate = this.state.plateSlate;
        vehicle.make = this.state.make;
        vehicle.model = this.state.model;
        vehicle.color = this.state.color;
        vehicle.userId = this.props.match.params.id;
        return fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify(vehicle)
        }).then(response => alert('Vehicle added successfully'), err => alert('Vehicle not added'));
    }

    render() {
        return(
            <div class='form'>
                <h1>Vehicle List</h1>
                <table class="pure-table pure-table-horizontal">
                    <tr>
                        <th>Plate Number</th>
                        <th>Plate Slate</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Color</th>
                    </tr>
                {this.getVehicleData()}
                </table>
                <h1>Add Vehicle</h1>
                <label>Plate Number:</label>
                <input class='input textbox' type='text' name='plateNumber' value={this.state.firstName} onChange={this.handleInputChange}/>
                <label>Plate Slate:</label>
                <input class='input textbox' type='text' name='plateSlate'value={this.state.firstName} onChange={this.handleInputChange}/>
                <label>Make:</label>
                <input class='input textbox' type='text' name='make'value={this.state.firstName} onChange={this.handleInputChange}/>
                <label>Model:</label>
                <input class='input textbox' type='text' name='model'value={this.state.firstName} onChange={this.handleInputChange}/>
                <label>Color:</label>
                <input class='input textbox' type='text' name='color' value={this.state.firstName} onChange={this.handleInputChange}/>
                <input class='btn' type='button' value='Add' onClick={() => { this.addVehicle() }}/>
                <Link to='/'>List of Users</Link>
            </div>
        );
    }
}