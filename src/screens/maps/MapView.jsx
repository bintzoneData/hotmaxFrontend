import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const InputLocation = ({ setSelectedPlace, inputClassName }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(async () => {
      // Create the autocomplete input field
      const input = document.getElementById('autocomplete-input');
      const autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'KE' }, // Restrict to Kenya (country code "KE")
      });

      // Add a listener for when a place is selected
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setSelectedPlace({
          name: place.name || '',
          formatted_address: place.formatted_address || '',
          latitude: place.geometry?.location?.lat() || null,
          longitude: place.geometry?.location?.lng() || null,
        });
      });
    });
  }, [setSelectedPlace]);

  return (
    <input
      id='autocomplete-input'
      type='text'
      placeholder='Enter a location in Kenya'
      className={inputClassName}
      style={{ width: '300px', padding: '10px' }}
      onChange={(e) => {
        if (e.target.value === '') setSelectedPlace(null);
        setValue('');
      }}
    />
  );
};

export default InputLocation;
