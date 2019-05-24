import React, {Component} from 'react';
import './customers.css'

class Customers extends Component {
    constructor(){
        super();
        this.state = {
            customers: [],
        }
    }

    componentDidMount(){
        fetch("/api/customers")
        .then(res => res.json(res.body))
        .then(data => {
            this.setState({
                customers: data
            });
        });
    }

    render(){
        return (
            <div>
                <h2>Customers</h2>
                <ul>
                    {this.state.customers.map((customer) => 
                        <li key={customer.id}>{customer.id} {customer.firstName} {customer.lastName}</li>    
                    )}
                </ul>
            </div>
        )
    }
}

export default Customers;