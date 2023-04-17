import { useState } from 'react';
import css from './app.module.css';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [value, setValue] = useState('');

  const handleSearchFormSubmit = value => {
    setValue(value);
  };

  const resetValue = value => {
    setValue('');
  };

  return (
    <div className={css.App}>
      <SearchBar onSubmit={handleSearchFormSubmit} />
      <ImageGallery value={value} onResetValue={resetValue} />
    </div>
  );
};
