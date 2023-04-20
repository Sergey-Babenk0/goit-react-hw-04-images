import { useState } from 'react';
import css from './image-gallery-item.module.css';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

const ImageGalleryItem = props => {
  const [isModalOpen, setIsModalOpen] = useState('false');

  const openModal = () => {
    setIsModalOpen('true');
  };

  const closeModal = () => {
    setIsModalOpen('false');
  };

  const { smallImage, largeImage, tags } = props;
  return (
    <div className={css.ImgageGalleryItem}>
      <img
        src={smallImage}
        alt={tags}
        onClick={openModal}
        className={css.ImageGalleryItemImage}
      />
      {isModalOpen === 'true' && (
        <Modal image={largeImage} tags={tags} onClose={closeModal} />
      )}
    </div>
  );
};
// export class OldImgageGalleryItem extends Component {
//   state = {
//     isModalOpen: 'false',
//   };

//   openModal = () => {
//     this.setState({
//       isModalOpen: 'true',
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       isModalOpen: 'false',
//     });
//   };

//   render() {
//     const { isModalOpen } = this.state;
//     const { smallImage, largeImage, tags } = this.props;
//     return (
//       <div className={css.ImgageGalleryItem}>
//         <img
//           src={smallImage}
//           alt={tags}
//           onClick={this.openModal}
//           className={css.ImageGalleryItemImage}
//         />
//         {isModalOpen === 'true' && (
//           <Modal image={largeImage} tags={tags} onClose={this.closeModal} />
//         )}
//       </div>
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  image: PropTypes.string,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export { ImageGalleryItem };
