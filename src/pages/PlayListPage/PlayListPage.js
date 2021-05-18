import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { VideoGrid } from '../../components/VideoGrid';
import { useData } from '../../contexts/DataContext';
import { Navigate, useNavigate } from 'react-router-dom';

import { EditPlayListModal } from './EditPlayListModal';
import axios from 'axios';

const API = 'http://localhost:3998';

export function PlayListPage() {
    const { playListName } = useParams();

    const navigate = useNavigate();

    const [showEditMenu, setShowEditMenu] = useState(false);
    const [newPlayListName, setNewPlayListName] = useState('');

    const {
        state: { playLists },
        dispatch,
    } = useData();

    async function renamePlayList() {
        try {
            if (newPlayListName === '') {
                toast.error('Name Can Not Be Left Empty');
            }

            if (
                playLists.find((list) => list.name === newPlayListName) !==
                undefined
            ) {
                toast.error('Play List With This Name Already Exists');
                return;
            }

            const res = await axios.post(`${API}/playlists/${playList._id}`, {
                name: newPlayListName,
            });

            if (res.data.success === true) {
                dispatch({
                    type: 'RENAME_PLAYLIST',
                    payload: { name: playListName, newName: newPlayListName },
                });
            } else {
                toast.error('error renaming playlist');
            }
        } catch (error) {
            toast.error('error renaming playlist');
        }
    }

    async function deletePlayList() {
        try {
            const res = await axios.delete(`${API}/playlists/${playList._id}`);

            if (res.data.success === true) {
                navigate('/');
                dispatch({ type: 'DELETE_PLAYLIST', payload: playList._id });
            } else {
                console.log(res);
                toast.error('error in deleting playlist');
            }
        } catch (error) {
            toast.error('error in deleting playlist');
        }
    }

    const playList = playLists.find((list) => list.name === playListName);

    //this condition navigates the page to the newly renamed playlist on name change
    if (playList === undefined && newPlayListName !== '') {
        console.log('naviating from here');
        return <Navigate replace to={`/playList/${newPlayListName}`} />;
    }

    return (
        <div>
            <div className="ml-2 mr-2 mb-3 border-b-2 flex text-xl items-center space-x-8">
                <h1 className="text-2xl text-gray-700 font-semibold">
                    {playListName}
                </h1>
                <div className="static">
                    {playList.name !== 'watch later' && (
                        <button onClick={() => setShowEditMenu(!showEditMenu)}>
                            <i className="fas fa-pen ml-4 text-gray-700"></i>
                        </button>
                    )}

                    {showEditMenu && (
                        <EditPlayListModal
                            setShowEditMenu={setShowEditMenu}
                            renamePlayList={renamePlayList}
                            setNewPlayListName={setNewPlayListName}
                            deletePlayList={deletePlayList}
                        />
                    )}
                </div>
            </div>
            <VideoGrid videos={playList.videos} playList={playList} />
        </div>
    );
}
