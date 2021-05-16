import { useData } from '../../contexts/DataContext';

import { VideoGrid } from '../../components/VideoGrid';

export function Home() {
    const {
        state: { videos },
    } = useData();

    return (
        <>
            <SearchBar />
            <VideoGrid videos={videos} />
        </>
    );
}

function SearchBar() {
    return (
        <div className="p-2 mx-3 rounded border-2 flex ring-red-300 mb-4 ring max-w-lg">
            <input
                type="text"
                placeholder="search"
                className="focus:outline-none w-full mr-2"
            />
            <button>
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}
