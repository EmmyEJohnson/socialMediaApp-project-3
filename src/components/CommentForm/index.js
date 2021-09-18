import React, { useState } from 'react';
import * as MemePostService from '../../api/MemePostService';
import { func, string } from 'prop-types';
import './styles.css';

const CommentForm = ({ id, getCommentsAgain, getPostsAgain }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    let newComment = { author, content, id };
    const res = await MemePostService.createComment(id, newComment);

    if (res.status === 201) {
      setAuthor('');
      setContent('');
      getCommentsAgain(id);
      getPostsAgain();
    } else {
      alert('Server Error =(');
    }
    console.log('submit');
  };

  return (
    <div className="user-comments-container">
      <label>Leave Potential Meme Comments Here:</label><br></br>
      <input className="username-input"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        type="text"
        name="author"
        placeholder="User Name"
        style={{width: "215px"}}
      />
      <br></br>
      <textarea className="comment-input"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        type="text"
        rows="3"
        name="body"
        placeholder="Leave comments here..."
        style={{width: "215px", height: "50px"}}
      />
      <br></br>
      <button className="addcomment-btn" onClick={handleSubmit}> Add Comment </button>
    </div>
  );
};

CommentForm.prototype = {
  id: string.isRequired,
  getPostsAgain: func,
};

export default CommentForm;
