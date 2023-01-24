import { ViewModel } from '@/core';

export function onClickEditTaskButton() {
  return ViewModel.get({
    events: {
      click: (viewModel) => (e) => {
        console.log(viewModel);
        viewModel.parent.taskCard.classLists.toggle = 'active-bg';
        viewModel.parent.taskTitle.properties.disabled = true;
        viewModel.parent.taskContent.properties.disabled = true;
        viewModel.parent.taskAuthor.properties.innerHTML = 'author by JangOh';
        viewModel.parent.taskButton.classLists.toggle = 'active';
        viewModel.parent.editTaskButton.classLists.toggle = 'active';
        viewModel.parent.deleteTaskButton.classLists.toggle = 'active';
      },
    },
  });
}
