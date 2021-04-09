import axios from 'axios';
import { useData } from '../../contexts/DataContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function LikeVideoBtn({ video }) {
    const [showDescription, setShowDescription] = useState(false);

    const {
        state: { likedVideos },
        dispatch,
    } = useData();

    async function likeVideo() {
        try {
            const videoToPost = { ...video };
            delete videoToPost.id;
            const res = await axios.post('/api/likedVideos', {
                likedVideo: videoToPost,
            });

            toast.success('Liked Video');

            dispatch({ type: 'LIKE_VIDEO', payload: res.data.likedVideo });
        } catch (error) {
            console.log(error);
        }
    }

    async function unlikeVideo() {
        try {
            const videoToDelete = likedVideos.find(
                (item) => item.videoId === video.videoId
            );

            const res = await axios.delete(
                `/api/likedVideos/${videoToDelete.id}`
            );

            toast.success('Unliked Video');

            dispatch({
                type: 'UNLIKE_VIDEO',
                payload: videoToDelete.videoId,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function handleLikeClick() {
        if (isVideoLiked() === false) {
            likeVideo();
        } else {
            unlikeVideo();
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

    return (
        <button
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
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
            {showDescription && (
                <div className="absolute bg-gray-300 p-1 rounded hidden sm:block text-black">
                    {isVideoLiked() ? 'Unlike Video' : 'Like Video'}
                </div>
            )}
        </button>
    );
}
