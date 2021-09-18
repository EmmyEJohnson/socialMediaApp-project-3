import React, { useState } from 'react';
import * as MemePostService from '../../api/MemePostService';
import axios from 'axios';
import "./styles.css";

const PostsForm = ({getPostsAgain}) => {
  const [formData, setFormData] = useState('');
  const [info, setInfo] = useState({
    name: '',
    image: '',
    caption: '',
  });
  const [caption, setCaption] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: '',
  });

  //upload the image
  const handleUpload = ({ target: { files } }) => {
    const data = new FormData();
    // console.log(files);
    data.append('image', files[0]);
    data.append('name', files.name);
    data.append('caption', caption);
    // console.log(data);
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo({
      name: '',
      image: '',
      caption: '',
    });
    setCaption('');
    setProgressPercent(0);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setProgressPercent(percent);
      },
    };
    //MemePostService.createMemePost(formData);
    axios
      .post('http://localhost:5000/api/memeposts', formData, options)
      .then((res) => {
        console.log(res + ' frontend memepost axios');
        setTimeout(() => {
          console.log(res.data.memepost);
          setInfo(res.data.memepost);
          setCaption(res.data.caption);
          setProgressPercent(0);
        }, 1000);
        getPostsAgain();
      })
      .catch((err) => {
        console.log(err.response);
        setError({
          found: true,
          message: err.response.data.errors,
        });

        setTimeout(() => {
          setError({
            found: false,
            message: '',
          });
          setProgressPercent(0);
        }, 3000);
      });
  };
  return (
    <div>
    <form onSubmit={handleSubmit} className="PostsForm-inputs">
      <div>
      <textarea className="caption-input"
        onChange={(e)=> setCaption(e.target.value)}
        value={caption}
        type="text"
        rows="3"
        name="caption"
        placeholder="Enter a caption for your Meme-photo."
        style={{width: "300px"}}
        />
      </div>
  
      <div>
        <input className="choose-file"
        onChange={handleUpload}
        type="file"
        prompt="Upload Image"
        accept=".png, .jpeg, .jpg, .heic"
        /><br></br>
         <button type="submit" className="postform-submit-btn">
          {' '}
          Submit{' '}
        </button>
        {/* <img
        className="mt-3"
        src={`http://localhost:5000/${info.image}`}
        alt={`${info.name}`}
        style={{ width: '359px' }}
      />
      <p>{info.caption}</p> */}
      </div>
    </form>
    </div>
  )
}

export default PostsForm;