import React, { useState, useEffect } from 'react';
import CommentForm from '../CommentForm';
import Comment from '../Comment';
import Likes from '../Likes';
import Dislike from '../Dislike';
import PostsForm from '../PostsForm';
import * as MemePostService from '../../api/MemePostService';
import axios from 'axios';
import './styles.css';

const Posts = ({
  getPostsAgain,
  author,
  user,
  caption,
  image,
  postComments,
  id,
  content,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setCaption] = useState(caption);
  // const [editedAuthor, setAuthor] = useState(author.lastName);
  const [comments, setComments] = useState([]);

  const handleEdit = async () => {
    console.log('handleedit');
    setIsEditing(!isEditing);
    //meaning submit is showing
    if (isEditing) {
      let editedPost = {
        caption: editedCaption,
        // author: editedAuthor,
      };
      await MemePostService.update(id, editedPost);
      getPostsAgain();
    }
  };

  const handleDelete = async () => {
    await MemePostService.remove(id);
    getPostsAgain();
  };

  async function fetchComments(id) {
    let res = await MemePostService.getAllComments(id);
    if (res.status === 200) {
      setComments(res.data.data);
    }
  }

  useEffect(() => {
    fetchComments(id);
  }, []);

  return (
    <div>
      {/* <h1 style={{ color: 'white' }}> */}
        {/* post body with the images comment and likes goes in here */}
      {/* </h1> */}
      <div className="post-container">
        <div className="post-body">
          <img
            src={`http://localhost:5000/${image}`}
            style={{ width: '359px' }}
          />{' '}
        </div>
        <div style={{ color: 'white' }}>{caption}</div>
        <button onClick={handleDelete}>DELETE</button>
        {/* <div>
          <Likes />
        </div>
        <div>
          <Dislike />
        </div> */}
        <div>
          {/* <h3>Comments</h3> */}
          {comments.map((comment) => {
            // console.log("WHICH DATA AM I USING: ", comment);
            return (
              <Comment
                author={comment.author}
                content={comment.content}
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
          user={user}
          getPostsAgain={() => getPostsAgain()}
          getCommentsAgain={(id) => fetchComments(id)}
        />
      </div>
    </div>
  );
};

export default Posts;
