<template>
  <div>
    <div class="header pt-5 pb-5">
      <b-container>
        <b-card no-body>
          <b-card-header>
            <b-row>
              <b-col lg="6">
                <h4>Kitaplar</h4>
              </b-col>
              <b-col lg="6" class="text-right">
                <b-form-select
                  v-model="selected_publisher"
                  :options="options"
                  @change="getSelectedPublisherBooks($event)"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-card-header>
          <b-card-body v-if="books && books.length > 0">
            <template>
              <b-row>
                <template v-for="book in books">
                  <b-col lg="3" class="mt-3 mb-3" :key="book.title">
                    <div class="book-img-area text-center">
                      <nuxt-link :to="'/book-detail/' + book.title">
                        <b-img :src="book.image" fluid></b-img>
                      </nuxt-link>
                    </div>
                    <div class="book-info-area text-center">
                      <b>{{ book.title }}</b>
                    </div>
                  </b-col>
                </template>
              </b-row>
            </template>
          </b-card-body>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: null,
      selected_publisher: null,
      selected_publisher_books: [],
      options: [{ value: null, text: "Please select an option" }],
    };
  },
  async mounted() {
    this.getBooks();
  },
  watch: {
    selected_publisher(val) {
      if (val == null) {
        this.books = JSON.parse(localStorage.getItem("books"));
      }
    },
  },
  methods: {
    async getBooks() {
      let local_books = localStorage.getItem("books");
      if (!local_books) {
        let response = await this.$repositories.book.getAllBooks();
        if (
          response &&
          response.data &&
          response.data.result &&
          response.data.result.length > 0
        ) {
          this.books = response.data.result;
          localStorage.setItem("books", JSON.stringify(this.books));
          this.filterPublisher();
        }
      } else {
        this.books = JSON.parse(local_books);
        this.filterPublisher();
      }
    },
    getSelectedPublisherBooks(publisher) {
      if (publisher != null) {
        this.books = JSON.parse(localStorage.getItem("books"));
        this.selected_publisher_books = [];
        this.books.forEach((book) => {
          if (publisher == book.yayın) {
            this.selected_publisher_books.push(book);
          }
        });
        this.books = this.selected_publisher_books;
      }
    },
    filterPublisher() {
      if (this.books && this.books.length > 0) {
        let publishers = this.books
          .filter((book) => book.yayın)
          .map((book) => {
            return book.yayın;
          });
        let uniquePublishers = [...new Set(publishers)];
        for (let i = 0; i < uniquePublishers.length; i++) {
          this.options.push(uniquePublishers[i]);
        }
      }
    },
  },
};
</script>

<style></style>
