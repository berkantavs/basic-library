<template>
  <div class="book-detail pt-5">
    <b-container>
      <b-card no-body>
        <b-card-header>
          <b-row>
            <b-col lg="6">
              <h4 class="text-dark">
                <nuxt-link to="/" class="text-dark"> Kitaplar</nuxt-link>
              </h4>
            </b-col>
            <b-col lg="6" class="text-right">
              <!-- <b-button @click="getBooks"> Getir</b-button> -->
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body v-if="book_detail">
          <b-row>
            <b-col lg="5">
              <b-carousel id="carousel-1">
                <b-carousel-slide
                  :img-src="book_detail.image"
                ></b-carousel-slide>
              </b-carousel>
            </b-col>
            <b-col lg="7">
              <div class="book-title">
                <h2 class="mb-4">{{ book_detail.title }}</h2>
              </div>
              <div class="book-writer">
                Yazar :
                <span class="text-primary">
                  {{ book_detail.yazar }}
                </span>
                Yayınevi :
                <span class="text-primary">
                  {{ book_detail.yayın }}
                </span>
              </div>
              <div class="book-price mt-4">
                <h3 class="text-success">
                  {{ book_detail.fiyat }}
                </h3>
              </div>
              <div class="mt-4 add-to-basket">
                <b-button variant="success" class="w-50" @click="goToSeller">
                Yayınevinin Diğer Kitaplarına Git
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book_detail: null,
      book_title: null,
      books: null,
    };
  },
  async created() {
    this.getBook();
  },
  methods: {
    getBook() {
      if (this.$route.params.title) {
        this.book_title = this.$route.params.title;
        this.findBook();
      }
    },
    goToSeller() {
      window.open(this.book_detail.url, "_blank");
    },
    findBook() {
      if (localStorage.getItem("books")) {
        this.books = JSON.parse(localStorage.getItem("books"));
        if (this.books && this.books.length > 0) {
          let selected_book = this.books.filter(
            (book) => book.title == this.book_title
          );
          this.book_detail = selected_book[0];
        }
      }
    },
  },
};
</script>

<style>
.book-detail img {
  width: 250px !important;
  height: auto;
}
</style>
