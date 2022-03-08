import styles from './Filter.module.css';

import PropTypes from 'prop-types';

const Filter = ({value,title,onChange}) => { 
  return (
    <div className={styles.BoxFilter}>
       <h2>{title}</h2>
      <label className={styles.Filter} >Find contacts by name
        <input type='text' value={value} onChange={onChange}/>
      </label>
    </div>
    
  )
}

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  value:PropTypes.string.isRequired
}

export default Filter;