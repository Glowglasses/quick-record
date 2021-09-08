<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="(note,index) in trashNotes" :key="index">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span> 创建日期: {{ currentTrashNote.createdAtFriendly }}</span>
        <span> | </span>
        <span> 更新日期: {{ currentTrashNote.updatedAtFriendly }}</span>
        <span> | </span>
        <span> 所属笔记本: {{ belongTo }}</span>

        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ currentTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {mapActions, mapGetters, mapMutations} from 'vuex';
import {note} from '@/helpers/noteType';
import {MessageBox} from 'element-ui';

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

@Component({
  methods: {...mapActions(['checkLogin', 'getTrashNotes', 'revertTrashNote', 'deleteTrashNote', 'getNotebooks']),...mapMutations(['setCurrentTrashNote'])},
  computed: mapGetters(['trashNotes', 'currentTrashNote', 'belongTo'])
})
export default class TrashDetail extends Vue {
  checkLogin!: ({path}: { path: string }) => Promise<void>;
  getTrashNotes!: () => Promise<void>;
  getNotebooks!: () => Promise<void>;
  deleteTrashNote!: ({noteId}: {noteId: number}) => Promise<void>;
  trashNotes!: note[];
  currentTrashNote!: note;
  revertTrashNote!: ({noteId}: {noteId: number}) => Promise<void>
  setCurrentTrashNote!: ({currentTrashNoteId}: {currentTrashNoteId: number}) => void

  created() {
    this.checkLogin({path: 'login'});
    this.getTrashNotes().then(() => {
      this.getNotebooks()
      this.$store.commit('setCurrentTrashNote', this.$route.query.noteId);
    });
  }

  get compiledMarkdown(){
    return md.render(this.currentTrashNote.content || "")
  }
  onDelete() {
    MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      return this.deleteTrashNote({noteId: this.currentTrashNote.id});
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
  }

  onRevert() {
    this.revertTrashNote({noteId: this.currentTrashNote.id});
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    this.setCurrentTrashNote({currentTrashNoteId: to.query.noteId});
    next();
  }
}


</script>

<style lang="scss" scoped>
@import "~@/assets/style/noteSidebar.scss";
@import "~@/assets/style/noteDetail.scss";

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;

    }
  }
}
</style>