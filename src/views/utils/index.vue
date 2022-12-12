<template>
  <div ref="utilsDom" class="a">
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-change="handleChange"
      :auto-upload="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <img :src="fileZipImg" />
    <!-- <video :src="fileZipImg" /> -->
  </div>
</template>
<script>
import compressImg from './test'
import { decompression } from 'hsja-utils'
import axios from 'axios'
export default {
  name: 'utils',
  data() {
    return {
      imageUrl: '',
      fileZipImg: '',
    }
  },
  mounted() {
    this.testZip()
  },
  methods: {
    beforeAvatarUpload(file) {
      console.log('beforeAvatarUpload-file', file)
    },
    async handleChange(file) {
      console.log('file', file) // 1609194
      const afterFile = await compressImg(file.raw)
      console.log('afterFile', afterFile) // 0.5 407784
      // console.log('this.imageUrl', this.imageUrl)

      // const compressorFile = await this.imageCompressor(file.raw)
      // console.log('compressorFile', compressorFile)
      const read = new FileReader()
      read.readAsDataURL(afterFile)
      read.onload = (e) => {
        const img = new Image()
        // 允许资源跨域使用
        img.setAttribute('crossOrigin', 'anonymous')
        img.src = e.target.result
        this.imageUrl = img.src
      }
    },

    async testZip() {
      const file = await axios.get('/test-zip.zip', { responseType: 'blob' })
      console.log('file', file)
      const files = await decompression(file, 'img-bas64')
      // const files = await this.decompression(file, 'img-bas64')
      console.log('decompression', files)
      this.fileZipImg = files.transformObj['test-zip/daping.png']
      // console.log('this.fileZipImg', this.fileZipImg)
    },
    arrayBufferToBase64(buffer) {
      var binary = ''
      var bytes = new Uint8Array(buffer)
      var len = bytes.byteLength
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return window.btoa(binary)
    },
  },
}
</script>
<style lang="css">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
.avatar {
  display: block;
}
</style>
