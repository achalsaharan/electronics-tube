import { useState } from 'react';
import { toast } from 'react-toastify';
import { useData } from '../../contexts/DataContext';

export function AddToPlayListBtn({ video }) {
    const [showDescription, setShowDescription] = useState(false);
    const [showPlayListModal, setShowPlayListModal] = useState(false);
    return (
        <>
            <button
                onMouseEnter={() => setShowDescription(true)}
                onMouseLeave={() => setShowDescription(false)}
                onClick={() => setShowPlayListModal(true)}
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
        state: { playLists },
        dispatch,
    } = useData();

    function addVideoToPlayList(playList) {
        toast.success(`Video removed from ${playList.name}`);
        dispatch({
            type: 'REMOVE_VIDEO_FROM_PLAYLIST',
            payload: { name: playList.name, video: video },
        });
    }

    function removeVideoFromPlayList(playList) {
        toast.success(`Video added to ${playList.name}`);
        dispatch({
            type: 'ADD_VIDEO_TO_PLAYLIST',
            payload: { name: playList.name, video: video },
        });
    }

    async function addNewPlayList() {
        if (playLists.find((list) => list.name === newPlayListName)) {
            toast.error('Play List Already Exists, try using another name');
            return;
        }
        setNewPlayListName('');
        dispatch({
            type: 'CREATE_NEW_PLAYLIST',
            payload: { name: newPlayListName, videos: [] },
        });
    }

    function isVideoInPlayList(playList) {
        if (
            playList.videos.find((item) => item.videoId === video.videoId) !==
            undefined
        ) {
            return true;
        } else {
            return false;
        }
    }

    async function handleCheckBoxChange(playList) {
        try {
            if (isVideoInPlayList(playList)) {
                addVideoToPlayList(playList);
            } else {
                removeVideoFromPlayList(playList);
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
                            key={playList.id}
                            className="flex items-center justify-between py-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="mr-6"
                                onChange={() => handleCheckBoxChange(playList)}
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
