// 前提是未使用元件方式建立完成，轉元件寫法
// 拆成元件流程
// 1.先把元件環境建立好(建立檔案+各別加入 import export+製作區域註冊+HTML加入元件標籤)
// 2.把版型加入
// 3.解除版型內錯誤(將要從外部匯入資料寫在props)
// 4.refs,bootstrap

export default {
    props:['tempProduct','updateProduct','isNew','upload','score','tempRating','ratingData'],
    data(){
        return{
            modalProduct:null,
        }
    },
    methods:{
        openModal(){
            this.modalProduct.show();
        },
        closeModal(){
            this.modalProduct.hide();
        },

    },
    template:`
    <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ isNew ? "新增產品" : "編輯產品"}}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label"
                    >輸入圖片網址</label
                  >
                  <input
                    type="text" v-model="tempProduct.imageUrl"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              </div>
              <!-- 多圖設置 -->
              <!-- 判斷 tempProduct.imagesUrl"是一個陣列-->
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div v-for="(item,key) in tempProduct.imagesUrl" :key="key+123">
                  <img :src="item" alt="" class="img-fluid my-2">
                  <input type="text" class="form-control" v-model="tempProduct.imagesUrl[key]">
                </div>
                <!-- v-if 判斷沒有圖片時顯示或有點選新增圖片未填寫完成網址時 -->
                <button 
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  v-if="tempProduct.imagesUrl.length ===0 || tempProduct.imagesUrl[tempProduct.imagesUrl.length-1]"
                  @click="tempProduct.imagesUrl.push('')"
                >
                  新增圖片
                </button>
                <button v-else class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                  刪除圖片
                </button>
              </div>
              <div class="pt-3">
                <input type="file" class="form-control" id="file" ref="fileInput" placeholder="請輸入圖片連結" @change="upload">
              </div>
              <div>
              </div>
            </div>
            <div class="col-sm-8">
              <!-- <pre>
                {{tempProduct}}
              </pre> -->
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text" v-model="tempProduct.title"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text" v-model="tempProduct.category"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text" v-model="tempProduct.unit"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number" v-model="tempProduct.origin_price"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number" v-model="tempProduct.price"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 d-flex align-items-center">
                  <label for="range" class="form-label me-3 mb-0">商品評價</label>
                  <div class="starrating risingstar d-flex justify-content-center flex-row-reverse">
                  <input type="radio" id="star5" name="rating" :value="5" v-model="tempRating.score" @click="ratingData(tempProduct.id,5)" /><label for="star5" title="5 star"></label>
                  <input type="radio" id="star4" name="rating" :value="4" v-model="tempRating.score" @click="ratingData(tempProduct.id,4)" /><label for="star4" title="4 star"></label>
                  <input type="radio" id="star3" name="rating" :value="3" v-model="tempRating.score" @click="ratingData(tempProduct.id,3)" /><label for="star3" title="3 star"></label>
                  <input type="radio" id="star2" name="rating" :value="2" v-model="tempRating.score" @click="ratingData(tempProduct.id,2)" /><label for="star2" title="2 star"></label>
                  <input type="radio" id="star1" name="rating" :value="1" v-model="tempRating.score" @click="ratingData(tempProduct.id,1)" /><label for="star1" title="1 star"></label>
                </div>
                <div class="col-md-4 ms-3">
                  {{tempRating.score ? tempRating.score : 0}}顆星
                  </div>
                  <button type="button" class="btn btn-primary" @click.prevent="ratingData(tempProduct.id,0)">清除</button>
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text" v-model="tempProduct.description"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text" v-model="tempProduct.content"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox" v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
      </div>
    </div>
  </div>
    `,
    mounted(){
         this.modalProduct = new bootstrap.Modal(this.$refs.productModal);
    }
}