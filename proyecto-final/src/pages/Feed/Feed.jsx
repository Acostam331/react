import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';
import Footer from './Footer';
import { BiUserCircle } from 'react-icons/bi';
import classes from './Feed.module.css';
import Card from '../../components/Card/Card';
import {
  getAllPosts,
  getFavorites,
  setNewLike,
  setNewFavorite,
  setStatusPost,
} from '../../services/Posts.services';
import Comments from '../../components/Comments/Comments';
import EditPost from '../../components/EditPost/EditPost';
import AddPost from '../../components/AddPost/AddPost';
import Loading from '../../components/Loading/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = () => {
  const { token, user } = useUserContext();
  const role = user.role;
  const username = user.username;
  // temp token log
  // const username = 'gp3_user@test.com';
  // const password = 'IMeFecQn7IVA3eeH';

  // temp admin token log
  // const username = 'gp3_admin@test.com';
  // const password = 'DRFdQpXsxhB7ESFl';

  // const { posts, isLoading } = useGetFavorites(token);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState(1);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState({ isComments: false, postId: '' });
  const [localData, setLocalData] = useState({
    id: '',
    url: '',
    title: '',
    desc: '',
  });
  const [edit, setEdit] = useState({
    isEdit: false,
    postId: '',
    postTitle: '',
    postDesc: '',
    postImg: '',
  });
  const [alertModal, setAlertModal] = useState({
    isAlert: false,
    message: '',
    type: '',
  });

  // TO CHANGE ON ADMIN FEED
  const [isNewPost, setIsNewPost] = useState(false);

  const getData = useCallback(async () => {
    console.log('Obteniendo posts: page', page);
    setIsLoading(true);
    let extraTime = 1500;
    let response = {};
    if (tab === 1) {
      response = await getAllPosts(token, page);
      // Extra timeout -> used to see loading dots
      setTimeout(() => {
        // to avoid errors in .map is needed to remove all undefined responses
        response.posts = response.posts.filter((x) => x !== undefined);
        setPosts((prevPosts) => {
          return [...prevPosts, ...response.posts];
        });
        setIsLoading(response.isLoading);
      }, extraTime);
    } else {
      response = await getFavorites(token);
      setTimeout(() => {
        response.posts = response.posts.filter((x) => x !== undefined);
        setPosts(response.posts);
        setIsLoading(response.isLoading);
      }, extraTime);
    }
  }, [tab, page, token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const cleanAlert = () => {
    setAlertModal({ isAlert: false, icon: '', message: '', type: '' });
  };

  const addStatusHandler = async (id) => {
    let response = await setStatusPost(token, id);
    if (response.statusText === 'OK') {
      setAlertModal({
        isAlert: true,
        message: 'Has cambiado el estado de este post',
        type: 'bg-green-400',
      });

      setTimeout(() => {
        cleanAlert();
      }, 2000);
    }
  };

  const addNewLikeHandler = async (id, isMine) => {
    let response = await setNewLike(token, id);
    if (response.statusText === 'OK') {
      setPosts((prevPosts) => {
        let index = prevPosts.findIndex((x) => x._id === id);
        if (isMine) {
          let subIndex = prevPosts[index].likes.findIndex(
            (x) => x.username === user.username
          );
          // console.log("Eliminando like");
          prevPosts[index].likes.splice(subIndex, 1);
        } else {
          prevPosts[index].likes.push({ username: user.username });
          // console.log("Dando like");
        }

        return prevPosts;
      });

      let msg = isMine ? 'Has removido tu like' : 'Has dado like';
      setAlertModal({
        isAlert: true,
        message: msg,
        type: 'bg-green-400',
      });

      setTimeout(() => {
        cleanAlert();
      }, 2000);
    }
  };

  const addNewFavHandler = async (id) => {
    let response = await setNewFavorite(token, id);
    if (response.statusText === 'OK') {
      setAlertModal({
        isAlert: true,
        message: 'Has guardado como favorito',
        type: 'bg-green-400',
      });

      setTimeout(() => {
        cleanAlert();
      }, 2000);
    }
  };

  const changeTabHandler = (newtab) => {
    setPosts([]);
    // if still in the same tab -> update section posts
    if (tab === newtab && page === 0) {
      getData();
    } else {
      // if tab changed move to page 0
      setPage(0);
      setTab(newtab);
    }
  };

  const newPostAddedHandler = () => {
    changeTabHandler(1);
  };

  return (
    // html and design
    <main className="bg-indigo-900 h-screen">
      <header className={classes.dCenter}>
        <h1 className="text-3xl lg:text-3xl font-extrabold text-gray-300 text-center pb-4 mt-8">
          Photogenix
        </h1>
        <div className={classes.userSection}>
          <Link to="/user">
            <BiUserCircle className={classes.iconUser} />
          </Link>
        </div>
      </header>
      <div id="scrollable" className={classes.posts}>
        {/* alert modal */}
        {alertModal.isAlert ? (
          <div
            className={`flex py-2 px-8 w-5/6 alert-card rounded-3xl z-50 ${classes.alertCard} ${alertModal.type}`}
          >
            <p className="mx-4 text-white">{alertModal.message}</p>
          </div>
        ) : (
          ''
        )}

        <InfiniteScroll
          dataLength={posts.length}
          next={() => setPage(page + 1)}
          hasMore={true}
          scrollableTarget="scrollable"
        >
          {posts.map((post) => {
            return (
              <Card
                key={post._id}
                {...post}
                setComments={setComments}
                localData={localData}
                setEdit={setEdit}
                addNewLike={(isMine) => addNewLikeHandler(post._id, isMine)}
                addNewFav={() => addNewFavHandler(post._id)}
                addStatus={() => addStatusHandler(post._id)}
                role={role}
                username={username}
                currentuser={user.username}
              />
            );
          })}
        </InfiniteScroll>
        {isLoading ? <Loading /> : ''}

        {comments.isComments ? (
          <Comments
            comments={comments}
            posts={posts}
            setComments={setComments}
            setAlertModal={setAlertModal}
            cleanAlert={cleanAlert}
          />
        ) : (
          ''
        )}
        {edit.isEdit ? (
          <EditPost
            edit={edit}
            setLocalData={setLocalData}
            setEdit={setEdit}
            setAlertModal={setAlertModal}
            cleanAlert={cleanAlert}
          />
        ) : (
          ''
        )}
        {isNewPost ? (
          <AddPost
            setIsNewPost={setIsNewPost}
            setAlertModal={setAlertModal}
            cleanAlert={cleanAlert}
            newPostAdded={() => newPostAddedHandler()}
          />
        ) : (
          ''
        )}
      </div>
      <Footer
        changeTab={(tab) => changeTabHandler(tab)}
        role={role}
        setIsNewPost={setIsNewPost}
      />
    </main>
  );
};

export default Feed;
