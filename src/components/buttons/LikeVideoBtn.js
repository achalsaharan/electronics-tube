import axios from 'axios';
import { useData } from '../../contexts/DataContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { useNavigate } from 'react-router-dom';

import { API } from '../../constants';

export function LikeVideoBtn({ video }) {
    const [showDescription, setShowDescription] = useState(false);

    const navigate = useNavigate();

    const {
        state: { userId },
    } = useAuthentication();

    const {
        state: { likedVideos },
        dispatch,
    } = useData();

    async function likeVideo() {
        try {
            const res = await axios.post(`${API}/likedvideos/${userId}`, {
                _id: video._id,
            });

            if (res.data.success === true) {
                toast.success('Liked Video');
                dispatch({ type: 'LIKE_VIDEO', payload: video });
            } else {
                toast.error('Error Liking Video');
                console.log(res);
            }
        } catch (error) {
            console.log(error);
            toast.error('error in the likeVideo function');
        }
    }

    async function unlikeVideo() {
        try {
            const res = await axios.delete(`${API}/likedvideos/${userId}`, {
                data: { _id: video._id },
            });

            if (res.data.success === true) {
                toast.success('unliked video');
                dispatch({ type: 'UNLIKE_VIDEO', payload: video._id });
            } else {
                toast.error('error in unliking video');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleLikeClick() {
        if (userId === null) {
            navigate('/login');
            return;
        }

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
