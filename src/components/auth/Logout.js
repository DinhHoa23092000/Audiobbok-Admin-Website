import React, { Component }  from 'react';
import {withRouter } from "react-router-dom";
class Logout extends Component{
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    this.props.history.push("/");
    window.location.reload();
  }
  render() {
    return (
      <div className="modal bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Are you sure ?</h4>
            </div>
            <div className="modal-body">
              <p><i className="fa fa-question-circle"></i> Are you sure you want to log out?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary btn-block" onClick={this.logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default withRouter(Logout);