import { typeCheck } from '@/utils';
import { MainViewModel } from '@/viewModels';
import { ViewModel } from '@/core';
/**
 * @param { HTMLElment } target - HTMLElment Type, 하위에 append할 타겟
 * @param { Array } statusList - Model에서 불러온 Status 종류를 가진 배열
 *
 * @summary - statusList에 들어있는 배열의 값들만큼 view를 그리는 객체
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

    const statusTitle = ViewModel.get({});
    const statusCount = ViewModel.get({});
    const taskList = ViewModel.get({});

    const main = ViewModel.get({
      template: {
        name: 'status',
        data: Object.values(this.#statusList).map((name) =>
          ViewModel.get({
            statusTitle: ViewModel.get({
              properties: { innerHTML: name },
            }),
            statusCount: ViewModel.get({
              properties: { innerHTML: 0 },
            }),
            taskList: ViewModel.get({
              attributes: { 'data-statusName': name },
            }),
          }),
        ),
      },
    });

    this.rootViewModel = createViewModel({
      main,
      statusTitle,
      statusCount,
      taskList,
    });

    this.watchRootViewModel(this.rootViewModel);
  }
};

export default StatusViewModel;
