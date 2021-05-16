export function EditPlayListModal({
    setShowEditMenu,
    renamePlayList,
    setNewPlayListName,
}) {
    return (
        <div
            id="modal"
            className=" flex justify-center items-center flex-col
            fixed w-screen h-screen bg-gray-800 
            bg-opacity-50 top-0 right-0"
            onClick={(e) =>
                e.target.id === 'modal' ? setShowEditMenu(false) : null
            }
        >
            <div className="text-base bg-gray-300 p-4 absolute bg-opacity-90 rounded flex flex-col justify-items-stretch">
                <div className="flex space-x-2">
                    <input
                        className="focus:outline-none focus:ring-red-500 ring-2 ring-red-300 rounded px-1"
                        type="text"
                        placeholder="rename playlist...."
                        onChange={(e) => setNewPlayListName(e.target.value)}
                    />
                    <button
                        onClick={renamePlayList}
                        className="bg-red-500 text-gray-50 px-4 py-1 rounded"
                    >
                        Rename
                    </button>
                </div>

                <button className="bg-red-500 text-gray-50 px-4 py-1 rounded my-2">
                    Delete Play List <i className="far fa-trash-alt ml-2"></i>
                </button>
            </div>
        </div>
    );
}
