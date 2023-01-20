import './styles/main.scss';

import { StatusView } from '@/views';
import { StatusModel } from '@/models';
import StatusViewModel from '@/viewModels/StatusViewModel.js';

async function init() {
  const statusList = await new StatusModel().statusData;

  StatusView();
  new StatusViewModel('.todo-main', statusList);
}

init();
