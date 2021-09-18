import React, { useState, useEffect} from 'react'
import {DislikeTwoTone} from '@ant-design/icons';
import './styles.css';


// const thumbsDown = {
    
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     width: '85px',
//     height: '30px'
// }

function Dislikes() {
    const [disLikes, setDislikes] = useState(0);
    const [disable, setDisable] = useState(false);
    useEffect(() => {

    }, [disLikes]);

    const handleClick = () => {
        setDislikes(disLikes - 1);
        setDisable(true);
    }

    return (
        <div>
             <button disabled={disable} onClick={handleClick}
            ><DislikeTwoTone />
            <p id="downvote">This post has {disLikes} dislike(s)</p>
            </button>
        </div>
    )
}

export default Dislikes
