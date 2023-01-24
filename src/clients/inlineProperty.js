import { ViewModel } from '@/core';
import { typeCheck } from '@/utils';
import { addTask } from '@/clients/statusEvent';
import { TaskModel } from '@/models';
import { onClickEditTaskButton, onClickCancelButton, onClickSubmitButton } from '@/clients/taskEvent';

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
    editTaskButton: editTaskButton(),
    deleteTaskButton: ViewModel.get({}),
    submitButton: onClickSubmitButton(),
    cancelButton: onClickCancelButton(),
  });

  return rootViewModel;
}

function statusTemplate(statusList, taskList) {
  return ViewModel.get({
    template: {
      name: 'status',
      data: statusList.map((statusName) =>
        ViewModel.get({
          statusTitle: statusTitle(statusName),
          statusCount: statusCount(statusName, taskList[statusName]),
          addTask: addTask(statusName),
          taskTemplate: taskTemplate(statusName, taskList[statusName]),
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
      data: taskList.map((taskData) => {
        const { active, title, content, id } = taskData;

        return ViewModel.get({
          taskCard: taskCard(active, id),
          taskTitle: taskInputData(active, title),
          taskContent: taskInputData(active, content),
          taskAuthor: taskAuthor(active),

          taskButton: buttonActive(active),
          editTaskButton: editTaskButton(active),
          deleteTaskButton: buttonActive(active),
          submitButton: onClickSubmitButton(),
          cancelButton: onClickCancelButton(),
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
  const count = taskList.length;

  return ViewModel.get({
    properties: { innerHTML: count },
  });
}

function taskCard(isActive, id) {
  if (!isActive) return ViewModel.get({ classLists: { toggle: 'test' }, attributes: { 'data-taskId': id } });

  return ViewModel.get({
    classLists: { toggle: 'active-bg' },
    attributes: { 'data-taskId': id },
  });
}

function taskInputData(isActive, data) {
  return ViewModel.get({
    properties: { value: data, innerHTML: data, disabled: !isActive },

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

function editTaskButton(isActive) {
  const { events } = { ...onClickEditTaskButton() };
  const viewModel = ViewModel.get({ ...buttonActive(isActive), events });

  return viewModel;
}
