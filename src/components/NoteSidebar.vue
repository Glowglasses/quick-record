<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="addNote">添加笔记</span>
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
import {Component} from 'vue-property-decorator';
import {DropdownItem, DropdownMenu, Dropdown} from 'element-ui';
import Notes from '@/apis/notes';
import Notebooks from '@/apis/notebooks';
import {notebook} from '@/helpers/notebookType';
import {note} from '@/helpers/noteType';
import Bus from '@/helpers/bus'
@Component({
  components: {[Dropdown.name]: Dropdown, [DropdownItem.name]: DropdownItem, [DropdownMenu.name]: DropdownMenu}
})
export default class NoteSidebar extends Vue {
  notebooks: notebook[] = [];
  notes: note[] = [];
  currentBook = {};

  created() {
    Notebooks.getAll().then(response => {
      this.notebooks = response.data;
      this.currentBook = this.notebooks.find(notebook => notebook.id+"" === this.$route.query.notebookId) || this.notebooks[0] || {};
      return Notes.getAll({notebookId: (this.currentBook as note).id});
    }).then(response => {
      this.notes = response.data;
      this.$emit('update:notes', this.notes);
      Bus.$emit('update:notes', this.notes)
    });
  }

  handleCommand(notebookId: string) {
    if (notebookId == 'trash') {
      return this.$router.push({path: '/trash'});
    }
    this.currentBook = {...this.notebooks.find((notebook: notebook) => notebook.id + '' == notebookId)};
    Notes.getAll({notebookId: parseInt(notebookId)})
        .then(response => {
          this.notes = response.data;
          this.$emit('update:notes', this.notes);
        });
  }

  addNote() {
    Notes.addNote({notebookId: (this.currentBook as note).id})
        .then(response => {
          if (response.data) this.notes.unshift(response.data);
        });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/noteSidebar";
</style>