import { ViewModel } from '@/core';
import { typeCheck } from '@/utils';
import { addTask } from '@/clients/statusEvent';
import { onClickEditTaskButton } from '@/clients/taskEvent';

/**
 * @param { Array } statusList - Model에서 불러온 Status 종류를 가진 배열
 * @param { Array } taskList - Model에서 불러온 Task 정보를 가진 배열
 * 
 * @returns rootViewModel - Model에서 불러온 데이터를 view에 그리는 객체
 */

export default function setInlineProperties(statusList, taskList, _0 = typeCheck(statusList, 'object'), _1 = typeCheck(taskList, 'object')) {
  const rootViewModel = ViewModel.get({
    statusTemplate: statusTemplate(statusList, taskList),
    statusTitle: statusTitle(),
    statusCount: statusCount(),
    addTask: ViewModel.get({}),

    taskTemplate: taskTemplate(),
    taskCard: taskCard(),
    taskTitle: taskInputData(),
    taskContent: taskInputData(),
    taskAuthor: taskAuthor(),

    taskButton: buttonActive(),
    editTaskButton: ViewModel.get({}),
    deleteTaskButton: ViewModel.get({}),
    submitButton: ViewModel.get({}),
    cancelButton: onClickEditTaskButton(),
  });

  return rootViewModel;
}

function statusTemplate(statusList, taskList) {
  return ViewModel.get({
    template: {
      name: 'status',
      data: Object.values(statusList).map((statusName) =>
        ViewModel.get({
          statusTitle: statusTitle(statusName),
          statusCount: statusCount(statusName, taskList),
          addTask: addTask(statusName),
          taskTemplate: taskTemplate(statusName, taskList),
          // taskTemplate: taskTemplate.bind({ ...bindName, taskList: taskList })(),
        }),
      ),
    },
  });
}

function taskTemplate(statusName, taskList) {
  if (!statusName) return ViewModel.get({});

  return ViewModel.get({
    attributes: { 'data-statusName': statusName },
    template: {
      name: 'task',
      data: Object.entries(taskList)
        .filter(([key, val]) => key === statusName)[0][1]
        .map((taskData) => {
          const { active, title, content } = taskData;

          return ViewModel.get({
            taskCard: taskCard(active),
            taskTitle: taskInputData(active, title),
            taskContent: taskInputData(active, content),
            taskAuthor: taskAuthor(active),

            taskButton: buttonActive(active),
            editTaskButton: buttonActive(active),
            deleteTaskButton: buttonActive(active),
            submitButton: ViewModel.get({}),
            cancelButton: onClickEditTaskButton(),
          });
        }),
    },
  });
}

function statusTitle(statusName) {
  if (!statusName) return ViewModel.get({});

  return ViewModel.get({
    properties: { innerHTML: statusName },
  });
}

function statusCount(statusName, taskList) {
  if (!statusName) return ViewModel.get({});
  const count = Object.entries(taskList).filter(([key, val]) => key === statusName)[0][1].length;

  return ViewModel.get({
    properties: { innerHTML: count },
  });
}

function taskCard(isActive) {
  if (!isActive) return ViewModel.get({});

  return ViewModel.get({
    classLists: { toggle: 'active-bg' },
  });
}

function taskInputData(isActive, data) {
  return ViewModel.get({
    properties: { innerHTML: data, disabled: !isActive },
    events: {
      change: (viewModel) => (e) => {
        viewModel.properties.innerHTML = e.target.value;
      },
    },
  });
}

function taskAuthor(isActive) {
  if (isActive) return ViewModel.get({ properties: { innerHTML: '' } });

  return ViewModel.get({ properties: { innerHTML: 'author by JangOh' } });
}

function buttonActive(isActive) {
  if (!isActive) {
    return ViewModel.get({
      classLists: { toggle: 'active' },
    });
  }

  return ViewModel.get({ classLists: { toggle: 'test' } });
}
