import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import {
    AddToPlayListBtn,
    LikeVideoBtn,
    WatchLaterBtn,
} from '../components/buttons';

export function VideoGrid({ videos }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 pb-2">
            {videos.map((item, key) => (
                <VideoCard key={key} video={item} />
            ))}
        </div>
    );
}

function VideoCard({ video }) {
    // function onReady(event) {
    //     // access to player in all event handlers via event.target
    //     event.target.pauseVideo();
    // }

    // const opts = {
    //     height: '300px',
    //     width: '100%',
    //     playerVars: {
    //         // https://developers.google.com/youtube/player_parameters
    //         autoplay: 1,
    //     },
    // };

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
                </div>
            </div>
        </div>
    );
}
