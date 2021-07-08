import React, {useState, useEffect }  from 'react';
import axios from 'axios';
import { storage } from '../../firebase/index';
import { FaRegHandPointDown } from "react-icons/fa";
const Profile = () => {
  const [user, setUser] = useState([])
  const [image, setImage] = useState('null');
  const [id, setId] = useState('');
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage('');
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            user.avatar=url;
            alert("Upload file successful!")
            console.log(user.avatar)
        });
      },
    );
  };
  useEffect(() => {
    var id = localStorage.getItem("id");
    setId(id);
    fetch("https://whispering-hollows-85804.herokuapp.com/api/user/"+id, {
      headers: {
        "Authorization": id
      },
    })
    .then(response => {
      response.json().then((data) => {
        setUser(data);
      });

    });
  }, [id]);
  const handleInputChange = (e)=>{
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const  updateProfile = ()=>{
    var nameAdmin=user.full_name;
    var emailAdmin = user.email;
    var phoneAdmin = user.phone_number;
    var avatarAdmin = user.avatar;
    var idAdmin = user.id;
    if (nameAdmin === '' && emailAdmin ===''&& phoneAdmin===''&&avatarAdmin===''&&idAdmin==='') {
      alert("Please input the required information!", {
      });
    }
    else{
      axios({
        method: 'PUT',
        url :'https://whispering-hollows-85804.herokuapp.com/api/admin/user/'+idAdmin,
          data : {
            email : emailAdmin,
            full_name : nameAdmin,
            avatar: avatarAdmin,
            phone_number:phoneAdmin
            }
          }).then(res =>{
            alert("Update profile successfull!", {
            });
          });
    }
  } 
  return (
    <main role="main">
      <section className="panel important">
        <h2>MY PROFILE</h2>
        <hr/>
        <div className="onethird">
          <div className="card hovercard">
            <div className="cardheader">
              <img src="../images/profile-backgound.jpg" alt=""/>
            </div>
            <div className="avatar">
                <img alt="" src={user.avatar}/>
            </div>
            <div className="info">
              <div className="title">
                <b>{user.full_name}</b>
              </div>
              <br/>
            </div>
          </div>
        </div>
        <div className="twothirds">
          <legend>CHANGE MY PROFILE</legend>
          <hr/>
          <form  onSubmit={updateProfile}>
            <label for="name">Full name:</label>
            <input type="text" id="full_name" name="full_name" value={user.full_name} onChange={handleInputChange}/>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange}/>
            <label for="phone">Phone number:</label>
            <input type="text" id="phone_number" name="phone_number" value={user.phone_number} onChange={handleInputChange}/>
            <label for="avatar">Avatar:</label>
            <input  type="file"
              accept="image/*"
              name="avatar"
              id="imgUploaedUrl"
              className={`form-control`}
              onChange={handleChange}
            />
            <br/>
            <FaRegHandPointDown/><i> Click this button to upload file before update!</i>
            <br/><br/>
            <button type="button" className="btn btn-outline-info" onClick={handleUpload}>Upload</button>
            <div>
              <input type="submit" value="Update" />
            </div>
          </form>
        </div>
      </section>  
    </main>
  );
};
export default Profile;