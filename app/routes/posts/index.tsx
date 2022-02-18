import { Link, useCatch, useLoaderData } from 'remix';
import { getPosts, Post } from '~/post';

export const loader = () => {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.postId}>
            <Link to={post.postId}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ErrorBoundary({ error }: any) {
  return (
    <div>
      Oops! Something went wrong!
      {error.toString()}
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="error-container">
      <p>This is an expected error with status: {caught.status}</p>
      <Link to="/login">Login</Link>
    </div>
  );
}
