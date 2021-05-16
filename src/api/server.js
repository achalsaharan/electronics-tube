import { createServer, Model, RestSerializer } from 'miragejs';
import faker from 'faker';

faker.seed(28);

export function setupMockServer() {
    createServer({
        serializers: {
            application: RestSerializer,
        },

        models: {
            video: Model,
            playList: Model,
            likedVideo: Model,
        },

        routes() {
            this.namespace = 'api';
            this.timing = 200;
            this.resource('videos');
            this.resource('playLists');
            this.resource('likedVideos');
        },

        seeds(server) {
            server.create('video', {
                videoId: 'Zp8a0IskmkE',
                name: 'Startups vs Service Companies',
                notes: [
                    { heading: 'Note heading', body: 'note body' },
                    { heading: 'Note heading 2', body: 'note body 2' },
                ],
                views: '135,677',
                date: 'Jan 19, 2021 ',
                thumbnailUrl:
                    'https://i.ytimg.com/vi/Zp8a0IskmkE/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBV2zNX1YGCjATbLxn4d9vZKYAuJA',
            });

            server.create('video', {
                videoId: '4d073Hl9cyc',
                name: 'Stephen Curry Mix - "Stole The Show" ',
                notes: [],
                views: '135,677',
                date: 'Jan 19, 2021 ',
                thumbnailUrl:
                    'https://i.ytimg.com/vi/4d073Hl9cyc/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB-MFty9jeejnDqEkpUd-uUzUEGHw',
            });

            server.create('video', {
                videoId: 'InVDXJCHLww',
                name: 'Internships or Not',
                notes: [],
                views: '135,677',
                date: 'Jan 19, 2021 ',
                thumbnailUrl:
                    'https://i.ytimg.com/vi/InVDXJCHLww/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA_4hmRSoft6Z6BfwpRBaCB3GOqRw',
            });

            server.create('video', {
                videoId: 'MMEIVh49pS8',
                name: 'Getting started with Git, VSCode and Hosting',
                notes: [],
                views: '135,677',
                date: 'Jan 19, 2021 ',
                thumbnailUrl:
                    'https://i.ytimg.com/vi/MMEIVh49pS8/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBDKfEsWQK31sPbe7ufjPgXLQJ7lw',
            });

            server.create('playList', {
                name: 'watch later',
                videos: [],
            });
        },
    });
}
