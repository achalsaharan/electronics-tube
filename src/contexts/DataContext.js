import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
export const DataContext = createContext();

const initialStateFromAPI = {
    videos: [
        {
            id: 'Zp8a0IskmkE',
            name: 'Startups vs Service Companies',
            notes: [
                { heading: 'Note heading', body: 'note body' },
                { heading: 'Note heading 2', body: 'note body 2' },
            ],
            views: '135,677',
            date: 'Jan 19, 2021 ',
        },
        {
            id: '4d073Hl9cyc',
            name: 'Stephen Curry Mix - "Stole The Show" ',
            notes: [],
            views: '135,677',
            date: 'Jan 19, 2021 ',
        },
        {
            id: 'InVDXJCHLww',
            name: 'Internships or Not',
            notes: [],
            views: '135,677',
            date: 'Jan 19, 2021 ',
        },
        {
            id: 'MMEIVh49pS8',
            name: 'Getting started with Git, VSCode and Hosting',
            notes: [],
            views: '135,677',
            date: 'Jan 19, 2021 ',
        },
    ],

    playlists: {
        'watch later': ['InVDXJCHLww'],
    },
};

function dataReducer(state, action) {
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

        default:
            console.log('err in data reducer');
            break;
    }
}

export function DataProvider({ children }) {
    const [state, dispatch] = useReducer(dataReducer, {
        videos: [],
        playLists: { 'watch later': [] },
        likedVideos: [],
    });

    useEffect(() => {
        async function getDataFromServer() {
            const videosData = await axios.get('/api/videos');
            const likedVideosData = await axios.get('/api/likedVideos');

            const state = {
                videos: videosData.data.videos,
                likedVideos: likedVideosData.data.likedVideos,
            };

            dispatch({ type: 'SET_STATE', payload: state });
        }

        getDataFromServer();
        // dispatch({ type: 'SET_STATE', payload: initialStateFromAPI });
    }, []);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
