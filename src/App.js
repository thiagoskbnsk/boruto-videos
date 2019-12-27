import React, { useState, useEffect } from 'react';
import { getVideos, getVideo } from './services/videos';
import Loading from './components/loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [videosUrl, setVideosUrl] = useState([]);
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    const getVideosFromStorage = global.localStorage.getItem('videos');

    if (getVideosFromStorage) {
      setVideos(JSON.parse(getVideosFromStorage));
      setIsLoading(false);
    } else {
      async function fetchVideoUrls() {
        const response = await getVideos();
  
        const videosLinks = response.map(video => {
          const [url, title] = video.split('" title="')
  
          return {
            url, title
          }
        });
  
        setVideosUrl(videosLinks);
      }
  
      fetchVideoUrls();
    }
  }, []);

  useEffect(() => {
    const haveVideos = videosUrl.length;
    if (haveVideos) { 
      async function fetchVideos() {
        const videosPromises = videosUrl.map(async ({ url, title }) => {
          const video = await getVideo(url);

          return { title, video };
        });
  
        const resolvePromises = await Promise.all(videosPromises).then(r => r);
        global.localStorage.setItem('videos', JSON.stringify(resolvePromises))
        setIsLoading(false);

        setVideos(resolvePromises);
      }
  
      fetchVideos();
      
    }
  }, [videosUrl])

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  function setVideoToModal(video) {
    setModal(false);

    setTimeout(() => {
      setVideo(video);
      setModal(true);
    }, 500)
  }

  return (
    <>
    {isLoading 
      ? <Loading />
      : (
        <ul>
          {videos.map(({ video, title}) => 
          <li key={video}>
            <h2>{title} <button type="button" onClick={() => setVideoToModal({video, title})}>Assistir</button></h2>
          </li>)}
        </ul>
      )}
      {
        modal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
            <button type="button" onClick={() => setModal(false)}>Fechar</button>
            <h2 style={{ color: '#fff'}}>{video.title}</h2>
            <video controls name="media" style={{ maxWidth: '600px'}}>
              <source src={video.video} type="video/mp4" />
            </video>
          </div>
        )
      }
    </>
  )
}

export default App;
