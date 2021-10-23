import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useData } from '../../contexts/DataContext';

import { VideoWindow } from './VideoWindow';
import { AddNote } from './AddNote';
import { Notes } from './Notes';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { toast } from 'react-toastify';
import axios from 'axios';

import { API } from '../../constants';
// const API = 'http://localhost:3998';

export function VideoPage() {
    const { videoId } = useParams();

    const {
        state: { videos },
        dispatch,
    } = useData();

    const {
        state: { userId },
    } = useAuthentication();

    const [video, setVideo] = useState({
        name: '',
        views: '',
        data: '',
        _id: null,
        videoId: '',
    });

    const [notes, setNotes] = useState([]);

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
    }, [videos]);

    useEffect(() => {
        async function getNotes() {
            try {
                const res = await axios.get(
                    `${API}/notes/users/${userId}/${video._id}`
                );

                if (res.data.success === true) {
                    setNotes(res.data.notes);
                } else {
                    toast.error('error getting notes');
                }
            } catch (error) {
                toast.error(error);
            }
        }

        if (userId && video._id) {
            getNotes();
        }
    }, [video, userId]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <VideoWindow video={video} />
            {userId && (
                <div className="flex flex-col grid-cols-1 px-2 pt-2 space-y-2 mb-5 md:mb-0 md:pt-0 md:col-span-1">
                    <AddNote
                        video={video}
                        dispatch={dispatch}
                        notes={notes}
                        setNotes={setNotes}
                    />
                    <div className="flex-grow">
                        <Notes notes={notes} />
                    </div>
                </div>
            )}
        </div>
    );
}
