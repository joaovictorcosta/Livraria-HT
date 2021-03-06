import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Book from "./Book";
import { IFirestoreBook } from "../services/types";
import { fbFirestore } from "../services/firebase";
import bookListStyles from "../styles/bookList";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

/**
 * Renderiza a lista de livros do firestore
 */
const BookList: React.FC<{}> = () => {
  const classes = bookListStyles();
  const [books, setBooks] = useState<Record<string, IFirestoreBook>>({});
  const [loading, setLoading] = useState(true);

  const loadBooks = () => {
    const newBooks = { ...books };
    fbFirestore.collection("books").get().then((result) => {
      result.docs.forEach((item, index) => {
        //Utiliza a interface para criar o objeto book com os dados retornados
        //do Firestore para adicioná-los ao newBooks
        const book: IFirestoreBook = {
          name: item.data().name,
          price: item.data().price
        };
        //Adiciona em newBooks o book
        Object.assign(newBooks, { [item.id]: book });
      });
      setBooks(newBooks);

    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [books]);

  return (
    <Box p={2}>

      <Grid className={classes.gridBookList} container spacing={2}  >
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '1000ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
        {Object.entries(books).map(([key, value]) => (
          <Grid sm={6} xs={6} md={2} lg={3} item key={key}>
            <Book book={value} id={key} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default BookList;
