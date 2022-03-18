import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import {getCurrentUser} from '../util/APIUtils';
import {ACCESS_TOKEN} from '../constants/constant';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import Tickets from "../tickets/Tickets";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true
        };


        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }


    loadCurrentlyLoggedInUser() {
        this.setState({
            loading: true
        });

        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false,
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
        Alert.success("You're safely logged out!");
        window.location = '/login';
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        } else {

            return (
                <div>
                    <div className="app">
                        <div className="app-top-box">
                            <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout}/>
                        </div>
                        <div className="app-body">
                            <div>
                                <Switch>
                                    <Route path="/login"
                                           render={(props) => <Login
                                               authenticated={this.state.authenticated} {...props} />}></Route>
                                </Switch>
                            </div>
                            <div className="app-content">
                                <Switch>
                                    <Route exact path="/" component={Login}></Route>
                                    <Route exact path="/home" component={Home}></Route>
                                    <Route exact path="/tickets" component={Tickets}></Route>


                                    <Route path="/login"></Route>

                                    <Route component={NotFound}></Route>

                                </Switch>
                            </div>

                        </div>
                        < Alert
                            stack={
                                {
                                    limit: 3
                                }
                            }
                            timeout={3000}
                            position='top-right'
                            effect='slide'
                            offset={65}
                        />
                    </div>
                </div>
            );
        }
    }


}

export default App;
