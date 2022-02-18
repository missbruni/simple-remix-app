import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import { marked } from 'marked';

export type Post = {
  postId: string;
  title: string;
};

type NewPost = {
  title: string;
  postId: string;
  markdown: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

const postPath = path.join(__dirname, '..', 'posts');

function isValidPostAttributes(attributes: any): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts() {
  const directory = await fs.readdir(postPath);

  return Promise.all(
    directory.map(async (fileName: string) => {
      const file = await fs.readFile(path.join(postPath, fileName));
      const { attributes } = parseFrontMatter(file.toString());

      invariant(isValidPostAttributes(attributes), `${fileName} has bad metadata`);

      return {
        postId: fileName.replace(/\.md$/, ''),
        title: attributes.title,
      };
    })
  );
}

export async function getPost(postId: string) {
  const filePath = path.join(postPath, `${postId}.md`);
  const file = await fs.readFile(filePath);
  const { attributes, body } = parseFrontMatter(file.toString());

  invariant(isValidPostAttributes(attributes), `Post ${filePath} is missing attributes`);

  const html = marked(body);

  return { postId, html, title: attributes.title };
}

export async function createPost(post: NewPost) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;

  await fs.writeFile(path.join(postPath, `${post.postId}.md`), md);
  return getPost(post.postId);
}
