import React, { useState } from 'react';
import * as MemePostService from '../../api/MemePostService';
import { func, string } from 'prop-types';

const Comment = ({ id, author, content, getCommentsAgain, commentId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAuthor, setAuthor] = useState(author);
  const [editedContent, setContent] = useState(content);

  const handleEdit = async () => {
    setIsEditing(!isEditing);
    console.log("Test - edit!")
    if (isEditing) {
      let editedPost = {
        author: editedAuthor,
        content: editedContent,
      };
      await MemePostService.updateComment(id, commentId, editedPost);
      getCommentsAgain(id);
    }
  };

  const handleDelete = async () => {
    await MemePostService.removeComment(id, commentId);
    getCommentsAgain(id);
  };

  return (
    <div className="comment">
      <span className="entry" style={{ color: 'white' }}>
        {!isEditing && <b style={{ color: 'white' }}>{author}</b>}
        {isEditing && (
          <input
            onChange={(e) => setAuthor(e.target.value)}
            value={editedAuthor}
            type="text"
            name="author"
            placeholder="AUTHOR"
          />
        )}
        :{!isEditing && <span style={{ color: 'white' }}> {content}</span>}
        {isEditing && (
          <input
            onChange={(e) => setContent(e.target.value)}
            value={editedContent}
            type="text"
            name="content"
            placeholder="CONTENT"
          />
        )}
      </span>
      <span className="comment-buttons">
        <button onClick={handleEdit}>{isEditing ? 'SUBMIT' : 'EDIT'}</button>
        <button onClick={handleDelete}>DELETE</button>
      </span>
    </div>
  );
};

Comment.propTypes = {
  id: string.isRequired,
  content: string.isRequired,
  commentId: string.isRequired,
  getPostsAgain: func,
};

export default Comment;
