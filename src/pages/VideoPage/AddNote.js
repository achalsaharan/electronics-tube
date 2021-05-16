import axios from 'axios';
import { useEffect, useState } from 'react';

export function AddNote({ video, dispatch }) {
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
