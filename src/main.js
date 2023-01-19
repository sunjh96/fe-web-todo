import './styles/main.scss';

import { StatusModel } from '@/models';
import { MainViewModel, StatusViewModel } from '@/viewModels';
import { StatusView } from '@/views';

async function init() {
  const statusList = await new StatusModel().statusData;

  new MainViewModel('.todo-main').test();
  StatusView();
  new StatusViewModel('.todo-main', statusList);
}

init();
