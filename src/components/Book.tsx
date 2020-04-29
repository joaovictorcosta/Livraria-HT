import React, { useState, useEffect } from "react";
import { IFirestoreBook } from "../services/types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { fbStorage } from "../services/firebase";
import { getBookAuthorApi } from "../services/api";
import bookStyles from "../styles/book";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Livro a obtido do firestore
 */
const Book: React.FC<{ book: IFirestoreBook, id: string }> = ({ book, id }) => {
  const classes = bookStyles();
  const [bookFS, setBookFS] = useState<IFirestoreBook>();
  const [loading, setLoading] = useState(true);

  const loadImage = async (key: string) => {
    setLoading(true);
    const newBookFS = { ...book };
    const refStorage = fbStorage.ref("books");

    await refStorage.child(`${key}.jpg`).getDownloadURL().then((url) => {
      //Adiciona em newBooks o book
      Object.assign(newBookFS, { image: url });
    }).catch((err) => {
      setLoading(false);
      console.log(err);
    });
    return newBookFS;
  }

  const loadAuthor = async (oldBook: IFirestoreBook, key: string) => {
    getBookAuthorApi(key).then((author) => {
      const newBookFS = { ...oldBook };
      Object.assign(newBookFS, { author: author });
      setLoading(false);
      setBookFS(newBookFS);

    }).catch((err) => {
      setLoading(false);
      console.log(err)
    });
  }

  useEffect(() => {
    loadImage(id).then((result) => {
      loadAuthor(result, id);
    });
  }, []);

  return <>

    <Card className={classes.cardBook}>
      {loading && <CardContent className={classes.cardContentProgress}>
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '1000ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </CardContent>}
      {(bookFS && !loading) && <>
        <CardMedia
          className={classes.imageBook}
          image={bookFS.image}
        />
        <CardContent>
          <Tooltip title={bookFS.name}>
            <Typography noWrap gutterBottom variant="h6" component="h3">
              {bookFS.name}
            </Typography>
          </Tooltip>

          <Typography variant="body2" color="textSecondary" component="p">
            Autor(a): {bookFS.author}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            Preço: R$ {bookFS.price}
          </Typography>
        </CardContent>
      </>
      }
    </Card>

  </>;
};

export default Book;
