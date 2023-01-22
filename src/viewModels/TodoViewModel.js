import { typeCheck } from '@/utils';
import { MainViewModel } from '@/viewModels';
/**
 * @param { HTMLElment } target - HTMLElment Type, 하위에 append할 타겟
 * @param { Array } statusList - Model에서 불러온 Status 종류를 가진 배열
 * @param { Array } taskList - Model에서 불러온 Task 정보를 가진 배열
 *
 * @summary - Model에서 불러온 데이터를 view에 그리는 객체
 */

const TodoViewModel = class extends MainViewModel {
  #statusList;
  #taskList;

  constructor(target, statusList, taskList, _1 = typeCheck(statusList, 'object'), _2 = typeCheck(taskList, 'object')) {
    super(target);
    this.#statusList = statusList;
    this.#taskList = taskList;
    this.setInlineProperties();
  }

  setInlineProperties() {
    const { createViewModel } = this;
    const taskListData = Object.entries(this.#taskList);
    console.log(taskListData[0]);
    const statusTitle = (name) => {
      return createViewModel({
        properties: { innerHTML: name },
      });
    };

    const statusCount = (name) => {
      const count = taskListData.filter(([statusName, val]) => statusName === name)[0][1].length;

      return createViewModel({
        properties: { innerHTML: count },
      });
    };

    const task = (isActive) => {
      if (isActive) {
        return createViewModel({
          classLists: { add: 'active-bg' },
        });
      }

      return createViewModel({});
    };

    const taskInputData = (isActive, data) => {
      return createViewModel({
        properties: { innerHTML: data, disabled: !isActive },
      });
    };

    const addTask = (name) => {
      return createViewModel({
        events: {
          click: () => {},
        },
      });
    };

    const taskAuthor = (isActive) => {
      if (!isActive) {
        return createViewModel({ properties: { innerHTML: 'author by JangOh' } });
      }

      return createViewModel({});
    };

    const taskButton = (isActive) => {
      if (!isActive) {
        return createViewModel({
          classLists: { toggle: 'active' },
        });
      }

      return createViewModel({});
    };

    const taskList = (name) => {
      if (!name) return;

      return createViewModel({
        attributes: { 'data-statusName': name },
        template: {
          name: 'task',
          data: taskListData
            .filter(([statusName, val]) => statusName === name)[0][1]
            .map((taskData) =>
              createViewModel({
                task: task(taskData.active),
                taskTitle: taskInputData(taskData.active, taskData.title),
                taskContent: taskInputData(taskData.active, taskData.content),
                taskAuthor: taskAuthor(taskData.active),
                taskButton: taskButton(taskData.active),
              }),
            ),
        },
      });
    };

    const main = createViewModel({
      template: {
        name: 'status',
        data: Object.values(this.#statusList).map((name) =>
          createViewModel({
            statusTitle: statusTitle(name),
            statusCount: statusCount(name),
            addTask: addTask(name),
            taskList: taskList(name),
          }),
        ),
      },
    });

    this.rootViewModel = createViewModel({
      main,
      // changeContents() {
      //   this.contents.properties.innerHTML = Math.random().toString(16).replace('.', '');
      //   this.list.template.data.forEach(({ item: { styles, properties } }) => {
      //     properties.innerHTML = Math.random().toString(16).replace('.', '');
      //     styles.background = `rgb(${getRandom()},${getRandom()},${getRandom()})`;
      //   });
      // },
    });

    this.watchRootViewModel(this.rootViewModel);

    // const f = () => {
    //   this.rootViewModel.changeContents();
    //   if (!rootViewModel.isStop) requestAnimationFrame(f);
    // };
    // f();
  }
};

export default TodoViewModel;
