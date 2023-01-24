const todoView = () => {
  const $todoTarget = document.querySelector('.todo-main');

  const template = `
              <article class="todo-article" data-template="status">
                <section class="todo-header">
                  <div class="todo-title">
                    <h3 data-viewmodel="statusTitle"></h3>
                    <div data-viewmodel="statusCount">count</div>
                  </div>
                  <div class="todo-svg">
                    <span id="add-task" data-viewmodel="addTask">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M0.105713 7.53033L0.105713 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105713Z"
                          fill="#BDBDBD"
                        />
                      </svg>
                    </span>
                    <span id="delete-status">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                          fill="#BDBDBD"
                        />
                      </svg>
                    </span>
                  </div>
                </section>
                <section class="todo-task-list" data-viewmodel="taskTemplate" data-statusName>
                  <section class="todo-task" data-template="task" data-viewmodel="taskCard">
                    <form data-type="input-task">
                      <div class="task-title">
                        <textarea class="task-title-input" placeholder="제목을 입력하세요" name="title" rows="1" required autofocus data-viewmodel="taskTitle"></textarea>
                        <span class="edit-button active" data-viewmodel="editTaskButton" >
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                              <path
                                d="M13.7619 2.8366L11.2012 0.262865C11.032 0.0945094 10.803 0 10.5643 0C10.3256 0 10.0967 0.0945094 9.92745 0.262865L0.849572 9.32765L0.0207413 12.9047C-0.00785061 13.0355 -0.00687046 13.171 0.02361 13.3013C0.0540905 13.4316 0.113301 13.5535 0.196917 13.658C0.280533 13.7626 0.386441 13.8471 0.506905 13.9054C0.62737 13.9638 0.759346 13.9945 0.893194 13.9953C0.955562 14.0016 1.0184 14.0016 1.08077 13.9953L4.69709 13.1664L13.7619 4.11038C13.9302 3.94117 14.0247 3.71219 14.0247 3.47349C14.0247 3.2348 13.9302 3.00581 13.7619 2.8366ZM4.26086 12.3812L0.871383 13.0923L1.6435 9.76824L8.43555 3.00237L11.0529 5.61973L4.26086 12.3812ZM11.6375 4.9872L9.02009 2.36984L10.5382 0.860495L13.1119 3.47785L11.6375 4.9872Z"
                                fill="#010101"
                              />
                          </svg>
                        </span>
                        <span class="delete-todo active" data-viewmodel="deleteTaskButton">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                              fill="#BDBDBD"
                            />
                          </svg>
                        </span>
                      </div>
                      <textarea class="task-content-input" placeholder="내용을 입력하세요" name="content" rows="1" required data-viewmodel="taskContent"></textarea>
                      <span class="task-author" data-viewmodel="taskAuthor"></span>
                      <div class="button" data-viewmodel="taskButton">
                        <button class="cancel-button" type="button" data-viewmodel="cancelButton">취소</button>
                        <button class="submit-button" type="submit" data-viewmodel="submitButton">등록</button>
                      </div>
                    </form>
                  </section>
                </section>
              </article>
            `;

  $todoTarget.innerHTML = template;
};

export default todoView;
