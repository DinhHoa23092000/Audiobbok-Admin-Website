import React, { Component } from 'react';
import Header from '../partials/header/Header';
import Sidebar from '../partials/sidebar/Sidebar';
import Footer from '../partials/footer/Footer';
import Dashboard from '../context/dashboard/Dashboard';
import UserTable from '../context/table/User';
import CommentTable from '../context/table/Comment';
import StoryTable from '../context/table/Story';
import AddStory from '../context/table/AddStory';
import StoryDetail from '../context/table/DetailStory';
import Profile from '../context/profile/Profile';
import Logout from '../auth/Logout';
import './Home.scss';
import { Redirect, withRouter } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class Home extends Component{
    render() {
        return (
            <div>
                <Header/>
                <Sidebar/>
                <Router>
                    <Switch>
                        <Route exact path="/admin/dashboard">
                            <Dashboard />
                        </Route>
                        <Route exact path="/admin/table/user">
                            <UserTable />
                        </Route> 
                        <Route exact path="/admin/table/comment">
                            <CommentTable />
                        </Route>  
                        <Route exact path="/admin/table/story">
                            <StoryTable />
                        </Route>  
                        <Route exact path="/admin/profile">
                            <Profile/>
                        </Route>
                        <Route exact path="/admin/table/story/add-story">
                            <AddStory/>
                        </Route>
                        <Route path="/admin/table/story-detail/:idStory" component={StoryDetail}/> 
                    </Switch>
                    <Logout/>
                </Router>
            </div>  
        );
    }
}
export default Home;
