import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// 1.bootstrap實體化
// 2.套用modal.show()方法
// const modal = document.querySelector("#modal");
// var myModal = new bootstrap.Modal(document.getElementById('myModal'), options)

let myModal = ""; //實體化
createApp({
  data() {
    return {
      api_url: "https://ec-course-api.hexschool.io/v2",
      api_path: "yuling2023",
      products: [],
      tempProduct: {
        "imagesUrl": []
      },
      pages:{},
      modalProduct:null,//productModal
      modalDel:null,//delProductModal
      isNew:false,
      ratingId:0,
      score:0,
      tempRating:{},
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${this.api_url}/api/user/check`)
        .then((res) => {
          // console.log(res);
          this.getProducts();
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.data.message}`);
          window.location = "adminLogin.html";
        });
    },
    getProducts(page=1) {//參數預設值
      //有分頁
      axios
        .get(`${this.api_url}/api/${this.api_path}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
          // console.log(res);
          // 如果是新增商品，並且最新商品列表不為空，取最後一個商品的 ID
          if (this.isNew && this.products.length > 0) {
              
            // 只有在新增商品時才調用 ratingData 方法
            if (!this.isDeleting) {
              const newProductId = this.products[0].id;
              // 調用 ratingData 方法，將新增商品的 ID 及星值更新到 cookie 中
              this.ratingData(newProductId, this.tempRating.score);
            }
          }
        })
        .catch((arr) => {
          alert(`${err.data.message}`);
        });
    },
    ratingData(ratingId,score){
      if(ratingId !== undefined){
        this.tempRating.ratingId = ratingId;
        this.tempRating.score = score;
        // Set cookie with product id and rating
        document.cookie = `productY_${this.tempRating.ratingId}_rating=${this.tempRating.score}`;
      }
    },
    openModal(status,product,score) {
      // myModal.show();=>element id方法
      // console.log(status,product);
      if (status === 'new') {
        this.tempProduct = {
          "imagesUrl": []
        }
        this.isNew = true;
        this.tempRating.ratingId = 0;
        this.tempRating.score = 0;
        this.modalProduct.show();
        
      }else if(status === 'edit'){
        this.tempProduct = { ...product };
        if (!Array.isArray(this.tempProduct.imagesUrl)) {
          this.tempProduct.imagesUrl = [];
        }
        this.isNew = false;
        this.modalProduct.show();

        // Read cookie and return the rating for the specified product id
        const cookieName = `productY_${this.tempProduct.id}_rating`;  // 使用 product.id 來區分每個產品
        const cookies = document.cookie.split(';');
        let found = false; // 用於標記是否找到相應的 cookie
        for (const cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (name === cookieName) {
            // 更新 tempRating 的值，以便 Vue.js 可以偵測到變化
            this.tempRating.ratingId = this.tempProduct.id;
            this.tempRating.score = parseInt(value, 10) || 0;
            // console.log(`Rating for product ${this.tempProduct.id}: ${value}`);
            found = true;
            break; // 找到相應的 cookie 後退出迴圈
          }
        }

        // 如果未找到相應的 cookie，設定評價為預設值 0
        if (!found) {
          this.tempRating.ratingId = this.tempProduct.id;
          this.tempRating.score = 0;
          // console.log(`No rating found for product ${this.tempProduct.id}. Using default value: 0`);
        }

      } else if(status === 'delete'){
        this.tempProduct = { ...product };
        this.modalDel.show();
      }
    },
    updateProduct(){
      //新增
      if(this.isNew ){
        axios
        .post(
          `${this.api_url}/api/${this.api_path}/admin/product`,
          {data:this.tempProduct}
        )
        .then((res) => {
          console.log(res);
          alert(`已建立產品`);
          this.getProducts();
          this.tempProduct = {};
          this.modalProduct.hide();
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.data.message}`);
        });
      }else if(!this.isNew){
        //更新
        axios
        .put(
          `${this.api_url}/api/${this.api_path}/admin/product/${this.tempProduct.id}`,
          {data:this.tempProduct}
        )
        .then((res) => {
          // console.log(res);
          alert(`已更新產品`);
          this.getProducts();
          this.tempProduct ={};
          this.modalProduct.hide();
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.data.message}`);
        });
      }

    },
    deleteProduct(){
      axios
      .delete(
        `${this.api_url}/api/${this.api_path}/admin/product/${this.tempProduct.id}`,
        {data:this.tempProduct}
      )
      .then((res) => {
        // console.log(res);
        this.removeProductRatingCookie(this.tempProduct.id);  // 將此行移動到重置tempProduct之後
        this.getProducts();
        this.tempProduct ={};
        this.modalDel.hide();
      })
      .catch((err) => {
        // console.log(err);
        alert(`${err.data.message}`);
      });
    },
    removeProductRatingCookie(productId) {
      // 刪除與被刪除產品相關的 cookie
      const cookieName = `productY_${productId}_rating`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
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
    // console.log(this.$refs);
    // myModal=new bootstrap.Modal( document.querySelector('#productModal'));=>element id方法
    this.modalProduct = new bootstrap.Modal(this.$refs.productModal);
    this.modalDel = new bootstrap.Modal(this.$refs.delProductModal);
  },
}).mount("#app");
