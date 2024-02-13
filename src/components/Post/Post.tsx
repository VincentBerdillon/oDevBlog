import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import './Post.scss';
import { Post as TPost } from '../../@types/post';

type PostProps = {
  post: TPost;
};

function Post({ post }: PostProps) {
  const purifiedHtml = DOMPurify.sanitize(post.excerpt);
  return (
    <article className="post">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-category">{post.category.name}</div>
      <p
        className="post-excerpt"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: purifiedHtml }}
      />
      <Link to={`/article/${post.id}`} className="post-link">
        Lire la suite
      </Link>
    </article>
  );
}

export default Post;
