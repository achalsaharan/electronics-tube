import { useData } from '../../contexts/DataContext';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { useNavigate } from 'react-router-dom';

export function WatchLaterBtn({ video }) {
    const [showDescription, setShowDescription] = useState(false);

    const navigate = useNavigate();

    const {
        state: { userId },
    } = useAuthentication();

    const {
        state: { playLists },
        dispatch,
    } = useData();

    function isVideoInWatchList() {
        const watchLaterList = playLists.find(
            (list) => list.name === 'watch later'
        );

        if (
            watchLaterList.videos.find(
                (item) => item.videoId === video.videoId
            ) === undefined
        ) {
            return false;
        } else {
            return true;
        }
    }

    async function removeFromWatchList() {
        try {
            const playList = playLists.find(
                (list) => list.name === 'watch later'
            );

            const playListToPost = {
                ...playList,
                videos: playList.videos.filter(
                    (item) => item.videoId !== video.videoId
                ),
            };

            const res = await axios.post('/api/playLists', {
                playList: playListToPost,
            });

            if (res.status !== 201) {
                console.log('err in updating resource on the server');
                return;
            }

            toast.success('Removed From Watch Later');
            dispatch({
                type: 'REMOVE_VIDEO_FROM_PLAYLIST',
                payload: { name: 'watch later', video: video },
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function addToWatchList() {
        try {
            const playList = playLists.find(
                (list) => list.name === 'watch later'
            );

            const playListToPost = {
                ...playList,
                videos: [...playList.videos, video],
            };

            const res = await axios.post('/api/playLists', {
                playList: playListToPost,
            });

            if (res.status !== 201) {
                console.log('err updating resource on the server');
                return;
            }

            toast.success('Added To Watch Later');
            dispatch({
                type: 'ADD_VIDEO_TO_PLAYLIST',
                payload: { name: 'watch later', video: video },
            });
        } catch (error) {
            console.log(error);
        }
    }

    function handleBtnClick() {
        if (userId === null) {
            navigate('/login');
            return;
        }

        if (isVideoInWatchList()) {
            removeFromWatchList();
        } else {
            addToWatchList();
        }
    }

    return (
        <button
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
            className="focus:text-red-800"
        >
            <i
                onClick={handleBtnClick}
                className="far fa-clock fa-lg"
                style={{ color: isVideoInWatchList() ? '#3B82F6' : 'black' }}
            ></i>
            {showDescription && (
                <div className="absolute bg-gray-300 p-1 rounded hidden sm:block text-black">
                    Watch Later
                </div>
            )}
        </button>
    );
}
