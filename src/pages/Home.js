import axios from 'axios';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { useData } from '../contexts/DataContext';

export function Home() {
    const {
        state: { videos },
    } = useData();

    return (
        <>
            <SearchBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2 pb-10">
                {videos.map((item, key) => (
                    <VideoCard key={key} video={item} />
                ))}
            </div>
        </>
    );
}

function VideoCard({ video }) {
    const {
        state: { likedVideos },
        dispatch,
    } = useData();

    async function handleLikeClick() {
        try {
            if (isVideoLiked() === false) {
                const videoToPost = { ...video };
                delete videoToPost.id;
                const res = await axios.post('/api/likedVideos', {
                    likedVideo: videoToPost,
                });

                console.log(res);

                dispatch({ type: 'LIKE_VIDEO', payload: res.data.likedVideo });
            } else {
                const videoToDelete = likedVideos.find(
                    (item) => item.videoId === video.videoId
                );

                const res = await axios.delete(
                    `/api/likedVideos/${videoToDelete.id}`
                );

                console.log(res);

                dispatch({
                    type: 'UNLIKE_VIDEO',
                    payload: videoToDelete.videoId,
                });
            }
        } catch (error) {
            console.log('err in liking / disliking video', error);
        }
    }

    function isVideoLiked() {
        if (
            likedVideos.find((item) => item.videoId === video.videoId) ===
            undefined
        ) {
            return false;
        } else {
            return true;
        }
    }

    function onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const opts = {
        height: '300px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <div className="shadow-lg flex flex-col">
            <YouTube videoId={video.videoId} opts={opts} onReady={onReady} />
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h1 className="font-bold">{video.name}</h1>
                </div>

                <div className="flex flex-row pt-4 space-x-8">
                    <Link
                        className="focus:text-red-800 text-red-600"
                        to={`video/${video.videoId}`}
                    >
                        <i className="fas fa-play fa-lg "></i>
                    </Link>
                    <button
                        style={{
                            color:
                                likedVideos.find(
                                    (item) => item.videoId === video.videoId
                                ) === undefined
                                    ? 'black'
                                    : 'red',
                        }}
                        className="focus:text-red-800"
                        onClick={handleLikeClick}
                    >
                        <i className="fas fa-heart fa-lg"></i>
                    </button>
                    <button>
                        <i className="far fa-clock fa-lg"></i>
                    </button>
                    <button className="focus:text-red-800">
                        <i className="fas fa-list-ul fa-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

function SearchBar() {
    return (
        <div className="p-2 mx-3 rounded border-2 flex ring-red-300 mb-4 ring">
            <input
                type="text"
                placeholder="search"
                className="focus:outline-none w-full mr-2"
            />
            <button>
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}
