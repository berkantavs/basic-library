import BookRepository from "~/repositories/BookRepository";

export default ($axios) => ({
  book: BookRepository($axios),
});
