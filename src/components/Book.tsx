import React, { useState, useEffect } from "react";
import { IFirestoreBook } from "../services/types";
import Box from '@material-ui/core/Box';
import { fbStorage } from "../services/firebase";
import { getBookAuthorApi } from "../services/api";
/**
 * Livro a obtido do firestore
 */
const Book: React.FC<{ book: IFirestoreBook, id: string }> = ({ book, id }) => {
  const [bookFS, setBookFS] = useState<IFirestoreBook>(book);

  const loadImage = async (key: string) => {
    const refStorage = fbStorage.ref("books");
    await refStorage.child(`${key}.jpg`).getDownloadURL().then((url) => {
      //Adiciona em newBooks o book
      const newBookFS = { ...bookFS }
      Object.assign(newBookFS, { image: url });
      setBookFS(newBookFS)
    });
  }

  const loadAuthor = async (key: string) => {

    getBookAuthorApi(key).then((author) => {

      const newBookFS = { ...bookFS };
      Object.assign(newBookFS, { author: author });
      setBookFS(newBookFS)
      // setBooks(newBooks);
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    loadImage(id);
    //
  }, []);


  return <>
    <Box
      fontFamily="Arial"
      borderRadius="5px"
      color="#000"
      bgcolor="#f9f9f9"
      boxShadow={3}
      p={1}
      height={300}>
      {bookFS.image && <img
        style={{
          width: "100%",
          height: "70%",
          objectFit: 'cover'
        }} src={bookFS.image}></img>}
      <div style={{ margin: 10 }}>
        <div >
          <h5>{bookFS.name}</h5>
        </div>
        {book.author && <div style={{ fontSize: 14, color: "#555" }}>Autor(a): {book.author}</div>}
        <div style={{ fontSize: 14, color: "#555" }}>Preço: R$ {bookFS.price}</div>
      </div>

    </Box>
  </>;
};

export default Book;
