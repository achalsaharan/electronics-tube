import ReactPlayer from 'react-player/youtube';
import {
    PlayVideoBtn,
    AddToPlayListBtn,
    LikeVideoBtn,
    WatchLaterBtn,
} from '../../components/buttons';

export function VideoWindow({ video }) {
    return (
        <div className="flex flex-col px-2 md:col-span-2">
            {/* <YouTube videoId={video.videoId} opts={opts} onReady={onReady} /> */}
            <div className="h-60 sm:h-96">
                <ReactPlayer
                    playing={false}
                    width={'100%'}
                    url={`https://youtube.com/watch?v=${video.videoId}`}
                    height="100%"
                />
            </div>
            <div className="pt-4 pb-2 bg-gray-100 px-2">
                <h1 className="font-bold">{video.name}</h1>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-4 font-light text-xs">
                        <span>{video.views} views</span>
                        <span>{video.date}</span>
                    </div>

                    <div className="flex flex-row space-x-8">
                        <PlayVideoBtn />
                        <LikeVideoBtn video={video} />
                        <WatchLaterBtn video={video} />
                        <AddToPlayListBtn video={video} />
                    </div>
                </div>
            </div>
        </div>
    );
}
