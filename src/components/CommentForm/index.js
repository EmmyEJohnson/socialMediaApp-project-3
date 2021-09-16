import React, { useState } from 'react';
import * as MemePostService from '../../api/MemePostService'
import { func, string} from 'prop-types';

const CommentForm = ( { id, getCommentsAgain, getPostsAgain }) => {
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async () => {
        let newComment = { author, body, id };
        const res = await MemePostService.createComment(id, newComment);

        if (res.status === 201) {
            setAuthor("");
            setBody("");
            getCommentsAgain(id);
            getPostsAgain();
        } else {
            alert("Server Error =(")
        }
    };

    return (
        <div className="CommentForm-inputs">
            <input
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                type="text"
                name="author"
                placeholder="AUTHOR"
            />
            <input
                onChange={(e) => setBody(e.target.value)}
                value={body}
                type='text'
                name='body'
                placeholder='Comment Here'
            />
            <button onClick={handleSubmit}>Add Comment</button>
            
        </div>
    )
}

CommentForm.prototype = {
    id: string.isRequired,
    getPostsAgain: func,
};

export default CommentForm
