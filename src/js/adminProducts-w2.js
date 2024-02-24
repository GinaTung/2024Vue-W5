import {
  createApp,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
createApp({
  data() {
    return {
      api_url: "https://ec-course-api.hexschool.io/v2",
      api_path: "yuling2023",
      user: {
        username: "",
        password: "",
      },
      products: {},
      tempProduct: {},
      tempProduct2: {},
      singleProduct: {
        data: {
          title: "taiwan B",
          category: "風景",
          origin_price: 300,
          price: 240,
          unit: "個",
          description: "台北101",
          content: "這是內容",
          is_enabled: 1,
          imageUrl:
            "https://images.unsplash.com/photo-1519126400611-d57095205936?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          imagesUrl: [
            "https://images.unsplash.com/photo-1703122736865-388cc9713322?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
      },
      productId:{}
    };
  },
  methods: {
    //1.取得遠端資料 2.渲染左側區塊 3.渲染右側區塊
    checkAdmin() {
      axios
        .post(`${this.api_url}/api/user/check`)
        .then((res) => {
          // console.log(res);
          // alert(`驗證成功`);
          this.getProducts();
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.data.message}`);
          window.location = "adminLogin.html";
        });
    },
    getProducts() {
      axios
        .get(`${this.api_url}/api/${this.api_path}/admin/products/all`)
        .then((res) => {
          // console.log(res);
          //產出products資料要確認是陣列還是物件，這邊產出是物件
          this.products = res.data.products;
          // alert(`已取得產品列表`)
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.data.message}`);
        });
    },
    productItem(item) {
      //    console.log('productItem', item);
      this.tempProduct = { ...item };
    },
    addProduct() {
      axios
        .post(
          `${this.api_url}/api/${this.api_path}/admin/product`,
          this.singleProduct
        )
        .then((res) => {
          // console.log(res);
          alert(`已建立產品`);
          this.getProducts();
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.data.message}`);
        });
    },
    deleteProduct(productId) {
      // console.log(productId);
      axios
        .delete(
          `${this.api_url}/api/${this.api_path}/admin/product/${productId}`
        )
        .then((res) => {
          // console.log(res);
          this.productId = productId;
          alert(`已刪除${this.productId}產品`);
          this.getProducts();
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.data.message}`);
        });
    },
  },
  mounted() {
    //取得cookie資料
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    // console.log(token);
    this.checkAdmin();
  },
}).mount("#app");



