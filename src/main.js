import './styles/main.scss';
import { todoView } from '@/views';
import { StatusModel, TaskModel } from '@/models';
import { TodoViewModel, bindProcessor, setInlineProperties } from '@/clients';

async function init() {
  const statusList = await new StatusModel().statusData;
  const taskList = await new TaskModel().taskData;

  todoView();

  const binder = bindProcessor('.todo-main');
  const rootViewModel = setInlineProperties(statusList, taskList);

  binder.watch(rootViewModel);
}

init();
