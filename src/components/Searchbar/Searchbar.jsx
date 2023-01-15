import  { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSearch }) => {
  const [searchImgValue, setSearchImgValue] = useState('');
  const searchValueChange = e => {
    setSearchImgValue(e.currentTarget.value.toLowerCase() );
  };
  const searchSubmit = e => {
    e.preventDefault();

    if (searchImgValue.trim() === '') {
      toast.error('Please enter some world');
      return;
    }
    onSearch(searchImgValue);
    setSearchImgValue('');
  };
 
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={searchSubmit}>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={searchValueChange}
            value={searchImgValue}
          />

          <SearchFormButton type="submit">
            <ImSearch />
          </SearchFormButton>
        </SearchForm>
      </SearchbarHeader>
    );
  }


export default Searchbar;