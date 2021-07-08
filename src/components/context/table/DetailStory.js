import React from 'react';
import axios from 'axios';
class Detail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stories: [],
      authors:[],
      types:[],
      id:0
    }
    this.getData();
    this.getDataAuthor();
    this.getDataType();  
  }
  getData(){
    let userId = this.props.match.params.idStory;
    fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/update/"+userId)
    .then(response => {
      response.json().then((data) =>  {
      console.log(data);
      this.updateUI(data);
    });
    });
  }
  updateUI(data){
    this.setState({
      stories:data,
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
  }
  updateType(data){
    this.setState({
      types:data
    })
  }  
  render(){
    return (
      <main role="main">
        <section class="panel important">
          <div className="container-fluid">
            <div className="row detail-page"> 
              {this.state.stories.map(story=>( 
              <div className="col-sm-12">
                <div className="header-title">
                  <div className="title-left">
                    <h2>{story.story_name}</h2>
                  </div>
                </div>
                <hr/>
                <div className="well">
                  <div className="w3-container">
                    <video src={story.video} className="storyVideo" controls></video>
                    <div className="linkStory"> 
                      <audio controls><source src={story.audio} type="audio/mpeg"/></audio>
                    </div>
                    <div className="w3-panel w3-leftbar w3-light-grey">
                      <p>Author: {story.author}</p>
                      <p>Type: {story.type}</p>
                      <p>Status: {story.status}</p>
                    </div>
                    <div className="w3-content">
                    <h5 className="w3-center w3-padding-16"><span className="w3-tag w3-wide">DESCRIPTION</span></h5>
                      <div className="w3-description">
                        <p>{story.description}</p>
                      </div>    
                    </div>
                    <div className="w3-content" >
                      <h5 className="w3-center w3-padding-16"><span className="w3-tag w3-wide">CONTENT</span></h5>
                      <div className="scrollbar" id="style-1">
                        <div className="force-overflow">
                        <p>{story.content}</p>
                      </div>
                    </div>            
                  </div>
                  <hr/>
                </div>
              </div> 
            </div>
            ))}
          </div>    
         </div>
        </section>
      </main>
    );
  }
}
export default Detail;
