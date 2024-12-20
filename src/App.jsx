import { Button, Card } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { AddItem, DeleteItem, UpdateItem } from "./ManageItem";

export const App = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDelModalOpen, setDelModalOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const priority = [
        { key: "high", label: "High" },
        { key: "medium", label: "Medium" },
        { key: "low", label: "Low" },
    ];
    const [taskData, setTaskData] = useState([]);
    const [tis, setTempIdStorage] = useState(0);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("tasks")));
    const setTask = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const refresh = () => {
        setData(JSON.parse(localStorage.getItem("tasks")));
    };

    //   initialization
    if (!localStorage.getItem("tasks")) {
        localStorage.setItem("tasks", JSON.stringify([]));
    }
    useEffect(() => {
        refresh();
    }, []);

    if (!localStorage.getItem("id")) {
        localStorage.setItem("id", 0);
    }

    const populateEditForm = (id) => {
        const taskToEdit = data.find((task) => task.id === id);

        if (taskToEdit) {
            setTaskData({
                name: taskToEdit.name,
                description: taskToEdit.description,
                category: taskToEdit.category,
            });
        }
    };

    const handleOpenModalAdd = (stat, id) => {
        setIsAdd(stat); // Set the mode: true for Add, false for Edit

        if (!stat && id !== null) {
            populateEditForm(id);
        } else {
            // Clear form when adding new task
            setTaskData({});
        }

        setModalOpen(true); // Open the modal
    };

    const handleDelModal = (id) => {
        setTempIdStorage(id);
        console.log(tis);
        setDelModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false); 
    };
    const handleCloseDelModal = () => {
        setDelModalOpen(false); 
    };

    return (
        <div className="p-10">
            <div className="grid grid-cols-2">
                <div className="text-4xl">Tasks</div>
                <div className="ms-auto">
                    <Button onPress={() => handleOpenModalAdd(true)}>Add task</Button>
                </div>
            </div>
            <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mx-auto justify-center">
                <div className="card bg-red-400">
                    <h1 className="text-2xl font-bold text-center text-black">High Priority</h1>
                    {data.filter((d) => d.category === "high").length != 0
                        ? data
                              .filter((d) => d.category === "high")
                              .map((d) => {
                                  return (
                                      <Card className="card my-3 lg:my-8 cursor-pointer">
                                          <h3 className="text-xl font-semibold mb-2">{d.name}</h3>
                                          <p>{d.description}</p>
                                          <div className="flex mt-5 gap-5  flex-col lg:flex-row justify-end">
                                              <Button
                                                  color="success"
                                                  onPress={() => {
                                                      setTempIdStorage(d.id);
                                                      handleOpenModalAdd(false, d.id);
                                                  }}
                                              >
                                                  Edit
                                              </Button>
                                              <Button color="danger" onPress={() => handleDelModal(d.id)}>
                                                  Delete
                                              </Button>
                                          </div>
                                      </Card>
                                  );
                              })
                        : null}
                </div>
                <div className="card bg-yellow-400">
                    <h1 className="text-2xl font-bold text-center text-black">Medium Priority</h1>
                    {data.filter((d) => d.category === "medium").length != 0
                        ? data
                              .filter((d) => d.category === "medium")
                              .map((d) => {
                                  return (
                                      <Card className="card my-3 lg:my-8 cursor-pointer">
                                          <h3 className="text-xl font-semibold mb-2">{d.name}</h3>
                                          <p>{d.description}</p>
                                          <div className="flex mt-5 gap-5  flex-col lg:flex-row justify-end">
                                              <Button
                                                  color="success"
                                                  onPress={() => {
                                                      setTempIdStorage(d.id);
                                                      handleOpenModalAdd(false, d.id);
                                                  }}
                                              >
                                                  Edit
                                              </Button>
                                              <Button color="danger" onPress={() => handleDelModal(d.id)}>
                                                  Delete
                                              </Button>
                                          </div>
                                      </Card>
                                  );
                              })
                        : null}
                </div>
                <div className="card bg-green-400">
                    <h1 className="text-2xl font-bold text-center text-black">Low Priority</h1>
                    {data.filter((d) => d.category === "low").length != 0
                        ? data
                              .filter((d) => d.category === "low")
                              .map((d) => {
                                  return (
                                      <Card className="card my-3 lg:my-8 cursor-pointer">
                                          <h3 className="text-xl font-semibold mb-2">{d.name}</h3>
                                          <p>{d.description}</p>
                                          <div className="flex mt-5 gap-5  flex-col lg:flex-row justify-end">
                                              <Button
                                                  color="success"
                                                  onPress={() => {
                                                      setTempIdStorage(d.id);
                                                      handleOpenModalAdd(false, d.id);
                                                  }}
                                              >
                                                  Edit
                                              </Button>
                                              <Button color="danger" onPress={() => handleDelModal(d.id)}>
                                                  Delete
                                              </Button>
                                          </div>
                                      </Card>
                                  );
                              })
                        : null}
                </div>
            </div>
            <Modal isOpen={isModalOpen} placement="top-center" size="lg" onClose={handleCloseModal}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{isAdd ? "Add Task" : "Edit Task"}</ModalHeader>
                            <ModalBody>
                                <Input label="Task Name" type="text" name="name" value={taskData.name || ""} onChange={(e) => setTask(e)} />
                                <Textarea label="Task Description" maxRows="10" name="description" value={taskData.description || ""} onChange={(e) => setTask(e)} />
                                <Select label="Priority" defaultValue="medium" name="category" selectedKeys={taskData.category ? [taskData.category] : ["medium"]} onChange={(e) => setTask(e)}>
                                    {priority.map((item) => (
                                        <SelectItem key={item.key} value={item.key}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color={isAdd ? "primary" : "success"}
                                    onPress={() => {
                                        if (isAdd) {
                                            AddItem(taskData);
                                        } else {
                                            UpdateItem(tis, taskData);
                                        }
                                        refresh();
                                        onClose();
                                    }}
                                >
                                    {isAdd ? "Add" : "Update"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                backdrop="opaque"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
                isOpen={isDelModalOpen}
                onClose={handleCloseDelModal}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Are you sure you want to delete this task?</ModalHeader>
                            <ModalBody>
                                <h3 className="text-xl font-semibold mb-2">{data.filter((d) => d["id"] === tis)[0]["name"]}</h3>
                                <p>{data.filter((d) => d["id"] === tis)[0]["description"]}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="success"
                                    onPress={() => {
                                        DeleteItem(tis);
                                        setTempIdStorage(0);
                                        refresh();
                                        onClose();
                                    }}
                                >
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};
