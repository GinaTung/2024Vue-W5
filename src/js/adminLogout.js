import {
    createApp,
  } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const app2 = {
    data() {
      return {
        api_url: "https://ec-course-api.hexschool.io/v2",
        api_path: "yuling2023",
        user: {
          username: "",
          password: "",
        },
      };
    },
    methods: {
      logout() {
        axios
          .post(`${this.api_url}/logout`)
          .then((res) => {
            // console.log(res);
            alert(`${res.data.message}`);
            document.cookie = "hexToken=; expires=";
            window.location = "index.html";
          })
          .catch((err) => {
            // console.log(err);
            alert(`${err.data.message}`);
            window.location = "adminLogin.html";
          });
      },
    },
    mounted() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common["Authorization"] = token;
      // console.log(token);
    },
  }
  createApp(app2).mount("#app2");