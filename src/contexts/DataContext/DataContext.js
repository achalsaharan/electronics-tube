import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { dataReducer } from './dataReducer';
import { useAuthentication } from '../AuthenticationContext';

import { API } from '../../constants';

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [state, dispatch] = useReducer(dataReducer, {
        videos: [],
        playLists: [{ name: 'watch later', videos: [] }],
        likedVideos: [],
    });

    const {
        state: { userId },
    } = useAuthentication();

    //getting videos
    useEffect(() => {
        async function getVideos() {
            try {
                const res = await axios.get(`${API}/videos`);
                const videos = res.data.videos;
                dispatch({ type: 'SET_VIDEOS', payload: videos });
            } catch (error) {
                console.error(error);
            }
        }

        getVideos();
    }, []);

    //getting videos
    useEffect(() => {
        async function getLikedVideos() {
            try {
                const res = await axios.get(`${API}/likedvideos/${userId}`);
                const videos = res.data.videos;
                dispatch({ type: 'SET_LIKED_VIDEOS', payload: videos });
            } catch (error) {
                console.error(error);
            }
        }

        if (userId !== null) {
            getLikedVideos();
        }
    }, [userId]);

    //getting play lists
    useEffect(() => {
        async function getPlayLists() {
            try {
                const res = await axios.get(`${API}/playlists/users/${userId}`);
                // console.log({ playLists: res.data.playLists });
                dispatch({
                    type: 'SET_PLAYLISTS',
                    payload: res.data.playLists,
                });
            } catch (error) {
                console.error('play lists -> ', error);
            }
        }
        if (userId !== null) {
            getPlayLists();
        }
    }, [userId]);

    // useEffect(() => {
    //     async function getDataFromServer() {
    //         try {
    //             const videosData = await axios.get('/api/videos');
    //             const likedVideosData = await axios.get('/api/likedVideos');
    //             const playListData = await axios.get('/api/playLists');

    //             const state = {
    //                 videos: videosData.data.videos,
    //                 likedVideos: likedVideosData.data.likedVideos,
    //                 playLists: playListData.data.playLists,
    //             };

    //             dispatch({ type: 'SET_STATE', payload: state });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     getDataFromServer();
    // }, []);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
