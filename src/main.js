import './styles/main.scss';
import { StatusView } from '@/views';
import { StatusModel, TaskModel } from '@/models';
import { TodoViewModel } from '@/viewModels';

async function init() {
  const statusList = await new StatusModel().statusData;
  const taskList = await new TaskModel().taskData;

  // const statusList = ['해야할일', '완료'];
  // const taskList = ['1', '2'];

  StatusView();
  new TodoViewModel('.todo-main', statusList, taskList);
}

init();
