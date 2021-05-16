import { VideoGrid } from '../../components/VideoGrid';
import { useData } from '../../contexts/DataContext';

export function LikedVideosPage() {
    const {
        state: { likedVideos },
    } = useData();

    return (
        <>
            <h1 className="ml-2 mr-2 mb-3 text-2xl text-gray-700 mx-auto font-semibold border-b-2">
                Liked Videos <i className="fas fa-heart"></i>
            </h1>
            <VideoGrid videos={likedVideos} />
        </>
    );
}
