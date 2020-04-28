import React, { useState, useEffect } from "react";
import { IFirestoreBook } from "../services/types";
import Box from '@material-ui/core/Box';
import { fbStorage } from "../services/firebase";
import { getBookAuthorApi } from "../services/api";
/**
 * Livro a obtido do firestore
 */
const Book: React.FC<{ book: IFirestoreBook, id: string }> = ({ book, id }) => {
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
      <Box
        fontFamily="Arial"
        borderRadius="5px"
        color="#000"
        bgcolor="#f9f9f9"
        boxShadow={3}
        p={1}
        height="auto">
        {bookFS.image && <img
          style={{
            width: "100%",
            height: "200px",
            objectFit: 'cover'
          }} src={bookFS.image}></img>}
        <div style={{ margin: 10 }}>
          <div>
            <p style={{ whiteSpace: "nowrap", width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}>{bookFS.name}</p>
          </div>
          {bookFS.author && <div style={{ fontSize: 14, color: "#555" }}>Autor(a): {bookFS.author}</div>}
          <div style={{ fontSize: 14, color: "#555" }}>Preço: R$ {bookFS.price}</div>
        </div>

      </Box>}
  </>;
};

export default Book;
