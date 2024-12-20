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
  localStorage.setItem(
    "tasks",
    JSON.stringify(currentTasks.filter((ct) => ct.id !== id))
  );
};

export const UpdateItem = (id, updatedData) =>{
  const _currentTasks = localStorage.getItem("tasks")
  let currentTasks = JSON.parse(_currentTasks);
  
  const taskIndex = currentTasks.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    
    currentTasks[taskIndex] = {
      ...currentTasks[taskIndex],
      name: updatedData.name || tasks[taskIndex].name,
      description: updatedData.description || tasks[taskIndex].description,
      category: updatedData.category || tasks[taskIndex].category
    };
    
    // Save back to localStorage
    localStorage.setItem("tasks", JSON.stringify(currentTasks));
  }
}
