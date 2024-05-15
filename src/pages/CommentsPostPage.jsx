import React, { useEffect } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsThunk } from '../redux/commentsReducer';

const CommentsPostPage = () => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);
  const isLoading = useSelector(state => state.comments.isLoading);
  const error = useSelector(state => state.comments.error);

  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;
    dispatch(fetchCommentsThunk(postId));
  }, [postId, dispatch]);

  return (
    <div>
      <h1>Comments Post Page</h1>
      {error !== null && <p className="c-error"> Oops, error. {error} </p>}
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
      <ul>
        {comments?.length > 0 &&
          comments.map(comment => (
            <li key={comment.id}>
              <h2>{comment.email}</h2>
              <p>{comment.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommentsPostPage;
