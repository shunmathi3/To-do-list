const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;
  listContainer.appendChild(li);
  inputBox.value = "";
  updateCounters();
}

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;
  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

listContainer.addEventListener("click", function (event) {
  const target = event.target;
  const parentLi = target.closest("li");

  if (target.tagName === "INPUT") {
    parentLi.classList.toggle("completed", target.checked);
    updateCounters();
  }

  if (target.classList.contains("edit-btn")) {
    const update = prompt("Edit task:", parentLi.querySelector("span").textContent);
    if (update !== null) {
      parentLi.querySelector("span").textContent = update;
      parentLi.classList.remove("completed");
      parentLi.querySelector("input").checked = false;
      updateCounters();
    }
  }

  if (target.classList.contains("delete-btn")) {
    if (confirm("Are you sure you want to delete this task?")) {
      parentLi.remove();
      updateCounters();
    }
  }
});
