import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavLink,
  useParams,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';
import { fetchPostDataThunk } from '../redux/postDetailsOperations';
// import { incrementCounter } from 'redux/postDetailsReducer';

const CommentsPostPage = lazy(() => import('pages/CommentsPostPage'));

const PostDetails = () => {
  const postDetails = useSelector(state => state.postDetails.postDetails);
  const isLoading = useSelector(state => state.postDetails.isLoading);
  const error = useSelector(state => state.postDetails.error);
  const dispatch = useDispatch();

  const { postId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (!postId) return;
    dispatch(fetchPostDataThunk(postId));
  }, [postId, dispatch]);

  return (
    <div>
      <h1>Post Details</h1>

      <Link to={backLinkHref.current}>Go back</Link>
      {error !== null && <p className="c-error"> Oops, error.</p>}
      {isLoading && (
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#04e4f9"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}

      {postDetails !== null && (
        <div className="post-details">
          <h2 className="post_details-title">Title: {postDetails.title}</h2>
          <p className="post_details-id">ID: {postDetails.id}</p>
          <p className="post_details-body"> {postDetails.body}</p>
          <div>
            <NavLink to="comments">Comments</NavLink>
          </div>
        </div>
      )}
      <Suspense
        fallback={
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#04e4f9"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        }
      >
        <Routes>
          <Route path="comments" element={<CommentsPostPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default PostDetails;
