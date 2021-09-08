<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont el-icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link v-for="(notebook, index) in notebooks" :to=" `/note?notebookId=${notebook.id}`" class="notebook"
                       :key="index">
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
import Component from 'vue-class-component';
import {notebook} from '@/helpers/notebookType';
import {MessageBox} from 'element-ui';
import {MessageBoxInputData} from 'element-ui/types/message-box';
import {mapActions, mapGetters} from 'vuex';
import {getInfo} from '@/helpers/authType';

@Component({
  computed: mapGetters([
    'notebooks'
  ]),
  methods: mapActions([
    'getNotebooks',
    'addNotebook',
    'updateNotebook',
    'deleteNotebook',
    'checkLogin'
  ])
})
export default class NotebookList extends Vue {
  checkLogin!: ({path}:{path:string}) => Promise<getInfo>;

  created() {
    this.checkLogin({path:'/login'}).then(() => {
      this.getNotebooks();
    })
  }

  getNotebooks!: () => Promise<void>;
  addNotebook!: ({title}: { title: string }) => Promise<void>;
  updateNotebook!: ({notebookId, title}: { notebookId: number, title: string }) => Promise<void>;
  deleteNotebook!: ({notebookId}: { notebookId: number }) => Promise<void>;

  onCreate() {
    MessageBox.prompt('输入新笔记本标题', '创建笔记本', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^.{1,30}$/,
      inputErrorMessage: '标题不能为空，且不超过30个字符',
      customClass: 'messageBox',
    }).then((value) => {
      const title = (value as MessageBoxInputData).value;
      this.addNotebook({title});
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
      this.updateNotebook({notebookId: notebook.id, title: title});
    });
  }

  onDelete(notebook: notebook) {
    MessageBox.confirm('确认要删除笔记本吗', '删除笔记本', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      customClass: 'messageBox',
    }).then(() => {
      this.deleteNotebook({notebookId: notebook.id});
    });
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/notebooksList.scss";
</style>
<style>
@media (max-width: 500px) {
  .el-message-box.messageBox {
    position: absolute;
    width: 65%;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>