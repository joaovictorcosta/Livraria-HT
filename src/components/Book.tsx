import React, { useState, useEffect } from "react";
import { IFirestoreBook } from "../services/types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { fbStorage } from "../services/firebase";
import { getBookAuthorApi } from "../services/api";
import bookStyles from "../styles/book";
import Typography from '@material-ui/core/Typography';

/**
 * Livro a obtido do firestore
 */
const Book: React.FC<{ book: IFirestoreBook, id: string }> = ({ book, id }) => {
  const classes = bookStyles();
  const [bookFS, setBookFS] = useState<IFirestoreBook>();

  const loadImage = async (key: string) => {
    const newBookFS = { ...book };
    const refStorage = fbStorage.ref("books");
    await refStorage.child(`${key}.jpg`).getDownloadURL().then((url) => {
      //Adiciona em newBooks o book
      Object.assign(newBookFS, { image: url });
    });
    return newBookFS;
  }

  const loadAuthor = async (oldBook: IFirestoreBook, key: string) => {
    getBookAuthorApi(key).then((author) => {
      const newBookFS = { ...oldBook };
      Object.assign(newBookFS, { author: author });
      setBookFS(newBookFS);
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    loadImage(id).then((x) => {
      loadAuthor(x, id);
    });
  }, []);

  return <>
    {bookFS &&
      <Card className={classes.cardBook}>
        <CardMedia
          className={classes.imageBook}
          image={bookFS.image}
        />
        <CardContent>
          <Typography noWrap gutterBottom variant="h6" component="h3">
            {bookFS.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Autor(a): {bookFS.author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Preço: R$ {bookFS.price}
          </Typography>
        </CardContent>
      </Card>
    }
  </>;
};

export default Book;
