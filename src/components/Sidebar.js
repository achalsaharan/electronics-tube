import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

export function Sidebar({ setRoute }) {
    const {
        state: { playLists },
    } = useData();
    return (
        <div className="flex flex-col divide-y divide-red-100 h-screen md:sticky md:top-16 md:h-auto">
            <Link
                className="hover:bg-red-100 p-2 rounded flex items-center"
                to="/"
            >
                <i className="fas fa-home mr-2"></i>
                Home
            </Link>

            <Link
                className="hover:bg-red-100 p-2 rounded flex items-center"
                to="/likedVideos"
            >
                <i className="fas fa-heart mr-2"></i>
                Liked Videos
            </Link>

            <div className="flex flex-col">
                <div className=" p-2 rounded flex items-center">
                    <i className="fas fa-list-ul mr-2"></i>
                    Play Lists
                </div>

                <div className="flex flex-col ml-4 space-y-1 mr-4 mb-2">
                    {playLists.map((playList) => (
                        <Link
                            key={playList.name}
                            className="flex hover:bg-red-100 p-1 rounded font-light items-center"
                            to={`/playList/${playList.name}`}
                        >
                            <i className="fas fa-dot-circle fa-xs mr-2"></i>
                            {playList.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
