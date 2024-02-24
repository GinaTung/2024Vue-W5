// 前提是未使用元件方式建立完成，轉元件寫法
// 拆成元件流程
// 1.先把元件環境建立好(建立檔案+各別加入 import export+製作區域註冊+HTML加入元件標籤)
// 2.把版型加入
// 3.解除版型內錯誤(將要從外部匯入資料寫在props)


export default {
    props:['pages','getProducts'],
    template:`
    <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled : !pages.has_pre}">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true"  @click="getProducts(pages.current_page -1)">&laquo;</span>
        </a>
      </li>
      <!-- 為何key要加123?
      因page為索引數值，vue官方說不建議用索引直接當值，所以加上其他數值，避免問題 -->
      <li class="page-item" v-for="page in pages.total_pages" :key="page + 123" :class="{ active : page === pages.current_page}">
        <a class="page-link" href="#" @click="getProducts(page)">{{page}}</a>
      </li>
      <!-- 動態屬性
      要加入目前所在頁面按鈕有active樣式，需綁定樣式
    v-blind:class插入物件 { 套用Class名稱 : 判斷式 } -->
      <li class="page-item" :class="{disabled : !pages.has_next}">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true" @click="getProducts(pages.current_page +1)">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
    `
}