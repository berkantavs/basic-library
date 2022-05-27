export default function ({ store, app: { $axios, redirect } }) {
    $axios.onError((error) => {
      const code = parseInt(error.response && error.response.status);
      if (code === 400) {
        redirect("/400");
      }
    });
  }
  