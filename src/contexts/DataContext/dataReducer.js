export function dataReducer(state, action) {
    switch (action.type) {
        case 'SET_STATE': {
            return { ...action.payload };
        }

        case 'SET_VIDEOS': {
            return { ...state, videos: action.payload };
        }

        case 'SET_VIDEOS_TO_DISPLAY': {
            return { ...state, videosToDisplay: action.payload };
        }

        case 'SET_LIKED_VIDEOS': {
            return { ...state, likedVideos: action.payload };
        }

        case 'SET_PLAYLISTS': {
            return { ...state, playLists: action.payload };
        }

        case 'ADD_NOTE': {
            const newState = {
                ...state,
                videos: state.videos.map((video) => {
                    if (video.id === action.payload.videoId) {
                        return {
                            ...video,
                            notes: [...video.notes, action.payload.note],
                        };
                    } else {
                        return video;
                    }
                }),
            };

            return newState;
        }

        case 'LIKE_VIDEO': {
            return {
                ...state,
                likedVideos: [...state.likedVideos, action.payload],
            };
        }

        case 'UNLIKE_VIDEO': {
            return {
                ...state,
                likedVideos: state.likedVideos.filter(
                    (video) => video._id !== action.payload
                ),
            };
        }

        case 'CREATE_NEW_PLAYLIST': {
            return {
                ...state,
                playLists: [...state.playLists, action.payload],
            };
        }

        case 'DELETE_PLAYLIST': {
            return {
                ...state,
                playLists: state.playLists.filter(
                    (playList) => playList._id !== action.payload
                ),
            };
        }

        case 'ADD_VIDEO_TO_PLAYLIST': {
            return {
                ...state,
                playLists: state.playLists.map((playList) => {
                    if (playList.name === action.payload.name) {
                        return {
                            ...playList,
                            videos: [...playList.videos, action.payload.video],
                        };
                    } else {
                        return playList;
                    }
                }),
            };
        }

        case 'REMOVE_VIDEO_FROM_PLAYLIST': {
            return {
                ...state,
                playLists: state.playLists.map((playList) => {
                    if (playList.name === action.payload.name) {
                        return {
                            ...playList,
                            videos: playList.videos.filter(
                                (video) =>
                                    video._id !== action.payload.video._id
                            ),
                        };
                    } else {
                        return { ...playList };
                    }
                }),
            };
        }

        case 'RENAME_PLAYLIST': {
            console.log({
                ...state,
                playLists: state.playLists.map((playList) => {
                    if (playList.name === action.payload.name) {
                        return {
                            ...playList,
                            name: action.payload.newName,
                        };
                    } else {
                        return { ...playList };
                    }
                }),
            });

            return {
                ...state,
                playLists: state.playLists.map((playList) => {
                    if (playList.name === action.payload.name) {
                        return {
                            ...playList,
                            name: action.payload.newName,
                        };
                    } else {
                        return { ...playList };
                    }
                }),
            };
        }

        default:
            console.log('err in data reducer');
            break;
    }
}
