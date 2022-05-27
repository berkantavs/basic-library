export default ($axios) => ({
  getAllBooks() {
    return $axios.get(`/book/newBook`, {
      headers: { authorization: 'apikey 3ayXFBN2u0t2d8nCI9TvVr:3eOt0mqSzz4uptLf9lECvC'},
    });
  },
});
