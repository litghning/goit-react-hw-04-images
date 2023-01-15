import { useState } from "react";
 import ImageGalleryItem from '../ImageGalleryItem';
 import Loader from '../Loader';
 import { ImageGalleryList } from './ImageGallery.styled';
 import Modal from '../Modal';


const ImageGallery = ({ images }) => {
      const [showModal, setShowModal] = useState (false);
      const [modalImg, setModalImg] = useState('');
      const [tag, setTag] = useState('');
      const [isLoading, setIsLoading] = useState(false);
     
    const toggleModal = () => {
      setShowModal(showModal => !showModal);
      setIsLoading(isLoading => !isLoading);
      };
    
      const openModalImg = (largeImageURL, tag) => {
        toggleModal();
        setModalImg (largeImageURL);
        setTag(tag)
        
      };
        return (
          <>
            {isLoading && <Loader />}
            <ImageGalleryList>
              {images.map(({ id, webformatURL, largeImageURL, tag }) => (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  tag={tag}
                  onClick={() => openModalImg(largeImageURL, tag)}
                />
              ))}
            </ImageGalleryList>
            
            {showModal && (
              <Modal onClose={toggleModal}>
                <img src={modalImg} alt={tag} />
              </Modal>
            )}
          </>
        );
      }
    
export default ImageGallery;