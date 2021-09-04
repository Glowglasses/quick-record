<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont el-icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link v-for="(notebook, index) in notebooks" :to=" '/note/' + notebook.id" class="notebook" :key="index">
            <div>
              <span class="iconfont icon-notebook"></span> {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Auth from '@/apis/auth';
import {notebook} from '@/helpers/notebookType';
import {friendlyDate} from '@/helpers/util';
import Notebooks from '@/apis/notebooks';
import {MessageBox, Message} from 'element-ui';
import {MessageBoxInputData} from 'element-ui/types/message-box';

@Component
export default class NotebookList extends Vue {
  notebooks: notebook[] = [];

  created() {
    Auth.getInfo().then((data) => {
      if (!data.isLogin) {
        this.$router.push('/login');
      }
    });
    Notebooks.getAll().then(response => {
      this.notebooks = response.data;
    });
  }

  onCreate() {
    MessageBox.prompt('输入新笔记本标题', '创建笔记本', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^.{1,30}$/,
      inputErrorMessage: '标题不能为空，且不超过30个字符',
      customClass: 'messageBox',
    }).then((value) => {
      return Notebooks.addNotebook({title: (value as MessageBoxInputData).value});
    }).then(response => {
      response.data.friendlyCreatedAt = friendlyDate(response.data.createdAt);
      this.notebooks.unshift(response.data);
      Message.success(response.msg);
    });
  }

  onEdit(notebook: notebook) {
    let title = '';
    MessageBox.prompt('输入新笔记本标题', '修改笔记本', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^.{1,30}$/,
      inputValue: notebook.title,
      inputErrorMessage: '标题不能为空，且不超过30个字符',
      customClass: 'messageBox',
    }).then((value) => {
      title = (value as MessageBoxInputData).value;
      return Notebooks.updateNotebook(notebook.id, {title});
    }).then(response => {
      notebook.title = title;
      Message.success(response.msg);
    });
  }

  onDelete(notebook: notebook) {
    MessageBox.confirm('确认要删除笔记本吗', '删除笔记本', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      customClass: 'messageBox',
    }).then(() => {
      return Notebooks.deleteNotebook(notebook.id);
    }).then(response => {
      this.notebooks.splice(this.notebooks.indexOf(notebook), 1);
      Message.success(response.msg);
    });
  }

}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/notebooksList.scss";
</style>
<style>
@media (max-width: 500px) {
  .messageBox {
    width: 70%;
  }
}
</style>