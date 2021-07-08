import React from 'react';
import {
  Link
} from "react-router-dom";
import { FcPrevious, FcNext } from "react-icons/fc";
import { BsX } from "react-icons/bs";
class Story extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stories: [],
      authors:[],
      types:[],
      id:0,
      pageNumber: 0,
      pageMax : 0
    }
    this.getData();
    this.getDataAuthor();
    this.getDataType();  
    this.onHandleNextPage = this.onHandleNextPage.bind(this);
    this.onHandlePrePage = this.onHandlePrePage.bind(this);
  }
  getData(){
    var idPage =this.state.pageNumber;
    fetch("https://whispering-hollows-85804.herokuapp.com/api/stories-page/" + idPage)
    .then(response => {
      response.json().then((data) =>  {
      console.log(data);
      this.updateUI(data);
    });
    });
  }
  updateUI(data){
    this.setState({
      stories:data.stories,
      pageMax: data.sumpage - 1
    })
  };
  getDataAuthor(){
    fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/author")
    .then(response => {
      response.json().then((data) =>  {
      console.log(data);
      this.updateAuthor(data);
    });
    });
  }
  updateAuthor(data){
    this.setState({
      authors:data
    })
  }  
  getDataType(){
    fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/type-story")
    .then(response => {
      response.json().then((data) =>  {
      console.log(data);
      this.updateType(data);
    });
    });
  };
  updateType(data){
    this.setState({
      types:data
    })
  };
  onHandleNextPage(){
    var idPageNext =this.state.pageNumber + 1;
    this.setState({
      pageNumber:idPageNext}, () => {
        this.getData();
      })
  }
  onHandlePrePage(){
    var idPagePre =this.state.pageNumber - 1;
    this.setState({
      pageNumber:idPagePre}, () => {
        this.getData();
      })
  }
  onDelete(id){
    return(event)=> {
        fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/deleteStory/" +id,{
            method:"DELETE",
            headers: {
              "Content-Type": "application/json"
          },
        }).then(response => {
            console.log(response);
            alert("Delete a story was successfull");
              window.location.reload();
        });
    }
  }
  render() {
		return (
      <main role="main">
        <section className="panel important">
        <div>
          <h2>LIST STORIES</h2>
          <button className="btn btn-info" style={{float: "right"}}><Link to={"/admin/table/story/add-story"}>Add Story</Link></button>
        </div>
        <hr/>
        <div className="col-md-12">
          <div className="row">
            {this.state.stories.map(story=>( 
            <div className="col-sm-2">
              <div className="well">
                <button type="button" className="btn-close" aria-label="Close" onClick={this.onDelete(story.id)}><BsX/></button>
                <div className="w3-container">
                  <div className="nameStory"><h4>{story.story_name}</h4></div>
                  <img src={story.image}/> 
                  <Link to={"/admin/table/story-detail/"+ story.id}>
                    <button type="button" className="btn btn-primary btn-sm">Detail</button>
                  </Link>       
                </div>
              </div> 
            </div>
            ))}
          </div>    
        </div>
        <button style={{ borderWidth: 0.2 }} onClick={this.onHandlePrePage} disabled={this.state.pageNumber === 0 ? true : false}><FcPrevious/></button>
        <button style={{ borderWidth: 0.2 }} >{this.state.pageNumber +1}</button>
        <button style={{ borderWidth: 0.2 }}onClick={this.onHandleNextPage} disabled={this.state.pageNumber === this.state.pageMax ? true : false}><FcNext/></button>
      </section>
    </main>
    );
  }
}
export default Story;
