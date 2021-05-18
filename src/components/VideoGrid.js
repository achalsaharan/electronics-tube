import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { toast } from 'react-toastify';
import { useData } from '../contexts/DataContext';
// import { useAuthentication } from '../../contexts/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    AddToPlayListBtn,
    LikeVideoBtn,
    WatchLaterBtn,
} from '../components/buttons';

const API = 'http://localhost:3998';

export function VideoGrid({ videos, playList }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 pb-2">
            {console.log(playList)}
            {videos.map((item, key) => (
                <VideoCard key={key} video={item} playList={playList} />
            ))}
        </div>
    );
}

function VideoCard({ video, playList }) {
    const {
        state: { playLists },
        dispatch,
    } = useData();

    async function removeVideoFromPlayList(playList) {
        try {
            const res = await axios.delete(
                `${API}/playlists/${playList._id}/videos`,
                { data: { videoId: video._id } }
            );

            if (res.data.success === true) {
                dispatch({
                    type: 'REMOVE_VIDEO_FROM_PLAYLIST',
                    payload: { name: playList.name, video: video },
                });
                toast.success(`Video removed from ${playList.name}`);
            }
        } catch (error) {
            toast.error('error removing video from playlist');
        }
    }
    return (
        <div className="shadow-lg flex flex-col">
            {/* <YouTube videoId={video.videoId} opts={opts} onReady={onReady} /> */}
            <img src={video.thumbnailUrl} height="auto" width="100%" />
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h1 className="font-bold">{video.name}</h1>
                </div>

                <div className="flex flex-row pt-4 space-x-8">
                    <Link
                        className="focus:text-red-800 text-red-600"
                        to={`/video/${video.videoId}`}
                    >
                        <i className="fas fa-play fa-lg "></i>
                    </Link>
                    <LikeVideoBtn video={video} />
                    <WatchLaterBtn video={video} />
                    <AddToPlayListBtn video={video} />
                    {playList !== undefined ? (
                        <button
                            onClick={() => removeVideoFromPlayList(playList)}
                        >
                            <i class="fas fa-trash fa-lg"></i>
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
