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
          <span class="iconfont el-icon-delete" @click="deleteNote"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="currentNote.title" @input="updateNote" @keydown="statusText='正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!previewVisible" v-model="currentNote.content" @input="updateNote"
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
import Bus from '@/helpers/bus';
import Notes from '@/apis/notes';
const MarkdownIt = require('markdown-it')
const lodash = require('lodash')
const md = new MarkdownIt();
import {Message} from 'element-ui';
@Component({
  components: {NoteSidebar}
})
export default class NoteDetail extends Vue {
  notes: note[] = [];
  currentNote = {};
  statusText = '笔记未改动';
  previewVisible = false;
  /* eslint-disable */
  beforeRouteUpdate(to: any, from: any, next: any) {
    this.currentNote = this.notes.find(note => note.id == to.query.noteId) || {}
    next()
  }
  created() {
    Auth.getInfo()
        .then(res => {
          if (!res.isLogin) {
            this.$router.push({path: '/login'});
          }
        });
    Bus.$once('update:notes', (val: note[]) => {
      this.currentNote = val.find(note => note.id + '' == this.$route.query.noteId) || {};
    });
  }
  get previewContent() {
    return md.render((this.currentNote as note).content || '');
  }
  updateNote(){
    lodash.debounce(() => {
      Notes.updateNote({ noteId: (this.currentNote as note).id },
          { title: (this.currentNote as note).title, content: (this.currentNote as note).content }).then(() => {
            this.statusText = '已保存'
          }).catch(() => {
        this.statusText = '保存出错'
      })
    }, 700)()
  }
  deleteNote() {
    Notes.deleteNote({ noteId: (this.currentNote as note).id })
        .then(data => {
          Message.success(data.msg)
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