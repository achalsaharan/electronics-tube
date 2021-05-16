import { VideoGrid } from '../../components/VideoGrid';
import { useData } from '../../contexts/DataContext';

export function WatchLaterPage() {
    const {
        state: { playLists },
    } = useData();

    const videos = playLists.find(
        (playList) => playList.name === 'watch later'
    );

    return (
        <>
            <h1 className="ml-2 mr-2 mb-3 text-2xl text-gray-700 mx-auto font-semibold border-b-2">
                Watch Later <i className="far fa-clock"></i>
            </h1>

            <VideoGrid videos={videos.videos} />
        </>
    );
}
