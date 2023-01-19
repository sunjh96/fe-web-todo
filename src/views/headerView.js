const $ = document.querySelector.bind(document);

$('#app').innerHTML = `
  <header class="header">
    <h2>TO-DO LIST</h2>
    <div class="trigger">
      <button class="finish-btn">완료</button>
      <span class="trigger-line"></span>
      <span class="trigger-line"></span>
      <span class="trigger-line"></span>
    </div>
  </header>
`;
