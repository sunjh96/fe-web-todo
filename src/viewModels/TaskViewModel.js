import { typeCheck } from '@/utils';
import { MainViewModel, StatusViewModel } from '@/viewModels';
import { ViewModel } from '@/core';
/**
 * @param { HTMLElment } target - HTMLElment Type, 하위에 append할 타겟
 * @param { object } taskList - Model에서 불러온 Status 종류
 * @summary -
 */

const TaskViewModel = class extends MainViewModel {
  #taskList;

  constructor(target, statusList, taskList, _2 = typeCheck(taskList, 'object')) {
    super(target, statusList);
    this.#taskList = taskList;
    this.setInlineProperties();
  }

  setInlineProperties() {
    const { createViewModel } = this;
    // console.log(rootViewModel);
    const taskTitle = ViewModel.get({});

    const taskList = ViewModel.get({
      template: {
        name: 'task',
        data: Object.values(this.#taskList).map((v) =>
          ViewModel.get({
            taskTitle: ViewModel.get({
              properties: { innerHTML: v[0].title },
            }),
          }),
        ),
      },
    });

    // rootViewModel = createViewModel({
    //   taskList,
    //   taskTitle,
    // });

    // this.watchRootViewModel(rootViewModel);
  }
};

export default TaskViewModel;
