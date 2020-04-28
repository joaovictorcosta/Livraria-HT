/**
 * Livro guardado no firestore
 */
export interface IFirestoreBook {
  /** Nome do livro */
  name: string;
  /** Preço do livro  */
  price: number;

  /** Autor do livro */
  author?: string;

  /**imagem do livro */
  image?: string;
}

