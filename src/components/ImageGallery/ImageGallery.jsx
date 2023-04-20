import { ButtonLoadMore } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import css from './image-gallery.module.css';
import imagesAPI from '../sources/pixabay';

export const ImageGallery = props => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('null');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(props.value);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query !== props.value) {
      setStatus('pending');
      setIsLoading(true);
      setPage(1);

      setTimeout(() => {
        imagesAPI
          .fetchImages(props.value, page)
          .then(({ hits, totalHits }) => {
            setImages([...hits]);
            setQuery(props.value);
            setShowLoadMore(page < Math.ceil(totalHits / 12));
            setStatus('resolved');
          })
          .catch(error => {
            setError(error);
            setStatus('rejected');
          })
          .finally(() => setIsLoading(false));
      }, 1500);
    }
  }, [page, props.value, query]);

  const imagesClear = () => {
    setImages([]);
  };

  const onLoad = () => {
    setPage(prevState => prevState + 1);
    console.log(page);
    imagesAPI.fetchImages(props.value, page + 1).then(pictures => {
      // setPage(prevState => prevState + 1);
      setImages(prevState => [...prevState, ...pictures.hits]);
    });
    console.log(page);
    console.log(props.value);
    console.log(images);
  };

  if (status === 'idle') {
    return <div></div>;
  }

  if (status === 'pending') {
    return <Loader clearImages={imagesClear} />;
  }

  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }

  if (status === 'resolved') {
    return (
      <>
        <div className={css.ImageGallery}>
          {images.map(hit => {
            return (
              <ImageGalleryItem
                key={hit.id}
                smallImage={hit.webformatURL}
                largeImage={hit.largeImageURL}
                tags={hit.tags}
              />
            );
          })}
        </div>
        {!isLoading && showLoadMore && <ButtonLoadMore onLoad={onLoad} />}
      </>
    );
  }
};

// export class OldImageGallery extends Component {
//   state = {
//     images: [],
//     error: 'null',
//     status: 'idle',
//     page: 1,
//   };

// componentDidUpdate(PrevProps, PrevState) {
//   const prevValue = PrevProps.value;
//   const nextValue = this.props.value;

//   if (prevValue !== nextValue) {
//     console.log('Изменился запрос');

//     this.setState({ status: 'pending', page: 1 });

//     setTimeout(() => {
//       imagesAPI
//         .fetchImages(nextValue, this.state.page)
//         .then(pictures => {
//           console.log(pictures.hits);
//           this.setState(prevState => ({
//             images: [...pictures.hits],
//             status: 'resolved',
//           }));
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }, 1500);
//   }
// }

//   imagesClear = () => {
//     this.setState({ images: [] });
//   };

//   onLoad = () => {
//     console.log(this.state.page);

// imagesAPI
//   .fetchImages(this.props.value, this.state.page + 1)
//   .then(pictures => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//       images: [...prevState.images, ...pictures.hits],
//     }));
//   });
//     console.log(this.props.value);
//     console.log(this.state.page);
//     console.log(this.state.images);
//   };

//   render() {
//     const { images, error, status } = this.state;

//     if (status === 'idle') {
//       return <div></div>;
//     }

//     if (status === 'pending') {
//       return <Loader clearImages={this.imagesClear} />;
//     }

//     if (status === 'rejected') {
//       return <h1>{error.message}</h1>;
//     }

//     if (status === 'resolved') {
//       return (
//         <>
//           <div className={css.ImageGallery}>
//             {images.map(hit => {
//               return (
//                 <ImgageGalleryItem
//                   key={hit.id}
//                   smallImage={hit.webformatURL}
//                   largeImage={hit.largeImageURL}
//                   tags={hit.tags}
//                 />
//               );
//             })}
//           </div>
//           {images.length !== 0 && <ButtonLoadMore onLoad={this.onLoad} />}
//         </>
//       );
//     }
//   }
// }
