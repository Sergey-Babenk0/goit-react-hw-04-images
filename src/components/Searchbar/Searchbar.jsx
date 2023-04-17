import css from './search-bar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = props => {
  const [value, setValue] = useState('');

  const handleValueChange = event => {
    setValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      alert('Нечего искать;)');
      return;
    }
    props.onSubmit(value);
    setValue('');
  };
  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.label}>Search</span>
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.SearchFormInput}
          onChange={handleValueChange}
          value={value}
        />
      </form>
    </header>
  );
};

// export class OldSearchBar extends Component {
//   state = {
//     value: '',
//   };

//   handleValueChange = event => {
//     this.setState({ value: event.currentTarget.value.toLowerCase() });
//   };

// handleSubmit = event => {
//   event.preventDefault();
//   if (this.state.value.trim() === '') {
//     alert('Нечего искать;)');
//     return;
//   }
//   this.props.onSubmit(this.state.value);
//   this.setState({
//     value: '',
//   });
// };

//   render() {
//     return (
//       <header className={css.Searchbar}>
//         <form onSubmit={this.handleSubmit} className={css.SearchForm}>
//           <button type="submit" className={css.SearchFormButton}>
//             <span className={css.label}>Search</span>
//           </button>

//           <input
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             className={css.SearchFormInput}
//             onChange={this.handleValueChange}
//             value={this.state.value}
//           />
//         </form>
//       </header>
//     );
//   }
// }

SearchBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export { SearchBar };
