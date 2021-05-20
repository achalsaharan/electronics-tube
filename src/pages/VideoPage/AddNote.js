import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthentication } from '../../contexts/AuthenticationContext';

const API = 'http://localhost:3998';

export function AddNote({ video, dispatch, notes, setNotes }) {
    const [noteBody, setNoteBody] = useState('');
    const [noteHeading, setNoteHeading] = useState('');

    const {
        state: { userId },
    } = useAuthentication();

    async function addNote() {
        try {
            const res = await axios.post(`${API}/notes`, {
                userId,
                videoId: video._id,
                heading: noteHeading,
                content: noteBody,
            });

            if (res.data.success === true) {
                setNotes([...notes, res.data.note]);
                setNoteHeading('');
                setNoteBody('');
            } else {
                toast.error('error adding notes');
            }
        } catch (err) {
            toast.error('error adding notes');
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
                    onClick={addNote}
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
