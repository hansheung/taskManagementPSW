export const AddItem = (d) => {
  //   console.log(d);
  const _currentTasks = localStorage.getItem("tasks");
  let currentTasks = JSON.parse(_currentTasks);
  console.log(currentTasks);
  currentTasks.push({
    id: parseInt(localStorage.getItem("id")) + 1,
    name: d.name,
    description: d.description,
    category: d.category,
  });
  localStorage.setItem("tasks", JSON.stringify(currentTasks));
  localStorage.setItem("id", parseInt(localStorage.getItem("id")) + 1);
};

export const DeleteItem = (id) => {
  const _currentTasks = localStorage.getItem("tasks");
  let currentTasks = JSON.parse(_currentTasks);
  let deletedCurrentTasks = currentTasks[0]["id"];
  localStorage.setItem(
    "tasks",
    JSON.stringify(currentTasks.filter((ct) => ct.id !== id))
  );
};
