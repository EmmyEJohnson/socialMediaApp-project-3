import React, { useState } from 'react';
import * as MemePostService from '../../api/MemePostService';
import axios from 'axios';

const Posts = () => {
  const [formData, setFormData] = useState('');
  const [info, setInfo] = useState({
    name: '',
    image: '',
    caption: '',
  });
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: '',
  });

  //upload the image
  const handleUpload = ({ target: { files } }) => {
    const data = new FormData();
    data.append('image', files[0]);
    data.append('name', files.name);
    data.append('caption', 'it is a caption yo');
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo({
      name: '',
      image: '',
      caption: '',
    });
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
          setInfo(res.data.memepost);
          setProgressPercent(0);
        }, 1000);
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
    <div
      style={{ width: '100vw', height: '100vh' }}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <h1>Posts</h1>
      {error.found && (
        <div
          className="alert alert-danger"
          role="alert"
          style={{ width: '359px' }}
        >
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ width: '359px' }}>
        <div className="progress mb-3 w-100">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {progressPercent}
          </div>
        </div>
        <div className="custom-file mb-3">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile04"
            aria-describedby="inputGroupFileAddon04"
            onChange={handleUpload}
          />
          <label className="custom-file-label" htmlFor="inputGroupFile04">
            Choose file
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {' '}
          Submit{' '}
        </button>
      </form>
      <img
        className="mt-3"
        src={`http://localhost:5000/${info.image}`}
        alt={`${info.name}`}
        style={{ width: '359px' }}
      />
      <p>{info.caption}</p>
    </div>
  );
};

export default Posts;
