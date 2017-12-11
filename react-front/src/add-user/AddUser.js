import React from 'react';
import fetch from 'cross-fetch';
import { Link } from 'react-router-dom';


export default class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.baseURL = 'http://localhost:3000/';
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            campuses: [],
            userTypeList: [],
            userType: 'Student',
            campus: 'Camden',
        };
    }

    componentDidMount() {
        this.getUserTypeList()
            .then(response => {
                this.setState({ userTypeList: response });
            });

        this.getCampusList()
            .then(response => {
                this.setState({ campuses: response });
            });
    }

    getCampusList() {
        const url = this.baseURL + 'campuses';
        return fetch(url)
            .then(response => { return Promise.resolve(response.json()) },
            err => { console.log("error") });
    }

    getUserTypeList() {
        const url = this.baseURL + 'userTypeList';
        return fetch(url)
            .then(response => { return Promise.resolve(response.json()) },
            err => { console.log("error") });
    }

    createUserTypeSelectItems() {
        let items = [];
        for (var i = 0; i < this.state.userTypeList.length; i++) {
            items.push(<option value={this.state.userTypeList[i].description}>{this.state.userTypeList[i].description}</option>);
        }
        return items;
    }

    createCampusSelectItems() {
        let items = [];
        for (var i = 0; i < this.state.campuses.length; i++) {
            items.push(<option value={this.state.campuses[i].campus_name}>{this.state.campuses[i].campus_name}</option>);
        }
        return items;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    addUser() {
        let url = this.baseURL + 'addUser';
        let user = {};
        user.firstName = this.state.firstName;
        user.lastName = this.state.lastName;
        user.address = this.state.address;
        user.type = this.state.userType;
        user.campus = this.state.campus;
        return fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify(user)
        }).then(response => alert('User added successfully'), err => alert('User not added'));
    }

    render() {
        return (
            <div class='form'>
                <h1>Add User</h1>
                <label>First Name:</label>
                <input class='input textbox' type='text' name='firstName' value={this.state.firstName} onChange={this.handleInputChange} />
                <label>Last Name:</label>
                <input class='input textbox' type='text' name='lastName' value={this.state.lastName} onChange={this.handleInputChange} />
                <label>Address:</label>
                <input class='input textbox' type='text' name='address' value={this.state.address} onChange={this.handleInputChange} />
                <label>User Type:</label>
                <select class='select' name='userType' value={this.state.userType} onChange={this.handleInputChange}>
                    {this.createUserTypeSelectItems()}
                </select>
                <label>Campus:</label>
                <select class='select' name='campus' value={this.state.campus} onChange={this.handleInputChange}>
                    {this.createCampusSelectItems()}
                </select>
                <input class='btn' type='button' value='Add' onClick={() => { this.addUser() }} />
                <Link to='/'>List of Users</Link>
            </div>
        );
    }
}