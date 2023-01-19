import { typeCheck } from '@/utils';
import { MainViewModel } from '@/viewModels';

/**
 * @param { HTMLElment } target - HTMLElment Type, 하위에 append할 타겟
 * @param { object } statusList - Model에서 불러온 Status 종류
 * @summary -
 */

const StatusViewModel = class extends MainViewModel {
  #statusList;

  constructor(target, statusList, _1 = typeCheck(statusList, 'object')) {
    super(target);
    this.#statusList = statusList;
    this.setInlineProperties();
  }

  setInlineProperties() {
    const { createViewModel } = this;
    const viewModelList = {};

    Object.entries(this.#statusList).forEach(([key, val]) => {
      viewModelList[`status${key - 1}`] = createViewModel({});
      viewModelList[`add_task_btn${key - 1}`] = createViewModel({});
      viewModelList[`delete_status_btn${key - 1}`] = createViewModel({});
      viewModelList[`status_title${key - 1}`] = createViewModel({
        properties: { innerHTML: val },
      });
      viewModelList[`task_count${key - 1}`] = createViewModel({ properties: { innerHTML: 0 } });
    });

    const lists = createViewModel({
      lists: { data: 3 },
    });

    const rootViewModel = createViewModel({
      ...viewModelList,
      lists,
    });

    this.watchRootViewModel(rootViewModel);
  }
};

export default StatusViewModel;
