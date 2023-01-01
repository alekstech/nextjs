import React, { useState, useEffect, useRef } from 'react';
import { Post } from '../../models';
import { Amplify, DataStore } from 'aws-amplify';
// Example showing how to observe the model and keep state updated before
// performing a save. This uses the useEffect React hook, but you can
// substitute for a similar mechanism in your application lifecycle with
// other frameworks.

// import awsconfig from "../../aws-exports";
// Amplify.configure(awsconfig);

type EditCache = {
  [key: string]: Post
}

const Posts = function () {
  const [posts, setPosts] = useState<Post[]>([]);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Keep data fresh
    const sub = DataStore
      .observeQuery(Post)
      .subscribe((snapshot) => {
        const { items } = snapshot;
        console.log(JSON.stringify(snapshot, null, 2));
        setPosts(items);
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  const handleCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      draft: { value: string };
    };
    const draft = target.draft.value; // typechecks!

    await DataStore.save(new Post({
      name: draft ?? ''
    }));
    ref.current?.reset();
  };

  const handleUpdate = (p: Post) => async ({ target : { value } } :  React.ChangeEvent<HTMLInputElement>) => {
    const payload = Post.copyOf(p, updated => {
      updated.name = value;
    });
    await DataStore.save(payload);
  };

  const handleDelete = async (post : Post) => {
    await DataStore.delete(post);
  };

  return (
    <>
      <h1>Posts</h1>
      <p>Features: offline, multi-device ...</p>
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <input
              type="text"
              value={p.name}
              onChange={(e) => handleUpdate(p)(e)}
            />
            <button onClick={() => handleDelete(p)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreate} ref={ref}>
        <label htmlFor="draft">Create</label>
        <input
          id="draft"
          name="draft"
          type="text"
          placeholder="one more thing..."
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default Posts;