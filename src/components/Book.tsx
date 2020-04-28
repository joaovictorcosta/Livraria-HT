import React from "react";
import { IFirestoreBook } from "../services/types";
import Box from '@material-ui/core/Box';

/**
 * Livro a obtido do firestore
 */
const Book: React.FC<{ book: IFirestoreBook }> = ({ book }) => {
  return <>
    <Box
      fontFamily="Arial"
      borderRadius="5px"
      color="#000"
      bgcolor="#f9f9f9"
      boxShadow={3}
      p={1}
      height={300}>
      {book.image && <img
        style={{
          width: "100%",
          height: "70%",
          objectFit: 'cover'
        }} src={book.image}></img>}

      <div>
        <div>{book.name}</div>
      </div>
      <div style={{ fontSize: 14, color: "#555" }}>Preço: R$ {book.price}</div>

    </Box>
  </>;
};

export default Book;
