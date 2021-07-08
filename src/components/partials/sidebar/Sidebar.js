import React, { Component }  from 'react';
export default class Sidebar extends Component{
    render() {
        return (
            <nav role="navigation">
            <ul className="main">
                <li className="dashboard"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="dashboard"><a href="/admin/table/story">List Stories</a></li>
                <li className="dashboard"><a href="/admin/table/user">List Users</a></li>
                <li className="dashboard"><a href="/admin/table/comment">Comments</a></li>
                <li className="dashboard"><a href="/admin/profile">My Profile</a></li>
            </ul>
            </nav>
        );
    }
};