import './styles/main.scss';
import { todoView } from '@/views';
import { StatusModel, TaskModel } from '@/models';
import { TodoViewModel, bindProcessor, setInlineProperties } from '@/clients';

async function init() {
  const statusList = await new StatusModel().statusData;
  const taskList = await new TaskModel().taskData;

  // const statusList = ['해야할일', '완료'];
  // const taskList = ['1', '2'];

  todoView();
  const binder = bindProcessor('.todo-main');
  const rootViewModel = setInlineProperties(statusList, taskList);

  binder.watch(rootViewModel);
  // new TodoViewModel('.todo-main', statusList, taskList);
}

init();
