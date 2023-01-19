const StatusView = () => {
  const $statusTarget = document.querySelector('.todo-main');
  const count = Array.from({ length: $statusTarget.dataset.statusCount });

  const template = count
    .map((val, i) => {
      return `
              <article class="todo-article" data-viewmodel="status${i}">
                <section class="todo-header">
                  <div class="todo-title">
                    <h3 data-viewmodel="status_title${i}"></h3>
                    <div data-viewmodel="task_count${i}"></div>
                  </div>
                  <div class="todo-svg">
                    <span id="add-task" data-viewmodel="add_task_btn${i}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M0.105713 7.53033L0.105713 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105713Z"
                          fill="#BDBDBD"
                        />
                      </svg>
                    </span>
                    <span id="delete-status" data-viewmodel="delete_status_btn${i}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                          fill="#BDBDBD"
                        />
                      </svg>
                    </span>
                  </div>
                </section>
                <!-- <section data-viewmodel="task" class="todo-task-list"></section> -->
              </article>
            `;
    })
    .join('');

  $statusTarget.innerHTML = template;
};

export default StatusView;
