import React, { useState, useEffect } from 'react';

import Artist from './Artist';

function SelectPopArtist() {
  const [artistQuery, setArtistQuery] = useState('Whitney Houston');

  return (
    <div className='App'>
      <h1>Select Artist</h1>
      <div className='form'>
        <select
          id='selectedArtist'
          onChange={event => setArtistQuery(event.target.value)}
          value={artistQuery}
        >
          <option value='Whitney Houston'>Whitney Houston</option>
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

export default SelectPopArtist;
