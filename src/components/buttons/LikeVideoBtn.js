import axios from 'axios';
import { useData } from '../../contexts/DataContext';

export function LikeVideoBtn({ video }) {
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

    return (
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
    );
}
