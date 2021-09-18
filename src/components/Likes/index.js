import React, { useState, useEffect } from 'react'
import {LikeTwoTone} from '@ant-design/icons';
import './styles.css';

// const thumbsUp = {
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     width: '85px',
//     height: '25px'
// }

function Likes() {
    
    const [upVotes, setUpvotes] = useState(0);
    const [disable, setDisable] = useState(false);

    useEffect(() => {

    }, [upVotes]);

    const handleClick = () => {
        setUpvotes(upVotes + 1)
        setDisable(true)
    }


    return (
        <div>
            <button  disabled={disable} onClick={handleClick}
            ><LikeTwoTone />
            <p id="upvote">This post has {upVotes} like(s)!</p>
            </button>
        </div>
    )
}

export default Likes
