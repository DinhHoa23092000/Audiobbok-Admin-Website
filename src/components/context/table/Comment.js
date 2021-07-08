import React, { Component }  from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
export default class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            comments: []
        }
        this.getData(); 
    }
    getData(){
        fetch("https://whispering-hollows-85804.herokuapp.com/api/allcomment")
        .then(response => {
                response.json().then((data) =>  {
                this.updateUI(data);
            });
        });
    }
    updateUI(data){
        this.setState({
            comments:data
        })
    }
    onDelete(id){
        return(event)=> {
            fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/deleteComment/" +id,{
                method:"DELETE",
                headers: {
                "Content-Type": "application/json"
            },
            }).then(response => {
                alert("Delete a comment was successfull");
                window.location.reload();
            });
        }
    }
    render() {
        return (
            <main role="main">
                <section className="panel important">
                    <h2>COMMENTS</h2>
                    <hr/>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Story</th>
                                <th>Content</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        this.state.comments.map(comments=>(
                            <tr>
                                <td>{comments.user[0].full_name}</td>
                                <td>{comments.story[0].story_name}</td>
                                <td>{comments.content}</td>
                                <td><label className="badge badge-danger" onClick={this.onDelete(comments.id)}><RiDeleteBin5Fill/></label></td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </table>
                </section>
            </main>
        );
    }s
};
