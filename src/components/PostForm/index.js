//NOTES:
//check if we want user first name and last name
//use caption or content or comments? 
//This is probably the Post Form?
//Not sure if we need form action="/upload/photo"
// -->MUST<-- have encType="multipart/form-data" in the form otherwise uploading an image WILL NOT WORK!

import React, { useState } from 'react';
import axios from 'axios';
// import { func } from "prop-types";
// import * as PostService from "../../api/PostService";
import styled from 'styled-components';
import "./styles.css";

const PostForm = () => {
  const [author, setAuthor] = useState("");
  const [caption, setCaption] = useState("");
  const [comments, setComments] = useState("");
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  }

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();
      
    formData.append("author", author);
    formData.append("caption", caption);
    formData.append("comments", comments);
    formData.append("postImage", fileName);
    
    setAuthor("");
    setCaption("");
    setComments("");

    axios
      .post("http://localhost:5000/memeposts/create", formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="img-container">
      <h3> Add New Post Here: </h3>
      <span className="caption">{caption}</span>
      <form onSubmit={changeOnClick} action="/upload/photo" encType="multipart/form-data"> 
        <div className="form-group">
          <label htmlFor="author" id="user-label"> User Name : </label>
          <input
          type="text"
          value={ author }
          onChange={(e) => setAuthor(e.target.value)}
          id="user-box"
          className="form-control"
          placeholder="Your User Name"
          />
        </div><br></br>

        <div className="form-group">
          <label htmlFor="caption" id="caption-label"> Caption : </label>
          <br></br>
          <textarea
          value={ caption }
          onChange={(e) => setCaption(e.target.value)}
          id="caption-box"
          className="form-control"
          rows="5"
          placeholder="Add a caption here..."
          ></textarea>
        </div><br></br>

        <div className="form-group">
          <label htmlFor="file" className="choose-img-title"> Choose An Image to Memeify! </label>
          <br></br>
          <input 
          type="file" 
          filename="postImage" 
          className="form-control-file"
          id="choose-file"
          accept=".png, .jpg, .jpeg, .heic"
          onChange={onChangeFile}
          />
        </div><br></br>

        <button type="submit" className="btn-post"> Post It ! </button>
      </form>
    </div>
  );
};

// const HoverText = styled.button`
// background-color: transparent;
// color: blue;
// border-color: transparent;
//   :hover {
//     color: red;
//     cursor: pointer;
//   }
// `
export default PostForm;

// const PostForm = ({ getPostsAgain, user }) => {
//   const [memeImage, setFileName] = useState("");
//   const [caption, setCaption] = useState(""); //caption or content? *****************

//   const handleSubmit = async () => {
//     let newPost = { memeImage, author: user._id, caption };
//     const res = await PostService.create(newPost);

//     if (res.status === 201) {
//       setFileName("");    //check to see memeImage is an empty string? *************************
//       setCaption(""); //caption or content? ******************
//       getPostsAgain();
//   } else {
//       alert("Server Error");
//   }
// };  

// if (!user) {
//   return <div />;
// }

// return (
//   <div>
//       <input
//           onChange={(e) => setFileName(e.target.value[0])}
//           value={memeImage}
//           type="text"  // blob? ********************************
//           name="memeImage"
//           placeholder="Upload"
//       />
//         <p> 
//           {user.firstName} {user.lastName}
//       </p>
//       <input
//                 onChange={(e) => setCaption(e.target.value)} //caption or content? *******
//                 value={caption} //caption or content?***********
//                 type="text"
//                 name="caption" //caption or content?*******************
//                 placeholder="Your Caption Here"
//             />

//       <button onClick={handleSubmit}> Post Image </button>
//         </div>
//     );
// };

// PostForm.propTypes = {
//   getPostsAgain: func,
// };

// export default PostForm;