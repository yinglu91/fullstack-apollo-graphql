const {
    RESTDataSource
} = require('apollo-datasource-rest');

class ArtistAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://spotify-api-wrapper.appspot.com/';
    }

    // https://spotify-api-wrapper.appspot.com/artist/Whitney Houston
    async getArtistByName({
        artistName
    }) {
        const response = await this.get(`artist/${artistName}`);
        console.log(response);
        return this.artistReducer(response.artists.items[0]);
    }

    artistReducer(artist) {
        return {
            id: artist.id,
            name: artist.name,
            image: artist.images[1].url,
            followers: artist.followers.total
        };
    }

    // https://spotify-api-wrapper.appspot.com/artist/6XpaIBNiVzIetEPCWDvAFP/top-tracks
    async getTracksByArtistId({
        artistId
    }) {
        const response = await this.get(`artist/${artistId}/top-tracks`);
        console.log(response);
        return Array.isArray(response.tracks) ?
            response.tracks.map(track => this.trackReducer(track)) : [];

    }

    trackReducer(track) {
        return {
            name: track.name,
            image: track.album.images[0].url,
            previewUrl: track.preview_url
        };
    }
}

module.exports = ArtistAPI;