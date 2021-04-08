import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import YouTube from 'react-youtube';
import { useData } from '../contexts/DataContext';
import {
    PlayVideoBtn,
    AddToPlayListBtn,
    LikeVideoBtn,
    WatchLaterBtn,
} from '../components/buttons';

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
        <div>
            <VideoWindow video={video} />

            <div className="grid grid-cols-1 px-2 pt-2 space-y-2 mb-5">
                <AddNote video={video} dispatch={dispatch} />

                <Notes notes={video.notes} />
            </div>
        </div>
    );
}

function VideoWindow({ video }) {
    function onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const opts = {
        height: '350px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <div className="flex flex-col px-2">
            <YouTube videoId={video.videoId} opts={opts} onReady={onReady} />
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

function AddNote({ video, dispatch }) {
    const [noteBody, setNoteBody] = useState('');
    const [noteHeading, setNoteHeading] = useState('');

    async function handleAddClick() {
        try {
            const videoToPost = {
                ...video,
                notes: [
                    ...video.notes,
                    { heading: noteHeading, body: noteBody },
                ],
            };

            const res = await axios.put(`/api/videos/${video.id}`, {
                video: videoToPost,
            });
            console.log(res);

            dispatch({
                type: 'ADD_NOTE',
                payload: {
                    videoId: video.id,
                    note: { heading: noteHeading, body: noteBody },
                },
            });
            setNoteHeading('');
            setNoteBody('');
        } catch (err) {
            //TODO add toast here
            console.log('err adding note');
        }
    }

    return (
        <div className="bg-gray-100 p-2 flex flex-col space-y-2">
            <div className="flex">
                <input
                    className="w-9/12 ring-2 ring-red-200 focus:ring-red-300 focus:outline-none rounded p-1"
                    type="text"
                    placeholder="Heading / Time"
                    value={noteHeading}
                    onChange={(e) => setNoteHeading(e.target.value)}
                />
                <button
                    className="bg-red-500 px-2 py-1 rounded text-gray-50 ml-2"
                    onClick={handleAddClick}
                >
                    {/* <i className="fas fa-plus"></i> */}
                    Add Note
                </button>
            </div>
            <textarea
                className="ring-2 ring-red-200 focus:ring-red-300 focus:outline-none p-1 rounded"
                type="text"
                rows="3"
                placeholder="Enter Note"
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
            />
        </div>
    );
}

function Notes({ notes }) {
    return (
        <div className="bg-gray-100 px-2 py-1 mb-5">
            <h1 className="font-bold text-lg pb-2">Notes Preview</h1>
            {notes.map((note, idx) => (
                <Note note={note} key={idx} />
            ))}
        </div>
    );
    return;
}

function Note({ note }) {
    return (
        <div className="pb-2">
            <h1>{note.heading}</h1>
            <p className="font-light">{note.body}</p>
        </div>
    );
}
