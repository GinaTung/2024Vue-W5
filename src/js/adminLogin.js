// index.js
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      api_url: "https://ec-course-api.hexschool.io/v2",
      api_path: "yuling2023",
      admin_w2:"w2",
      admin_w3:"w3",
      admin_w4:"w4",
      admin_w5:"w5",
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    setAdmin(value) {
      // 設定 admin_w2 或 admin_w3 的值
      if (value === 'w2') {
        this.admin_w2 = value;
        this.admin_w3 = ''; // 清空另一個值
        this.admin_w4 = ''; // 清空另一個值
      } else if (value === 'w3') {
        this.admin_w3 = value;
        this.admin_w2 = ''; // 清空另一個值
        this.admin_w4 = ''; // 清空另一個值
      }else if (value === 'w4') {
        this.admin_w4 = value;
        this.admin_w3 = '';
        this.admin_w2 = ''; // 清空另一個值
      }else if (value === 'w5') {
        this.admin_w5 = value;
        this.admin_w4 = '';
        this.admin_w3 = '';
        this.admin_w2 = ''; // 清空另一個值
      }
    },
    login() {
    //   console.log(this.api_url, this.user, this.password);
      axios
        .post(`${this.api_url}/admin/signin`, this.user)
        .then((res) => {
          // console.log(res);
          alert(`${res.data.message}`);
          // 使用 window.location 導向不同的頁面
          if (this.admin_w2) {
            window.location.href = 'adminProducts-w2.html';
          } else if (this.admin_w3) {
            window.location.href = 'adminProducts-w3.html';
          }else if (this.admin_w4) {
            window.location.href = 'adminProducts-w4.html';
          }else if (this.admin_w5) {
            window.location.href = 'cart.html';
          }
          // unix.timestamp
          //取得token
          const { expired, token } = res.data;
        //   console.log(expired, token);
          //儲存cookeie
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        })
        .catch((err) => {
          // console.log(err);
          //   console.dir(err);
          alert(`${err.data.message}`);
        });
    }
  }
}).mount("#app");
