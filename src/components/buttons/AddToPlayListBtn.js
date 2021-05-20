import { useState } from 'react';
import { toast } from 'react-toastify';
import { useData } from '../../contexts/DataContext';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API } from '../../constants';

export function AddToPlayListBtn({ video }) {
    const [showDescription, setShowDescription] = useState(false);
    const [showPlayListModal, setShowPlayListModal] = useState(false);

    const navigate = useNavigate();

    const {
        state: { userId },
    } = useAuthentication();

    return (
        <>
            <button
                onMouseEnter={() => setShowDescription(true)}
                onMouseLeave={() => setShowDescription(false)}
                onClick={() =>
                    userId !== null
                        ? setShowPlayListModal(true)
                        : navigate('/login', {
                              state: { from: 'play list btn' },
                          })
                }
                className="static"
            >
                <i className="fas fa-list-ul fa-lg"></i>
                {showDescription && (
                    <div className="hidden sm:block absolute bg-gray-300 p-1 rounded text-black">
                        Add To Play List
                    </div>
                )}
            </button>
            {showPlayListModal && (
                <PlayListModal
                    setShowPlayListModal={setShowPlayListModal}
                    video={video}
                />
            )}
        </>
    );
}

function PlayListModal({ setShowPlayListModal, video }) {
    const [newPlayListName, setNewPlayListName] = useState('');

    const {
        state: { userId },
    } = useAuthentication();

    const {
        state: { playLists },
        dispatch,
    } = useData();

    async function removeVideoFromPlayList(playList) {
        try {
            const res = await axios.delete(
                `${API}/playlists/${playList._id}/videos`,
                { data: { videoId: video._id } }
            );

            if (res.data.success === true) {
                dispatch({
                    type: 'REMOVE_VIDEO_FROM_PLAYLIST',
                    payload: { name: playList.name, video: video },
                });
                toast.success(`Video removed from ${playList.name}`);
            }
        } catch (error) {
            toast.error('error removing video from playlist');
        }
    }

    async function addVideoToPlayList(playList) {
        try {
            const res = await axios.post(
                `${API}/playlists/${playList._id}/videos`,
                {
                    videoId: video._id,
                }
            );

            if (res.data.success === true) {
                dispatch({
                    type: 'ADD_VIDEO_TO_PLAYLIST',
                    payload: { name: playList.name, video: video },
                });
                toast.success(`Video added to ${playList.name}`);
            }
        } catch (error) {
            toast.error('error adding video to playlist');
        }
    }

    async function addNewPlayList() {
        if (playLists.find((list) => list.name === newPlayListName)) {
            toast.error('Play List Already Exists, try using another name');
            return;
        }

        if (newPlayListName === '') {
            toast.error('Play List Name Can Not Be Left Empty');
            return;
        }

        setNewPlayListName('');

        const res = await axios.post(`${API}/playlists/users/${userId}`, {
            name: newPlayListName,
        });

        if (res.data.success === true) {
            dispatch({
                type: 'CREATE_NEW_PLAYLIST',
                payload: res.data.playList,
            });
        } else {
            toast.error('error in creating a new playlist');
        }
    }

    function isVideoInPlayList(playList) {
        if (
            playList.videos.find((item) => item._id === video._id) !== undefined
        ) {
            return true;
        } else {
            return false;
        }
    }

    async function togglePlayListMembership(playList) {
        try {
            if (isVideoInPlayList(playList)) {
                removeVideoFromPlayList(playList);
            } else {
                addVideoToPlayList(playList);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            id="modal"
            className=" flex justify-center items-center flex-col
            fixed w-screen h-screen bg-gray-800 
            bg-opacity-50 top-0 right-0"
            onClick={(e) =>
                e.target.id === 'modal' ? setShowPlayListModal(false) : null
            }
        >
            <div className="bg-gray-100 rounded py-2 px-4">
                <div className="flex justify-between items-center">
                    <h1>Add To Playlist...</h1>
                    <button
                        onClick={() => setShowPlayListModal(false)}
                        className="text-2xl"
                    >
                        &times;
                    </button>
                </div>

                <div className="flex flex-col divide-y divide-gray-400">
                    {playLists.map((playList) => (
                        <label
                            key={playList._id}
                            className="flex items-center justify-between py-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="mr-6"
                                onChange={() =>
                                    togglePlayListMembership(playList)
                                }
                                checked={isVideoInPlayList(playList)}
                            />
                            <p>{playList.name}</p>
                        </label>
                    ))}
                </div>

                <div className="mt-2 border-t border-black pt-2 ">
                    <input
                        className="px-2 py-1 ring-2 ring-red-200 focus:ring-red-300 focus:outline-none p-1 rounded"
                        type="text"
                        placeholder="Add New Playlist"
                        value={newPlayListName}
                        onChange={(e) => setNewPlayListName(e.target.value)}
                    />
                    <button
                        onClick={addNewPlayList}
                        className="px-2 py-1 ml-2 bg-red-500 rounded text-white"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
