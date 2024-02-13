import { Post as TPost } from '../../@types/post';
import './Post.scss';

type PostProps = {
  post: TPost;
};

function PostA({ post }: PostProps) {
  return (
    <article className="post">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-excerpt">{post.excerpt}</p>
    </article>
  );
}

export default PostA;
