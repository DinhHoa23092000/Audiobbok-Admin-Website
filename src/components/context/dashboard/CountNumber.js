import React, { Component } from 'react';
import { FaUsers,FaComments,FaListAlt } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
class CountNumber extends Component {
  constructor(props){
    super(props);
    this.state = {
      count_story:0,
      count_user:0,
      count_type:0,
      count_comment:0    
    }
    this.getCountData();  
  }
  getCountData(){
    fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/count-story")
    .then(response => {
      response.json().then((data1) =>{
        fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/count-user")
        .then(response =>{
          response.json().then((data2)=>{
            fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/count-comment")
            .then(response =>{
              response.json().then((data3) =>{
                fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/count-type-story")
                .then(response => {
                  response.json().then((data4) =>{
                    this.updateUI(data1, data2, data3, data4);
                  });
                });
              });
            });     
          });
        });
      });
    });
  }
  updateUI(data1, data2, data3, data4){
    this.setState({
      count_story:data1,
      count_user:data2,
      count_comment:data3,
      count_type:data4
    })
  }
  render() {
    return (
      <section className="panel important">
        <h2>DASHBOARD</h2>
        <hr/>
        <div className="w3-quarter">
          <div className="w3-container w3-padding-16">
            <div className="well box1">   
              <div className="well-data">
                <div className="well-data-left">
                  <h1>{this.state.count_user}</h1> 
                  <h3>Users</h3>
                </div>
                <div className="well-data-right">
                  <FaUsers/> 
                </div>
              </div> 
            </div>
          </div>
        </div> 
        <div className="w3-quarter">
          <div className="w3-container w3-padding-16">
            <div className="well box2"> 
              <div className="well-data">
                <div className="well-data-left">
                  <h1>{this.state.count_story}</h1> 
                  <h3>Stories</h3>
                </div>
                <div className="well-data-right">
                  <GiBookshelf/>
                </div>
              </div> 
            </div>
          </div>
        </div> 
        <div className="w3-quarter">
          <div className="w3-container w3-padding-16">
            <div className="well box3">
              <div className="well-data">
                <div className="well-data-left">
                  <h1>{this.state.count_comment}</h1> 
                  <h3>Comments</h3>
                </div>
                <div className="well-data-right">
                  <FaComments/>
                </div>
              </div> 
            </div>
          </div>
        </div> 
        <div className="w3-quarter">
          <div className="w3-container w3-padding-16">
            <div className="well box4">
              <div className="well-data">
                <div className="well-data-left">
                  <h1>{this.state.count_type}</h1> 
                  <h3>Story Types</h3>
                </div>
                <div className="well-data-right">
                  <FaListAlt/>
                </div>
              </div> 
            </div>
          </div>
        </div> 
      </section>
    );
  }
}
export default CountNumber;