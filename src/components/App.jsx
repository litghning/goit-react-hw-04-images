import { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery/';
import Loader from './Loader';

import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import { MainApp } from './App.styled';
 import {fetchGallery} from '../Api/Api'
 import LoadMore from "./LoadMore";
 
export default function App  () {
 
  const [images, setImages] = useState ([]);
  const [imgSearch, setimgSearch] = useState ('');
  const [page, setPage] = useState (1);
  const [isLoading, setIsLoading] = useState (false);
  const [totalHits, setTotalHits] = useState (null);

  const searchFormSubmit = imgSearch => {
   setimgSearch(imgSearch); 
   setPage(1);
   setImages([]);
   setTotalHits(null);
    };
  

    useEffect(() => {
      const controller = new AbortController();
      if (imgSearch === '') {
        return;
      }
  

    async function getImages() {
    
       setIsLoading (true) 
      try {
        const images = await fetchGallery(
          imgSearch,
          page,
          controller
        );

        const altImages = images.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );

        if (images.totalHits === 0) {
          return toast.error('Sorry, didn`t find, try another');
        };
        if (page >= 2) {
          return (
            setImages (images => [...images, ...altImages]),
            setTotalHits (images.totalHits)
          )};
          setImages(altImages);
          setTotalHits(images.totalHits);
      
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading (false);
      }
    }
    getImages();
    return () => {
      controller.abort();
    };
    }, [imgSearch, page]);
  
    const loadMore = ()  => {
      setPage (page => page + 1)
    };
  
    const showBtnLoadMore = () => {
    const ShowBtn = totalHits - page * 12;
    if (ShowBtn > 0 && !isLoading) {
      return true;
    }
    return false;
    };

    return (
      <MainApp>
        <Searchbar onSearch={searchFormSubmit} />
        

        {totalHits > 0 ? <ImageGallery images={images} /> : null}

        {isLoading && <Loader />}
        {showBtnLoadMore() && <LoadMore onClick={loadMore} />}
        <ToastContainer />
      </MainApp>
    );
    };
    