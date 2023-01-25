import { ViewModel } from '@/core';
import { TaskModel } from '@/models';

export function onKeyupTaskData(isActive, data) {
  return ViewModel.get({
    properties: { value: data, innerHTML: data, disabled: !isActive },

    events: {
      keyup: (viewModel) => (e) => {
        viewModel.properties.innerHTML = e.target.value;

        const taskTitle = viewModel.parent.taskTitle?.properties.innerHTML ?? viewModel.parent.newTaskTitle.properties.innerHTML;
        const taskContent = viewModel.parent.taskContent?.properties.innerHTML ?? viewModel.parent.newTaskContent.properties.innerHTML;
        let submitButton = viewModel.parent?.submitButton ?? viewModel.parent.newSubmitButton;

        if (!taskTitle || !taskContent) submitButton.properties.disabled = true;
        else submitButton.properties.disabled = false;
      },
    },
  });
}

export function onClickEditTaskButton() {
  return ViewModel.get({
    events: {
      click: (viewModel) => (e) => {
        const viewModelParent = viewModel.parent;

        toggleActive(viewModelParent);

        viewModelParent.taskAuthor.properties.innerHTML = '';
        viewModelParent.taskTitle.properties.disabled = false;
        viewModelParent.taskContent.properties.disabled = false;
      },
    },
  });
}

export function onClickDeleteTaskButton() {
  return ViewModel.get({
    events: {
      click: (viewModel) => (e) => {},
    },
  });
}

export function onClickCancelButton() {
  return ViewModel.get({
    events: {
      click: (viewModel) => (e) => {
        const viewModelParent = viewModel.parent;
        const taskTitle = viewModelParent.taskTitle.properties.value;
        const taskContent = viewModelParent.taskContent.properties.value;

        toggleActive(viewModelParent);
        inputTaskCard(viewModelParent, taskTitle, taskContent);
      },
    },
  });
}

export function onClickSubmitButton() {
  return ViewModel.get({
    properties: { disabled: false },
    events: {
      click: (viewModel) => (e) => {
        e.preventDefault();

        const viewModelParent = viewModel.parent;
        const taskTitle = viewModelParent.taskTitle.properties.innerHTML;
        const taskContent = viewModelParent.taskContent.properties.innerHTML;
        const statusName = viewModelParent.parent.attributes['data-statusName'];
        const taskId = viewModelParent.taskCard.attributes['data-taskId'];

        toggleActive(viewModelParent);
        inputTaskCard(viewModelParent, taskTitle, taskContent);
        TaskModel.modifyTaskCard(statusName, taskId, taskTitle, taskContent);
      },
    },
  });
}

export function onClickNewCancelButton() {
  return ViewModel.get({
    events: {
      click: (viewModel) => (e) => {
        const viewModelParent = viewModel.parent;
        const oldCount = viewModelParent.statusCount.properties.name;

        viewModelParent.statusCount.properties.innerHTML = oldCount;
        viewModelParent.newTaskCard.classLists.toggle = 'active';
        viewModelParent.newTaskTitle.properties.innerHTML = '';
        viewModelParent.newTaskContent.properties.innerHTML = '';
        viewModelParent.newTaskTitle.properties.value = '';
        viewModelParent.newTaskContent.properties.value = '';
      },
    },
  });
}

export function onClickNewSubmitButton() {
  return ViewModel.get({
    properties: { disabled: true },
    events: {
      click: (viewModel, elem) => (e) => {
        e.preventDefault();

        const viewModelParent = viewModel.parent;
        const taskTitle = viewModelParent.newTaskTitle.properties.innerHTML;
        const taskContent = viewModelParent.newTaskContent.properties.innerHTML;
        const statusName = viewModelParent.statusTitle.properties.innerHTML;
        const taskId = elem.closest('.todo-task').dataset.taskid;

        TaskModel.addTaskCard(statusName, taskId, taskTitle, taskContent);
      },
    },
  });
}

function toggleActive(viewModelParent) {
  viewModelParent.taskCard.classLists.toggle = 'active-bg';
  viewModelParent.taskButton.classLists.toggle = 'active';
  viewModelParent.editTaskButton.classLists.toggle = 'active';
  viewModelParent.deleteTaskButton.classLists.toggle = 'active';
}

function inputTaskCard(viewModelParent, taskTitle, taskContent) {
  viewModelParent.taskAuthor.properties.innerHTML = 'author by JangOh';
  viewModelParent.taskTitle.properties.innerHTML = taskTitle;
  viewModelParent.taskContent.properties.innerHTML = taskContent;
  viewModelParent.taskTitle.properties.value = taskTitle;
  viewModelParent.taskContent.properties.value = taskContent;
  viewModelParent.taskTitle.properties.disabled = true;
  viewModelParent.taskContent.properties.disabled = true;
}
