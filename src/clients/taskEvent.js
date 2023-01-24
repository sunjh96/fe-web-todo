import { ViewModel } from '@/core';
import { TaskModel } from '@/models';

import db from '@/store/firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

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

        viewModelParent.taskAuthor.properties.innerHTML = 'author by JangOh';
        viewModelParent.taskTitle.properties.innerHTML = taskTitle;
        viewModelParent.taskContent.properties.innerHTML = taskContent;
        viewModelParent.taskTitle.properties.value = taskTitle;
        viewModelParent.taskContent.properties.value = taskContent;
        viewModelParent.taskTitle.properties.disabled = true;
        viewModelParent.taskContent.properties.disabled = true;
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
        const taskTitle = viewModelParent.taskTitle.properties.value;
        const taskContent = viewModelParent.taskContent.properties.value;

        toggleActive(viewModelParent);
        TaskModel.modifyTaskCard();

        viewModelParent.taskAuthor.properties.innerHTML = 'author by JangOh';
        // viewModelParent.taskTitle.properties.innerHTML = taskTitle;
        // viewModelParent.taskContent.properties.innerHTML = taskContent;
        // viewModelParent.taskTitle.properties.value = taskTitle;
        // viewModelParent.taskContent.properties.value = taskContent;
        viewModelParent.taskTitle.properties.disabled = true;
        viewModelParent.taskContent.properties.disabled = true;
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
