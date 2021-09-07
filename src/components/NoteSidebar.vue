<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ currentBook.title }} <i class="iconfont el-icon-arrow-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(notebook,index) in notebooks" :key="index" :command="notebook.id">
          {{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="(note,index) in notes" :key="index">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${currentBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {DropdownItem, DropdownMenu, Dropdown} from 'element-ui';
import {mapActions, mapGetters, mapMutations} from 'vuex';
import {notebook} from '@/helpers/notebookType';
import {note} from '@/helpers/noteType';

@Component({
  computed: mapGetters(['currentBook', 'notes', 'notebooks', 'currentNote']),
  methods: {...mapActions(['getNotebooks', 'addNote', 'getNotes']), ...mapMutations(['setCurrentBook'])},
  components: {[Dropdown.name]: Dropdown, [DropdownItem.name]: DropdownItem, [DropdownMenu.name]: DropdownMenu},
})
export default class NoteSidebar extends Vue {
  getNotebooks!: () => Promise<void>;
  setCurrentBook!: ({currentBookId}: { currentBookId: any }) => void;
  addNote!: ({notebookId}: { notebookId: number }) => Promise<void>;
  getNotes!: ({notebookId}: { notebookId: number }) => Promise<void>;
  notes!: note[]
  currentBook!: notebook;

  created() {
    this.getNotebooks().then(() => {
      this.setCurrentBook({currentBookId: this.$route.query.notebookId});
      return this.getNotes({notebookId: this.currentBook.id});
    }).then(() => {
      this.$store.commit('setCurrentNote', this.$route.query.noteId);
    });
  }

  handleCommand(notebookId: string) {
    if (notebookId === 'trash') {
      return this.$router.push({path: '/trash'});
    }
    this.setCurrentBook({currentBookId: notebookId});
    // this.getNotes({notebookId: parseInt(notebookId)});
    this.$router.replace({path: '/note', query: {'noteId': this.notes[0].id + '','notebookId': this.currentBook.id + ''}});
  }

  onAddNote() {
    this.addNote({notebookId: this.currentBook.id});
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/noteSidebar";
</style>