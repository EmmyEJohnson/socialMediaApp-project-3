//NOTES: 
//use caption or content?
//check to match up with Jonathon Flores comments work

import React, { useState, useEffect } from "react";
import Likes from "../Likes";
import Dislikes from "../Dislike";
import * as PostService from "../../api/PostService";
import { func, string, array } from "prop-types";
import "./styles.css";
import { Link } from "react-router-dom";
// import Comment from "../Comment";
// import CommentForm from "../CommentForm";

function Post({ id, getPostsAgain, postImage, author, caption, postComments }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAuthor, setAuthor] = useState(author);
  const [editedCaption, setCaption] = useState(caption);
  const [comments, setComments] = useState([]);
  const [fileName, setFileName] = useState("");


  const handleEdit = async () => {
    setIsEditing(!isEditing);
    
    if (isEditing) {
        let editedPost = {
            postImage: fileName,
            author: editedAuthor,
            caption: editedCaption, 
        };
        await PostService.update(id, editedPost);
        getPostsAgain();
    }
};

const handleDelete = async () => {
  await PostService.remove(id);
  getPostsAgain();
};

async function fetchComments(id) {
  let res = await PostService.getAllComments(id);
  if (res.status === 200) {
      setComments(res.data.data);
  }
}

useEffect(() => {
  fetchComments(id);
}, []);

return (
    <div>
    {/* {posts.map((post, key) => (
      <div className="container" key={key}>
          <img
          src={`/uploads/${post.postImage}`}
          alt="..."
          style={{ width: "40%" }}
          /> */}
    

      <div>
          {!isEditing && <h1>{postImage}</h1>}
          {isEditing && (
              <input
                  onChange={(e) => setFileName(e.target.value[0])}
                  value={fileName}
                  type="file" 
                  name="postImage"
                  placeholder="Upload"
              />
          )}
          <div>
                    <button onClick={handleEdit}>
                        {isEditing ? "Submit" : "Edit"}
                    </button>
                    <button onClick={handleDelete}> Delete </button>
                </div>
            </div>
            {!isEditing && <p>By: {author}</p>}
            {isEditing && (
                <input
                    onChange={(e) => setAuthor(e.target.value)}
                    value={editedAuthor}
                    type="text"
                    name="author"
                    placeholder="User Name"
                />
            )}
    
            <div> 
                {!isEditing && <p className="post-caption">{caption}</p>} 
                {isEditing && (
                    <input
                        onChange={(e) => setcaption(e.target.value)}
                        value={editedCaption} 
                        type="text"
                        name="caption"
                        placeholder="Caption"
                    />
                )}
            </div>
            <div className="likes">
                <Likes />
            </div>
            <div className="dislike">
                <Dislike />
            </div>
            <div>
                <h3>Comments:</h3>
                {comments.map((comment) => {
                    return (
                        <Comment
                            author={comment.author}
                            caption={comment.caption} // caption or content? *************
                            key={comment._id}
                            commentId={comment._id}
                            id={id}
                            getCommentsAgain={(id) => fetchComments(id)}
                        />
                    );
                })}
            </div>
            <CommentForm
                id={id}
                getPostsAgain={() => getPostsAgain()}
                getCommentsAgain={(id) => fetchComments(id)}
            />
        </div>
    );
    
}

Post.propTypes = {
  id: string.isRequired,
  postImage: string.isRequired,
  author: string.isRequired,
  caption: string.isRequired, // caption or content? ************
  postComments: array,
  getPostsAgain: func,
};

Post.defaultProps = {
  author: "Memeify Me", //change default author?
};

export default Post;