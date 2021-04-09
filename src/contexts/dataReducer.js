export function dataReducer(state, action) {
    switch (action.type) {
        case 'SET_STATE': {
            return { ...action.payload };
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
                    (video) => video.videoId !== action.payload
                ),
            };
        }

        case 'CREATE_NEW_PLAYLIST': {
            console.log({
                ...state,
                playLists: [...state.playLists, action.payload],
            });

            return {
                ...state,
                playLists: [...state.playLists, action.payload],
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
                                    video.videoId !==
                                    action.payload.video.videoId
                            ),
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
