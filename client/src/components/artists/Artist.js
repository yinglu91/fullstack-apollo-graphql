import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Tracks from './Tracks';

const Artist = ({ artistName }) => {
  const GET_ARTIST = gql`
    query getArtist($artistName: String!) {
      artist(name: $artistName) {
        name
        image
        followers
        id
        followers
        tracks {
          name
          image
          previewUrl
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_ARTIST, {
    variables: { artistName }
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p style={{ color: 'red' }}>ERROR</p>;

  if (!data.artist) return null;

  const { image, name, followers, tracks } = data.artist;

  return (
    <>
      <div>
        <h3>{name}</h3>
        <p>{followers} followers</p>

        <img
          src={image}
          alt='artist-profile'
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            objectFit: 'cover'
          }}
        />
      </div>

      <Tracks tracks={tracks} />
    </>
  );
};

export default Artist;
