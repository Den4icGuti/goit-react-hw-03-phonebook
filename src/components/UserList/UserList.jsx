import PropTypes from "prop-types";
import ListItem from "components/ListItem/ListItem";
import styles from './UserList.module.css';

const userList = ({ item, deleteContact }) => {
  return (
    <div className={styles.ListUsers}>
      <ul className={styles.list}>
        {item.map(({ id, name, number }) => (
          <ListItem
            className={styles.item}
            key={id}
            name={name}
            number={number}
            onClick={() => deleteContact(id)}
          />
        ))}
      </ul>
    </div>
    
  );
};

userList.propTypes = {
  name: PropTypes.string,
  number:PropTypes.string
}

export default userList;

