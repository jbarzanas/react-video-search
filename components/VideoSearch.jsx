import React, { useState } from 'react';
import axios from 'axios';

function VideoSearch({ apiKey }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [videoId, setVideoId] = useState(null);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [commentLikes, setCommentLikes] = useState([]);

    const handleSearch = () => {
        axios
        .get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&key=${apiKey}&part=snippet&type=video`)
        .then((response) => {
            setVideoId(response.data.items[0].id.videoId);
            setVideoTitle(response.data.items[0].snippet.title);
            setVideoDescription(response.data.items[0].snippet.description);
            setRelatedVideos(response.data.items.slice(1, 5));
        })
        .catch((error) => console.log(error));
    };

    const handleVideoSelect = (selectedVideoId) => {
        setVideoId(selectedVideoId);
    };

    const handleCommentInput = (e) => {
        setCommentInput(e.target.value);
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        setComments([...comments, commentInput]);
        setCommentLikes([...commentLikes, { likes: 0, dislikes: 0 }]);
        setCommentInput('');
    };

    const handleLikeComment = (commentIndex) => {
        const updatedCommentLikes = [...commentLikes];
        updatedCommentLikes[commentIndex].likes += 1;
        setCommentLikes(updatedCommentLikes);
    };

    const handleDislikeComment = (commentIndex) => {
        const updatedCommentLikes = [...commentLikes];
        updatedCommentLikes[commentIndex].dislikes += 1;
        setCommentLikes(updatedCommentLikes);
    };

    const handleRelatedVideoSelect = () => {
        setComments([]);
        setCommentLikes([]);
    };
    

    return (
        <>
        <header>
            <h1>My<emphasis>Tube</emphasis></h1>
            <div className="search-container">
                <input className="search-input" type="text" placeholder="Search video here..." onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
        </header>
        <div className="video-container">
            {videoId ? (
            <>
                <iframe
                width="710"
                height="410"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
                <h4>{videoTitle}</h4>
                <p>{videoDescription}</p>
                <div className="comment-section">
                    <h4>Leave a Comment</h4>
                    <form onSubmit={handleSubmitComment}>
                        <input className="comment-bar" type="text" value={commentInput} onChange={handleCommentInput} />
                        <button className="add-comment" type="submit">Add Comment</button>
                    </form>
                    {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>{comment}</p>
                        <div className="comment-likes">
                            <button className="like-button" onClick={() => handleLikeComment(index)}>
                                <span role="img" aria-label="thumbs-up">👍</span>
                            </button>
                            <p>{commentLikes[index].likes}</p>
                            
                            <button className="dislike-button" onClick={() => handleDislikeComment(index)}>
                                <span role="img" aria-label="thumbs-down">👎</span>
                            </button>
                            <p>{commentLikes[index].dislikes}</p>
                        </div>
                    </div>
                ))}
                </div>
            </>
            ) : (
            <h2>No video selected</h2>
            )}
        </div>
        <div className="related-videos" onClick={handleRelatedVideoSelect}>
            {relatedVideos.map((video) => (
                <div key={video.id.videoId} onClick={() => handleVideoSelect(video.id.videoId)}>
                    <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                    <h4>{video.snippet.title}</h4>
                </div>
            ))}
        </div>
        </>
    );
};

export default VideoSearch;

