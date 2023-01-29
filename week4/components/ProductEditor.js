export default {
  name: "ProductEditor",
  template: `
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
                <span v-text="isCreatingProduct ? '新增' : '編輯'"></span>
                <span>產品</span>
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
                    <div class="mb-1">
                      <label for="imageUrl" class="form-label">
                        輸入圖片網址
                      </label>
                      <input
                        type="text"
                        v-model="tempImg"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    <img
                      v-if="tempImg.length > 0"
                      class="img-fluid"
                      :src="tempImg"
                      alt="temp image"
                    />
                  </div>
                  <div class="mb-1" v-if="tempImg.length > 0">
                    <button
                      v-if="!haveSameImg"
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      type="button"
                      @click="addImg"
                    >
                      新增圖片
                    </button>
                    <button
                      v-else
                      class="btn btn-outline-danger btn-sm d-block w-100"
                      type="button"
                      @click="removeImg"
                    >
                      刪除圖片
                    </button>
                  </div>
                  <div>
                    <button
                      class="btn btn-outline-info btn-sm d-block w-100"
                      type="button"
                      @click="openUpload"
                    >
                      上傳圖片
                    </button>
                  </div>
                  <template v-if="Array.isArray(tempProduct.imagesUrl)">
                    <div class="form-label">商品圖片</div>
                    <img
                      v-for="(image, key) in tempProduct.imagesUrl"
                      :key="image"
                      @click="setTempImg(image)"
                      class="img-fluid"
                      :src="image"
                      alt="'product image ' + key"
                    />
                  </template>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input
                      id="title"
                      v-model="tempProduct.title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入標題"
                    />
                  </div>
    
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input
                        id="category"
                        v-model="tempProduct.category"
                        type="text"
                        class="form-control"
                        placeholder="請輸入分類"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">單位</label>
                      <input
                        id="unit"
                        v-model="tempProduct.unit"
                        type="text"
                        class="form-control"
                        placeholder="請輸入單位"
                      />
                    </div>
                  </div>
    
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label"
                        >原價</label
                      >
                      <input
                        id="origin_price"
                        v-model="tempProduct.origin_price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入原價"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input
                        id="price"
                        v-model="tempProduct.price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入售價"
                      />
                    </div>
                  </div>
                  <hr />
    
                  <div class="mb-3">
                    <label for="description" class="form-label"
                      >產品描述</label
                    >
                    <textarea
                      id="description"
                      v-model="tempProduct.description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入產品描述"
                    >
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea
                      id="content"
                      v-model="tempProduct.content"
                      type="text"
                      class="form-control"
                      placeholder="請輸入說明內容"
                    >
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        id="recommend"
                        v-model="tempProduct.recommend"
                        class="form-check-input"
                        type="checkbox"
                      />
                      <label class="form-check-label" for="recommend"
                        >店家推薦</label
                      >
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        id="is_enabled"
                        v-model="tempProduct.is_enabled"
                        class="form-check-input"
                        type="checkbox"
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
              <button
                type="button"
                class="btn btn-primary"
                @click="setProduct"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
      `,
  props: [
    "isCreatingProduct",
    "tempProduct",
    "tempImg",
    "setProduct",
    "productModal",
    "uploadModal",
  ],
  methods: {
    setTempImg(image) {
      this.$emit("update:tempImg", image);
    },
    addImg() {
      if (!Array.isArray(this.tempProduct.imagesUrl)) {
        this.tempProduct.imagesUrl = [];
      }
      this.tempProduct.imagesUrl.unshift(this.tempImg);
      this.$emit("update:tempImg", "");
    },
    removeImg() {
      const removeImgIndex = this.tempProduct.imagesUrl.indexOf(this.tempImg);
      if (removeImgIndex != -1) {
        this.tempProduct.imagesUrl.splice(removeImgIndex, 1);
      }
    },
    openUpload() {
      this.productModal.hide();
      this.uploadModal.show();
    },
  },
  computed: {
    haveSameImg() {
      return this.tempProduct.imagesUrl?.includes(this.tempImg);
    },
  },
};
