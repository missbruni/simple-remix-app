import { ActionFunction, Form, redirect, useActionData, useTransition } from 'remix';
import invariant from 'tiny-invariant';
import { createPost } from '~/post';

type PostError = {
  title?: boolean;
  postId?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));

  const formData = await request.formData();

  const title = formData.get('title');
  const postId = formData.get('postId');
  const markdown = formData.get('markdown');

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!postId) errors.postId = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === 'string');
  invariant(typeof postId === 'string');
  invariant(typeof markdown === 'string');
  await createPost({ title, postId, markdown });

  return redirect('/admin');
};

export default function newPost() {
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Post title: {errors?.title ? <em>Title is required</em> : null}
          <input type="text" name="title"></input>
        </label>
      </p>
      <p>
        <label>
          Post postId: {errors?.postId ? <em>postId is required</em> : null}
          <input type="text" name="postId"></input>
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{' '}
        {errors?.markdown ? <em>Markdown is required</em> : null}
        <br />
        <textarea id="markdown" name="markdown" rows={20} />
      </p>
      <p>
        <button type="submit">{transition.submission ? 'Creating...' : 'Create Post'}</button>
      </p>
    </Form>
  );
}
