import {
  ActionFunction,
  Form,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from 'remix';

import { action as newPostAction } from '../new';
import { loader as postLoader } from '~/routes/posts/$postId';

export const loader: LoaderFunction = postLoader;
export const action: ActionFunction = newPostAction;

export default function editPost() {
  const post = useLoaderData();
  const errors = useActionData();
  const transition = useTransition();
  console.log('post: ', post);
  return (
    <Form method="post">
      <p>
        <label>
          Post title: {errors?.title ? <em>Title is required</em> : null}
          <input type="text" name="title" defaultValue={post.title}></input>
        </label>
      </p>
      <p>
        <label>
          Post Id: {errors?.postId ? <em>postId is required</em> : null}
          <input type="text" name="postId" defaultValue={post.postId}></input>
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{' '}
        {errors?.markdown ? <em>Markdown is required</em> : null}
        <br />
        <textarea
          id="markdown"
          name="markdown"
          rows={20}
          defaultValue={post.html.replace('<p>')}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </p>
      <p>
        <button type="submit">{transition.submission ? 'Creating...' : 'Create Post'}</button>
      </p>
    </Form>
  );
}
