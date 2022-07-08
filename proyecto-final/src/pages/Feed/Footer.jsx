import { BiWorld, BiBookmark, BiPlus } from 'react-icons/bi';
import classes from './Feed.module.css';

const Footer = ({ changeTab = () => {}, role, setIsNewPost }) => {
  return (
    // html and design

    <footer className="bg-gray-800">
      <button onClick={() => changeTab(1)}>
        <BiWorld className={classes.icons} />
      </button>
      {role === 'user' ? (
        ''
      ) : (
        <button
          onClick={() => {
            setIsNewPost(true);
          }}
        >
          <BiPlus className={classes.icons} />
        </button>
      )}
      <button onClick={() => changeTab(2)}>
        <BiBookmark className={classes.icons} />
      </button>
    </footer>
  );
};

export default Footer;
