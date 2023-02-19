<template>
  <div
    id="uploadModal"
    ref="uploadModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="uploadModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-info text-white">
          <h5 id="uploadModalLabel" class="modal-title">
            <span>上傳圖片</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="tempUploadImg.length > 0">
            <img id="preview" class="img-fluid" :src="tempUploadImg" />
          </div>
          <form
            enctype="multipart/form-data"
            method="post"
            @submit.prevent="uploadImg"
          >
            <input
              @change="checkImg"
              type="file"
              name="file-to-upload"
              accept="image/jpg, image/jpeg, image/png"
            />
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="uploadImg">
            確認上傳
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UploadImage",
  props: ["checkImg", "uploadImg", "tempUploadImg"],
};
</script>
