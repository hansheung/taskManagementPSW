import { Button } from "@nextui-org/react";
import { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

export const App = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDelModalOpen, setDelModalOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const priority = [
        { key: "high", label: "High" },
        { key: "medium", label: "Medium" },
        { key: "low", label: "Low" },
    ];

    const handleOpenModalAdd = (stat) => {
        setIsAdd(stat); // Set the mode: true for Add, false for Edit
        setModalOpen(true); // Open the modal
    };

    const handleDelModal = () => {
        setDelModalOpen(true); // Open the modal
    };
    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
    };
    const handleCloseDelModal = () => {
        setDelModalOpen(false); // Close the modal
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
                    <h1 className="text-2xl font-bold">High Priority</h1>
                    <div className="card my-3 lg:my-8 cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">Lorem ipsum dolor sit</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum asperiores assumenda tenetur itaque, beatae omnis. Explicabo aspernatur facere molestiae architecto, dicta commodi vel consequatur nesciunt neque fugiat
                            blanditiis officiis similique?
                        </p>
                        <div className="flex mt-5 gap-5  flex-col lg:flex-row justify-end">
                            <Button color="success" onPress={() => handleOpenModalAdd(false)}>
                                Edit
                            </Button>
                            <Button color="danger" onPress={() => handleDelModal()}>Delete</Button>
                        </div>
                    </div>

                    <div className="border m-10">
                        <p>Loremrelerkf;ldskfds;llkfds </p>
                        <p>Lorem</p>
                    </div>
                    <div className="border m-10">
                        <p>Loremrelerkf;ldskfds;llkfds </p>
                        <p>Lorem</p>
                    </div>
                </div>
                <div className="card bg-yellow-400"></div>
                <div className="card bg-green-400"></div>
            </div>
            <Modal isOpen={isModalOpen} placement="top-center" size="lg" onClose={handleCloseModal}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{isAdd ? "Add Task" : "Edit Task"}</ModalHeader>
                            <ModalBody>
                                <Input label="Task Name" type="text" />
                                <Textarea label="Task Description" maxRows="10" />
                                <Select label="Priority" defaultValue="medium">
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
                                <Button color={isAdd ? "primary" : "success"} onPress={onClose}>
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
                                    <h3 className="text-xl font-semibold mb-2">Lorem ipsum dolor sit</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum asperiores assumenda tenetur itaque, beatae omnis. Explicabo aspernatur facere molestiae architecto, dicta commodi vel consequatur nesciunt neque
                                        fugiat blanditiis officiis similique?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="success" onPress={onClose}>
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
