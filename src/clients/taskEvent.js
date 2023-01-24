import { ViewModel } from '@/core';
import { TaskModel } from '@/models';

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
