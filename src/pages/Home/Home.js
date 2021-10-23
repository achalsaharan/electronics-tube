import { useData } from '../../contexts/DataContext';

import { VideoGrid } from '../../components/VideoGrid';
import { SearchBar } from '../../components/SearchBar';
import { useEffect } from 'react';

export function Home() {
    const {
        dispatch,
        state: { videos },
    } = useData();

    return (
        <>
            <SearchBar />
            <VideoGrid videos={videos} />
        </>
    );
}
