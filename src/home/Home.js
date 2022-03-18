import React, {Component} from 'react';
import './Home.css';
import StackedBarChart from "./StackedBarChart";
import {getInsights} from "../util/APIUtils";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            insights: {dailyInsights: [], aggregateInsights: null},
            dailyInsightsKeys: ["totalUnPaidTickets", "totalPaidTickets"],
            dailyInsightsColors: {totalUnPaidTickets: "red", totalPaidTickets: "green"}
        };
    }

    componentDidMount() {
        this.fetchInsights();
    }

    render() {
        return (
            <div className="home-container">

                <div>
                    <div className="aggregateData">
                        <div>
                            <h2>Overall</h2>
                            <span>Total Booked Tickets</span> = <span>{this.state.insights.aggregateInsights?.totalBookedTickets}</span><br/>
                            <span>Total Paid Tickets</span> = <span>{this.state.insights.aggregateInsights?.totalPaidTickets}</span><br/>
                            <span>Total Paid Amount</span> = <span>RS.{this.state.insights.aggregateInsights?.totalPaidAmount}</span><br/>
                        </div>
                        <div>
                            <h2>Today</h2>
                            <span>Total Booked Tickets</span> = <span>{this.state.insights.aggregateInsights?.totalBookedTicketsToday}</span><br/>
                            <span>Total Paid Tickets</span> = <span>{this.state.insights.aggregateInsights?.totalPaidTicketsToday}</span><br/>
                            <span>Total Paid Amount</span> = <span>RS.{this.state.insights.aggregateInsights?.totalPaidAmountToday}</span><br/>
                        </div>
                    </div>
                </div>
                <div className="dailyChart">
                    <h1>Daily Ticket Insight</h1>
                    <div className="indexContainer">
                        <div>
                            <div className='box red'></div>
                            Booked Tickets
                        </div>
                        <br/>
                        <div>
                            <div className='box green'></div>
                            Paid Tickets
                        </div>
                    </div>
                    {this.state.insights.dailyInsights.length > 1 ?
                        <StackedBarChart colors={this.state.dailyInsightsColors}
                                         data={this.state.insights?.dailyInsights} keys={this.state.dailyInsightsKeys}/>
                        : ''}
                </div>
            </div>
        )
    }

    fetchInsights() {
        getInsights().then(value => {
            console.log(this.state);
            this.setState({
                insights: value.object
            });
        })
    }


}

export default Home;