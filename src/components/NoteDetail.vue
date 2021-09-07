<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">选择或创建笔记</div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ currentNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ currentNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <span class="iconfont el-icon-magic-stick" @click="previewVisible = !previewVisible"></span>
          <span class="iconfont el-icon-delete" @click="onDeleteNote"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="currentNote.title" @input="onUpdateNote" @keydown="statusText='正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!previewVisible" @input="onUpdateNote" v-model="currentNote.content"
                    @keydown="statusText='正在输入...'" placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="previewVisible">
          </div>
        </div>
        </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Auth from '@/apis/auth';
import Component from 'vue-class-component'
import NoteSidebar from '@/components/NoteSidebar.vue';
import {note} from '@/helpers/noteType';
import {mapActions, mapGetters} from 'vuex';
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
})
Component.registerHooks([
  'beforeRouteUpdate',
]);
@Component({
  computed:mapGetters(['notes','currentNote','currentBook']),
  methods: mapActions(['updateNote','deleteNote','checkLogin']),
  components: {NoteSidebar},
})
export default class NoteDetail extends Vue {
  statusText = '笔记未改动';
  previewVisible = false;
  updateNote!: ({noteId,title,content}: {noteId: number,title: string,content: string})=> Promise<void>
  deleteNote!: ({noteId}:{noteId: number}) => Promise<void>
  checkLogin!: () => Promise<void>
  notes!: note[]
  currentNote!: note
  timer: any = null

  beforeRouteUpdate(to: any, from: any, next: any) {
    this.$store.commit("setCurrentNote",{currentNoteId: to.query.noteId})
    if (this.previewVisible) this.previewVisible = false
    next()
  }
  debounce(fn: any,delay: number){
    if(this.timer){
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(fn,delay)
  }
  created() {
    this.checkLogin()
  }
  get previewContent() {
    return md.render(this.currentNote.content || "")
  }
  onUpdateNote(){
    if (!this.currentNote.id) return
    this.debounce(() => {
      return this.updateNote({noteId:this.currentNote.id,title: this.currentNote.title,content: this.currentNote.content}).then(() => {
        this.statusText = '已保存'
      }).catch(() => {
        this.statusText = '保存出错'
      })
    },1500)
  }
  onDeleteNote() {
    this.deleteNote({noteId:this.currentNote.id}).then(() => {
      this.notes.splice(this.notes.indexOf(this.currentNote as note), 1)
      this.$router.replace({ path: '/note' })
    })
  }
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/noteDetail.scss";
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>