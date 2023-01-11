import { useState } from "react";
import { useDispatch } from "react-redux";

import { postAdded } from "./postsSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userName, setUserName] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserName(e.target.value);

  const onSavePostClicked = () => {
    if (title && content && userName) {
      dispatch(postAdded(title, content, userName));
      setTitle("");
      setContent("");
      setUserName("");
    }
  };

  const canSave = !!title && !!userName && !!content;

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <input
          type="text"
          id="postAuthor"
          name="postAuthor"
          value={userName}
          onChange={onAuthorChanged}
        />

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
