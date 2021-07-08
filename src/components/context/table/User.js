import React, { Component }  from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
        this.getData();    
    }
    getData(){
    fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/user")
    .then(response => {
            response.json().then((data) =>  {
            console.log(data);
            this.updateUI(data);
        });
        });
    }  
    updateUI(data){
        this.setState({
            users:data
        })
    }
    onDelete(id){
        return(event)=> {
            fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/deleteUser/" +id,{
                method:"DELETE",
                headers: {
                "Content-Type": "application/json"
            },
            }).then(response => {
                console.log(response);
                alert("Delete an user was successfull");
                    window.location.reload();
            });
        }
    }    
    render() {
        return (
            <main role="main">
                <section className="panel important">
                    <h2>LIST USERS</h2>
                    <hr/>
                    <table>
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        this.state.users.map(users=>(
                            <tr>
                                <td><img src={users.avatar}/></td>
                                <td>{users.full_name}</td>
                                <td>{users.email}</td>
                                <td><label className="badge badge-danger" onClick={this.onDelete(users.id)}><RiDeleteBin5Fill/></label></td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </table>
                </section>
            </main>
        );
    }
};