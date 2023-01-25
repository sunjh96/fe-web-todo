import { ViewModel } from '@/core';

export function addTaskCard() {
  return ViewModel.get({
    events: {
      click: (viewModel) => (e) => {
        const viewModelParent = viewModel.parent;
        const newCount = viewModelParent.statusCount.properties.innerHTML;
        const oldCount = viewModelParent.statusCount.properties.name;

        if (oldCount === newCount) viewModelParent.statusCount.properties.innerHTML = oldCount + 1;
        else viewModelParent.statusCount.properties.innerHTML = oldCount;

        viewModelParent.newTaskCard.classLists.toggle = 'active';
        viewModelParent.newTaskTitle.properties.innerHTML = '';
        viewModelParent.newTaskContent.properties.innerHTML = '';
        viewModelParent.newTaskTitle.properties.value = '';
        viewModelParent.newTaskContent.properties.value = '';
      },
    },
  });
}
