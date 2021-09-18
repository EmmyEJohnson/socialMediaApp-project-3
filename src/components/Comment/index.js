import React, { useState } from 'react';
import * as MemePostService from '../../api/MemePostService';
import { func, string } from 'prop-types';
import './styles.css';

const Comment = ({ id, author, content, getCommentsAgain, commentId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAuthor, setAuthor] = useState(author);
  const [editedContent, setContent] = useState(content);

  const handleEdit = async () => {
    setIsEditing(!isEditing);

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
      <span className="entry" style={{ color: 'red' }}>
        {!isEditing && <b style={{ color: 'red' }}>{author}</b>}
        {isEditing && (
          <input className="author-comment"
            onChange={(e) => setAuthor(e.target.value)}
            value={editedAuthor}
            type="text"
            name="author"
            placeholder="Author"
          />
        )}
        :{!isEditing && <span style={{ color: 'white' }}> {content}</span>}
        {isEditing && (
          <input className="comment-content"
            onChange={(e) => setContent(e.target.value)}
            value={editedContent}
            type="text"
            name="content"
            placeholder="content"
          />
        )}
      </span>
      <span className="comment-buttons">
        <button className="submitEdit-comment-btns" onClick={handleEdit}>{isEditing ? 'Submit' : 'Edit'}</button>
        <button className="delete-comment-btn" onClick={handleDelete}> <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/02ad5b68-d8e9-4bc6-9936-fdd4c662840d/ddqllzr-dccc62bc-2191-452e-a973-98a8ab6a2379.png/v1/fill/w_408,h_408,strp/dumpster_fire_by_geosammy_ddqllzr-fullview.png" alt="Delete" width="30" height="30"/></button>
      </span>
    </div>
  );
};

Comment.propTypes = {
  id: string.isRequired,
  author: string.isRequired,
  content: string.isRequired,
  commentId: string.isRequired,
  getPostsAgain: func,
};

export default Comment;
