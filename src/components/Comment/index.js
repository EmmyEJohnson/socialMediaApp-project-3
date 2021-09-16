import React, { useState } from 'react';
import * as MemePostService from '../../api/MemePostService';
import { func, string } from 'prop-types';

const Comment = ({ id, author, body, getCommentsAgain, commentId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedAuthor, setAuthor] = useState(author);
    const [editedBody, setBody] = useState(body);

    const handleEdit = async () => {
        setIsEditing(!isEditing);

        if(isEditing) {
            let editedPost = {
                author: editedAuthor,
                body: editedBody,
            };
            await MemePostService.updateComment( id, CommentId, editedPost);
            getCommentsAgain(id);
        }
    }

    const handleDelete = async () => {
        await MemePostService.removeComment(id, commentId);
        getCommentsAgain(id);
    }

    return (
        <div className='comment'>
            <span className="entry">
                    {!isEditing && <b>{author}</b>}
                    {isEditing && (
                        <input
                            onChange={(e) => setAuthor(e.target.value)}
                            value={editedAuthor}
                            type="text"
                            name="author"
                            placeholder="AUTHOR"
                        />
                    )}
                    :
                    {!isEditing && <span> {body}</span>}
                    {isEditing && (
                        <input
                            onChange={(e) => setBody(e.target.value)}
                            value={editedBody}
                            type="text"
                            name="body"
                            placeholder="BODY GOES HERE"
                        />
                    )}
            </span>
            <span className="comment-buttons">
                <button onClick={handleEdit}>
                    {isEditing ? "SUBMIT" : "EDIT"}
                </button>
                <button onClick={handleDelete}>DELETE</button>
            </span>
        </div>
    )
}

Comment.propTypes = {
    id: string.isRequired,
    author: string.isRequired,
    body: string.isRequired,
    commentId: string.isRequired,
    getPostsAgain: func,
};


export default Comment