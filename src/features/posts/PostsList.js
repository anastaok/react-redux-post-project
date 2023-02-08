import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  if (postStatus === "loading") {
    return (
      <section>
        <h2>Posts</h2>
        <p>"Loading..."</p>
      </section>
    );
  }
  if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    return (
      <section>
        <h2>Posts</h2>
        {orderedPosts.map((post) => {
          return <PostsExcerpt key={post.id} post={post} />;
        })}
      </section>
    );
  }
  if (postStatus === "failed") {
    return (
      <section>
        <h2>Posts</h2>
        <p>{error}</p>
      </section>
    );
  }
};
export default PostsList;
