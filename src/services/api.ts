// Exemplo de chamada:
//https://us-central1-handtalk-challenge.cloudfunctions.net/getBookAuthor?bookId=9AHZty9s6IHEHYcxJJgi
//

const endpoint =
  "https://us-central1-handtalk-challenge.cloudfunctions.net/getBookAuthor";

/**
 * Pega o author na coleção secreta metadados atraves do firebase functions
 * @param bookId Id do livro que iremos consultar
 */
export const getBookAuthorApi = async (bookId: string) => {
  const response = await fetch(`${endpoint}?bookId=${bookId}`);
  const json = await response.json();
  return json.author;
};
