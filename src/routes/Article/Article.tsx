// import axios from 'axios';
// import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import PostA from '../../components/Post/PostA';
import { useContext } from 'react';
import { useAsyncFetch } from '../../hooks/useAsyncFetch';
import Spinner from '../../components/Spinner/Spinner';
import { PostWithoutCategory } from '../../@types/post';
import { ZenContext } from '../../contexts/zenMode';

function Article() {
  const { id } = useParams();
  const { zenMode, setZenMode } = useContext(ZenContext);
  // const [post, setPost] = useState<any>();

  if (!id) {
    throw new Error("l'url ne contient pas d'id");
  }

  /* useEffect(() => {
    axios
      .get(`https://oblog-react.vercel.app/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      });
  }, [id]); */

  // {data: post} me permet de renommé la propriété `data` retourner par useAsyncFetch en `post`
  const {
    data: post,
    isLoading,
    error,
  } = useAsyncFetch<PostWithoutCategory>(
    `https://oblog-react.vercel.app/api/posts/${id}`
  );

  // Si l'API me retourne une erreur, je déclanche l'erreur pour pouvoir afficher le composant définis dans errorElement de mon router
  if (error) {
    throw error;
  }

  return (
    <main style={{ backgroundColor: zenMode ? '#FFF' : '#0F0' }}>
      {isLoading && <Spinner />}
      {/* la donnée récupérer depuis mon API n'est pas tout de suite présente... */}
      {/* (tant que l'API ne m'a pas répondu, `post` === undefined) */}
      {/* On va donc conditionner l'affichage de l'article à l'existance de ma donnée */}
      {post && (
        <article>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <button
            type="button"
            onClick={() => setZenMode((oldValue) => !oldValue)}
          >
            Toggle zen mode
          </button>
          {/* <button type="button" onClick={() => setZenMode(!zenMode)}>
            Toggle zen mode
      </button> */}
        </article>
      )}
    </main>
  );
}

export default Article;
