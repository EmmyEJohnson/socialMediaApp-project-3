//NOTES:
//check to see img is string? 
//check input type for img. Use blob? 
//check if we want user first name and last name
//use caption or content? 

import React, { useState } from "react";
import "./styles.css";
import { func } from "prop-types";
import * as MemePostService from "../../api/MemePostService";

const MemePostForm = ({ getPostsAgain, user }) => {
  const [img, setImg] = useState("");
  const [caption, setCaption] = useState(""); //caption or content? *****************

  const handleSubmit = async () => {
    let newPost = { img, author: user._id, caption };
    const res = await MemePostService.create(newPost);

    if (res.status === 201) {
      setImg("");    //check to see img is an empty string? *************************
      setCaption(""); //caption or content? ******************
      getPostsAgain();
  } else {
      alert("Server Error");
  }
};  

if (!user) {
  return <div />;
}

return (
  <div>
      <input
          onChange={(e) => setImg(e.target.value)}
          value={img}
          type="text"  // blob? ********************************
          name="img"
          placeholder="Image Goes Here"
      />
        <p> 
          {user.firstName} {user.lastName}
      </p>
      <input
                onChange={(e) => setCaption(e.target.value)} //caption or content? *******
                value={caption} //caption or content?***********
                type="text"
                name="caption" //caption or content?*******************
                placeholder="Your Caption Here"
            />

      <button onClick={handleSubmit}> Post Image </button>
        </div>
    );
};

MemePostForm.propTypes = {
  getPostsAgain: func,
};

export default MemePostForm;