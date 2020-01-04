import React, { useState, useEffect } from 'react';
import Artist from './Artist';

function SelectArtist() {
  const [artistQuery, setArtistQuery] = useState('Maria Callas');

  return (
    <div className='App'>
      <h1>Select Artist</h1>
      <div className='form'>
        <select
          id='selectedArtist'
          onChange={event => setArtistQuery(event.target.value)}
          value={artistQuery}
        >
          <option value='Maria Callas'>Maria Callas</option>
          <option value='Luciano Pavarotti'>Luciano Pavarotti</option>
          <option value='Joan Sutherland'>Joan Sutherland</option>
          <option value='Renata Tebaldi'>Renata Tebaldi</option>
          <option value='Montserrat Caballe'>Montserrat Caballé</option>
        </select>
      </div>

      {artistQuery && <Artist artistName={artistQuery} />}
    </div>
  );
}

export default SelectArtist;
