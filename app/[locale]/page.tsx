"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    useAddImgMutation,
    useAddTodoMutation,
    useDeleteImgMutation,
    useDeleteTodoMutation,
    useEditTodoMutation,
    useGetTodosQuery,
    useToggleTodoMutation,
} from "@/services/todos";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
const page = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const { data, error, isLoading } = useGetTodosQuery(search);
    const [deleteTodo] = useDeleteTodoMutation();
    const [deleteImg] = useDeleteImgMutation();
    const [addImg] = useAddImgMutation();
    const [addTodo] = useAddTodoMutation();
    const [editTodo] = useEditTodoMutation();
    const [toggleTodo] = useToggleTodoMutation();
    const [isEdit, setIsEdit] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        reset: resetEdit,
    } = useForm();
    const onSubmit = (data) => {
        const formdata = new FormData();
        formdata.append("Name", data.Name);
        formdata.append("Description", data.Description);
        formdata.append("Images", data.Images[0]);
        addTodo(formdata);
        setOpen(false);
        reset();
    };
    const onEdit = (data) => {
        editTodo({
            id: isEdit.id,
            name: data.Name,
            description: data.Description,
        });
        setIsEdit(null);
    };
    const onAddImg = (e, id) => {
        const formdata = new FormData();
        formdata.append("Images", e.target.files[0]);
        addImg({ id, formdata });
        e.target.value = "";
    };
    const todos = data?.data?.filter(
        (el) => status === "all" || String(el.isCompleted) === status,
    );
    return (
        <div className="max-w-[1600px] mx-auto py-6">
            <div className="flex gap-3 mb-6">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className={buttonVariants({ size: "lg" })}>
                        Add
                    </DialogTrigger>
                    <DialogContent>
                        <form
                            className="py-10 flex flex-col gap-3"
                            onSubmit={handleSubmit(onSubmit)}
                            action=""
                        >
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                                {...register("Name")}
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                                {...register("Description")}
                                placeholder="Description"
                            />
                            <input type="file" {...register("Images")} />
                            <Button type="submit">Add</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                <input
                    type="text"
                    className="w-full border rounded-lg px-3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                />
                <select
                    className="border rounded-lg px-3"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>
            <Dialog open={!!isEdit} onOpenChange={() => setIsEdit(null)}>
                <DialogContent>
                    <form
                        className="py-10 flex flex-col gap-3"
                        onSubmit={handleSubmitEdit(onEdit)}
                    >
                        <input
                            type="text"
                            className="w-full border rounded-lg px-3 py-2"
                            {...registerEdit("Name")}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            className="w-full border rounded-lg px-3 py-2"
                            {...registerEdit("Description")}
                            placeholder="Description"
                        />
                        <Button type="submit">Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="grid grid-cols-4 gap-6">
                {todos?.map((el) => (
                    <div className="  p-4 flex flex-col gap-3" key={el.id}>
                        <div className="flex flex-wrap gap-2">
                            {el.images.map((image) => (
                                <div className="relative" key={image.id}>
                                    <img
                                        className="w-20 h-20 object-cover rounded-lg"
                                        src={
                                            "https://to-dos-api.softclub.tj/images/" +
                                            image.imageName
                                        }
                                        alt=""
                                    />
                                    <Button
                                        onClick={() => deleteImg(image.id)}
                                        size="icon-xs"
                                        className={
                                            "absolute top-1 text-[10px] left-1"
                                        }
                                    >
                                        D
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            className="file:mr-2 file:rounded-lg file:border file:px-2 file:py-1"
                            onChange={(e) => onAddImg(e, el.id)}
                        />
                        <div>
                            <h1 className="text-lg font-semibold">{el.name}</h1>
                            <p className="text-gray-500">{el.description}</p>
                        </div>
                        <p
                            onClick={() => toggleTodo(el.id)}
                            className={`${el.isCompleted ? " text-green-600" : " text-red-600"} cursor-pointer w-fit px-2 py-1 rounded-full`}
                        >
                            {el.isCompleted ? "Active" : "Inactive"}
                        </p>
                        <div className="flex gap-2 mt-auto">
                            <Button
                                variant="destructive"
                                onClick={() => deleteTodo(el.id)}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsEdit(el);
                                    resetEdit({
                                        Name: el.name,
                                        Description: el.description,
                                    });
                                }}
                            >
                                Edit
                            </Button>
                            <Button variant={"default"}>
                                <Link href={`/todos/${el.id}`}>Info</Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;
