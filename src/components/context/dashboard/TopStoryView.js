import React, { Component } from "react";
class TopStoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story_top: [],
      rank_id: 0
    };
    this.getData();
  } 
  getData(){
    fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/view-chart")
    .then(response =>{
      response.json().then((data1) =>{
      this.updateUI(data1);
    });
    });
  }
  updateUI(data1){
    this.setState({
      story_top:data1
  })
  }  
  render() {
    return (
        <section className="panel important">
          <h3 className="titleChart">The 5 best stories in 2021</h3>
          <table className="table-bordered">
              <thead>
                  <tr className="table-danger">
                      <th>Rank</th>
                      <th>Story name</th>
                      <th>Views</th>
                  </tr>
              </thead>
              <tbody>
              {
              this.state.story_top.map((story, index)=>(
                <tr>
                  <td key={index}>{index + 1}</td>
                  <td>{story.story_name}</td>
                  <td>{story.view}</td>
                </tr>
              ))
              }
              </tbody>
          </table>
        </section>
    );
  }
}
export default TopStoryView;