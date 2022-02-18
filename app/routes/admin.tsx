import { Link, Outlet, useLoaderData } from 'remix';
import { getPosts, Post } from '~/post';

import styles from '~/styles/admin.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export const loader = () => {
  return getPosts();
};

export default function Admin() {
  const posts: Post[] = useLoaderData();

  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.postId}>
              <Link to={`edit/${post.postId}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
