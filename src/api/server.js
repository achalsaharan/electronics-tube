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
            });

            server.create('video', {
                videoId: '4d073Hl9cyc',
                name: 'Stephen Curry Mix - "Stole The Show" ',
                notes: [],
                views: '135,677',
                date: 'Jan 19, 2021 ',
            });

            server.create('video', {
                videoId: 'InVDXJCHLww',
                name: 'Internships or Not',
                notes: [],
                views: '135,677',
                date: 'Jan 19, 2021 ',
            });

            server.create('video', {
                videoId: 'MMEIVh49pS8',
                name: 'Getting started with Git, VSCode and Hosting',
                notes: [],
                views: '135,677',
                date: 'Jan 19, 2021 ',
            });

            server.create('likedVideo', {
                videoId: '4d073Hl9cyc',
                name: 'Stephen Curry Mix - "Stole The Show" ',
                notes: [],
                views: '135,677',
                date: 'Jan 19, 2021 ',
            });
        },
    });
}
