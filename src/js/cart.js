
const { createApp } = Vue;
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});

//建立表單元件
const userModal = {
  props: ["tempProduct", "addToCart"],
  data() {
    return {
      productModal: null,
      qty: 1,
    };
  },
  methods: {
    open() {
      this.productModal.show();
    },
    close() {
      this.productModal.hide();
    },
  },
  template: "#userProductModal",
  // 監聽aty重開為初始值
  //監聽外面傳進來的值，使用watch
  watch: {
    tempProduct() {
      this.qty = 1;
    },
  },
  mounted() {
    // this.$refs.modal寫的modal是單一視窗的ref
    this.productModal = new bootstrap.Modal(this.$refs.modal);
    // this.productModal.show();
  },
};

const app = createApp({
  data() {
    return {
      api_url: "https://ec-course-api.hexschool.io/v2",
      api_path: "yuling2023",
      products: [],
      tempProduct: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      status: {
        addCartLoading: "",
        carteQtyLoading:""
      },
      carts: {},
    };
  },
  components: {
    userModal,
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    getProducts() {
      axios
        .get(`${this.api_url}/api/${this.api_path}/products/all`)
        .then((res) => {
          // console.log(res);
          this.products = res.data.products;
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.response.data.message}`);
        });
    },
    openModal(singleProduct) {
      this.tempProduct = singleProduct;
      this.$refs.userModal.open();
    },
    addToCart(product_id, qty = 1) {
      const order = {
        product_id,
        qty,
      };
      this.status.addCartLoading = product_id;
      // console.log(order);
      axios
        .post(`${this.api_url}/api/${this.api_path}/cart`, { data: order })
        .then((res) => {
          // console.log(res);
          this.status.addCartLoading = '';
          // 每點選加入購物車按鈕觸發一次就數量+1
          this.getCart();
          this.$refs.userModal.close();
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.response.data.message}`);
        });
    },
    changeCartQty(item, qty = 1) {
      const order = {
        product_id : item.product_id,
        qty,
      };
      this.status.carteQtyLoading = item.id;
      // console.log(order);
      axios
        .put(`${this.api_url}/api/${this.api_path}/cart/${item.id}`, { data: order })
        .then((res) => {
          // console.log(res);
          this.status.carteQtyLoading = '';
          this.getCart();
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.response.data.message}`);
        });
    },
    removeCartItem(productTitle,id){
      this.status.carteQtyLoading = id;
      console.log(this.carts);
      axios
      .delete(`${this.api_url}/api/${this.api_path}/cart/${id}`)
      .then((res) => {
        // console.log(res);
        Swal.fire({
          position: "top",
          icon: "success",
          title: `已刪除 <span style="color: red;">${productTitle}</span> 成功`,
          showConfirmButton: false,
          timer: 1500
        });
        this.status.carteQtyLoading = '';
        this.getCart();
      })
      .catch((err) => {
        // console.log(err);
        alert(`${err.response.data.message}`);
      });
    },
    deleteAllCarts() {
      const url = `${this.api_url}/api/${this.api_path}/carts`;
      axios.delete(url).then((response) => {
        // alert(response.data.message);
        // alert("已全部刪除")
        Swal.fire({
          position: "top",
          icon: "success",
          title: "已全部刪除",
          showConfirmButton: false,
          timer: 1500
        });
        this.getCart();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    getCart() {
      axios
        .get(`${this.api_url}/api/${this.api_path}/cart`)
        .then((res) => {
          // console.log(res);
          this.carts = res.data.data;
          // console.log(this.carts);
        })
        .catch((err) => {
          // console.log(err);
          alert(`${err.response.data.message}`);
        });
    },
    createOrder() {
      const url = `${this.api_url}/api/${this.api_path}/order`;
      const order = this.form;
      axios.post(url, { data: order }).then((response) => {
        // alert(response.data.message);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "已建立訂單",
          showConfirmButton: false,
          timer: 1500
        });
        this.$refs.form.resetForm();
        this.getCart();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
});
app.mount("#app");
