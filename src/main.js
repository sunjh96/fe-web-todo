import './styles/main.scss';
import { todoView } from '@/views';
import { StatusModel, TaskModel } from '@/models';
import { bindProcessor, setInlineProperties } from '@/clients';
import { getTaskCount } from '@/api/task';

async function init() {
  const statusList = await new StatusModel().statusData;
  const taskList = await new TaskModel().taskData;
  const taskCount = await getTaskCount();

  todoView(taskCount);

  const binder = bindProcessor('.todo-main');
  const rootViewModel = setInlineProperties(statusList, taskList, binder);

  binder.watch(rootViewModel);
}

init();
