// 前提是未使用元件方式建立完成，轉元件寫法
// 拆成元件流程
// 1.先把元件環境建立好(建立檔案+各別加入 import export+製作區域註冊+HTML加入元件標籤)
// 2.把版型加入
// 3.解除版型內錯誤(將要從外部匯入資料寫在props)
// 4.refs,bootstrap

export default {
    props:['tempProduct','deleteProduct'],
    data(){
        return{
            modelDel:null
        }
    },
    methods:{
        openModal(){
            this.modelDel.show();
        },
        closeModal(){
            this.modelDel.hide();
        }
    },
    template:`
    <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{tempProduct.title}}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteProduct"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
    `,
    mounted(){
        this.modelDel = new bootstrap.Modal(this.$refs.delProductModal);
   }
}