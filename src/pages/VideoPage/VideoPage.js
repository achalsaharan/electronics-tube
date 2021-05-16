import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useData } from '../../contexts/DataContext';

import { VideoWindow } from './VideoWindow';
import { AddNote } from './AddNote';
import { Notes } from './Notes';

export function VideoPage() {
    const { videoId } = useParams();

    const [video, setVideo] = useState({
        name: '',
        views: '',
        data: '',
        id: '',
        notes: [],
        videoId: '',
    });

    const {
        state,
        state: { videos },
        dispatch,
    } = useData();

    function findVideo() {
        const video = videos.find((video) => video.videoId === videoId);

        if (video === undefined) {
            return;
        } else {
            setVideo(video);
        }
    }

    useEffect(() => {
        findVideo();
    }, [state]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <VideoWindow video={video} />
            //TODO intgrate this functionality
            {/* <div className="flex flex-col grid-cols-1 px-2 pt-2 space-y-2 mb-5 md:mb-0 md:pt-0 md:col-span-1">
                <AddNote video={video} dispatch={dispatch} />
                <div className="flex-grow">
                    <Notes notes={video.notes} />
                </div>
            </div> */}
        </div>
    );
}
