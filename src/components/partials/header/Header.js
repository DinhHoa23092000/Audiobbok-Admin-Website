import React, { Component }  from 'react';
import { CgLogOut } from "react-icons/cg";
export default class Header extends Component{
  render() {
    return (
      <header role="banner">
      <h1>Audiobook Admin Page </h1>
      <ul className="utilities">
        <li className="users"><a href="/admin/profile">My Profile</a></li>
        <li><button data-toggle="modal" data-target=".bs-example-modal-sm"><CgLogOut/>Logout</button></li>
      </ul>
    </header>
    );
  }
};