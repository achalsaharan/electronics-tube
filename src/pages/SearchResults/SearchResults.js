import { useData } from '../../contexts/DataContext';

import { VideoGrid } from '../../components/VideoGrid';
import { SearchBar } from '../../components/SearchBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function SearchResults() {
    const { search } = useParams();
    const {
        state: { videos },
    } = useData();
    const [videosToDisplay, setVideosToDisplay] = useState([]);

    useEffect(() => {
        const results = videos.filter((video) =>
            video.name.toLowerCase().includes(search.toLowerCase())
        );

        setVideosToDisplay(results);
    }, [search]);

    return (
        <>
            <SearchBar />
            {videosToDisplay.length === 0 ? (
                <h3 className="ml-4 mt-10 text-lg font-bold">
                    No Results Found, Try Seaching For Something Else.
                </h3>
            ) : (
                <VideoGrid videos={videosToDisplay} />
            )}
        </>
    );
}
