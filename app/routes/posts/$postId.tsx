import { LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { getPost } from '~/post';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.postId, 'expected params.postId');
  return getPost(params.postId);
};

export default function PostId() {
  const post = useLoaderData();

  return <div dangerouslySetInnerHTML={{ __html: post.html }} />;
}
