import React from 'react';
import fetch from 'cross-fetch';
import { Link } from 'react-router-dom';

export default class GrabSpot extends React.Component {
    constructor(props) {
        super(props);
        this.baseURL = 'http://localhost:3000/';
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            campuses: [],
            parkingLots: [],
            campus: 'Camden',
        };
    }

    componentDidMount() {
        this.getCampusList()
            .then(response => {
                this.setState({ campuses: response });
            });
        
            this.getParkingLotList()
            .then(response => {
                this.setState({ parkingLots: response });
            });
    }

    getCampusList() {
        const url = this.baseURL + 'campuses';
        return fetch(url)
            .then(response => { return Promise.resolve(response.json()) },
            err => { console.log("error") });
    }

    getParkingLotList() {
        let userId = this.props.match.params.id
        const url = this.baseURL + 'parkingLots?id=' + userId;
        return fetch(url)
            .then(response => { return Promise.resolve(response.json()) },
            err => { console.log("error") });
    }

    createCampusSelectItems() {
        let items = [];
        for (var i = 0; i < this.state.campuses.length; i++) {
            items.push(<option value={this.state.campuses[i].campus_name}>{this.state.campuses[i].campus_name}</option>);
        }
        return items;
    }

    createParkingLotSelectItems() {
        let items = [];
        for (var i = 0; i < this.state.parkingLots.length; i++) {
            items.push(<option value={this.state.parkingLots[i].lot_name}>{this.state.parkingLots[i].lot_name}</option>);
        }
        return items;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    getSpots() {
        let items = [];
        let totalSpot;
        let parkingLots = this.state.parkingLots;
        for(var i=0; i<parkingLots.length; i++) {
            if(parkingLots[i].lot_name === this.state.selectedParkingLot) {
                totalSpot = parkingLots[i].total_spot;
                break;
            }
        }
        for(i=1; i <= totalSpot; i++) {
            items.push(<input type='button' value={i} onClick={() => alert("Permit Number : " + Math.floor((Math.random() * 1000000) + 1) + " . Spot occupied")}/>);
        }
        return items;
    }

    render() {
        return(
            <div class='form'>
                <h1>Grab Spot</h1>
                <label>Campus:</label>
                <select class='select' name='campus' value={this.state.campus} onChange={this.handleInputChange}>
                    {this.createCampusSelectItems()}
                </select>
                <label>Parking Lot</label>
                <select class='select' name='selectedParkingLot' value={this.state.parkingLot} onChange={this.handleInputChange}>
                    {this.createParkingLotSelectItems()}
                </select>
                
                <h1>List of Spots</h1>
                {this.getSpots()}
                <br/>
                <Link to='/'>List of Users</Link>
            </div>
        );
    }
}