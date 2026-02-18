function show(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('title').textContent =
    id.charAt(0).toUpperCase() + id.slice(1);
}

const taskList = document.getElementById('taskList');
const memberList = document.getElementById('memberList');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let members = JSON.parse(localStorage.getItem('members') || '[]');

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('members', JSON.stringify(members));
  updateCounts();
}

function addTask() {
  const name = document.getElementById('taskInput').value.trim();
  const status = document.getElementById('statusSelect').value;
  if (!name) return;

  tasks.push({ name, status });
  document.getElementById('taskInput').value = '';
  renderTasks();
  save();
}

function addMember() {
  const name = document.getElementById('memberInput').value.trim();
  if (!name) return;

  members.push(name);
  document.getElementById('memberInput').value = '';
  renderMembers();
  save();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks();
  save();
}

function deleteMember(i) {
  members.splice(i, 1);
  renderMembers();
  save();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
      <span>${t.name} (${t.status})</span>
      <button class="btn delete" onclick="deleteTask(${i})">Delete</button>
    `;
    taskList.appendChild(div);
  });
}

function renderMembers() {
  memberList.innerHTML = '';
  members.forEach((m, i) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
      <span>${m}</span>
      <button class="btn delete" onclick="deleteMember(${i})">Delete</button>
    `;
    memberList.appendChild(div);
  });
}

function updateCounts() {
  document.getElementById('taskCount').textContent = tasks.length;
  document.getElementById('teamCount').textContent = members.length;
}

renderTasks();
renderMembers();
updateCounts();
