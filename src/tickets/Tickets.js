import React, {Component} from 'react';
import './Tickets.css';
import {bookTicket, getTickets, makePayment} from "../util/APIUtils";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Alert from 'react-s-alert';
import TableBody from "@material-ui/core/TableBody";
import {Button} from "@material-ui/core";


class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            tickets: [],
            classes: {
                table: {
                    minWidth: 650,
                },
            }
        };
    }


    bookTicket() {
        bookTicket().then(value => {
            Alert.success(value.message);
            this.fetchTickets();
        })
    }

    makePayment(id) {
        makePayment(id).then(value => {
            Alert.success(value.message);
            this.fetchTickets();
        })
    }

    fetchTickets() {
        getTickets().then(response => {
            this.setState({
                tickets: response.object,
                isFetching: false
            });
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        })
    }

    componentDidMount() {
        this.fetchTickets();
    }

    render() {
        return (
            <div>
                <div className='fe-align-left'>
                    <span>The Cost Of Each Ticket is RS.100</span>
                    <br/>
                    <Button className='btn-primary' onClick={event => this.bookTicket()}>Click Here to Book New Ticket</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ticket ID</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Payment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.tickets.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell component="th" scope="row">
                                        TICKET#{ticket.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        RS.{ticket.price}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {ticket.paymentDone ?
                                            <Button disabled>PAID</Button> :
                                            <Button onClick={event => this.makePayment(ticket.id)}>PAY</Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default Tickets;