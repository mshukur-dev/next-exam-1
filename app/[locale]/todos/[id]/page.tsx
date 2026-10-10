"use client";
import { useGetByIdQuery } from "@/services/todos";
import { use } from "react";
import { Link } from "@/i18n/navigation";

const page = ({ params }) => {
    const { id } = use(params);
    const { data, error, isLoading } = useGetByIdQuery(id);
    const todo = data?.data;

    return (
        <div className="max-w-[1600px] mx-auto py-6 flex flex-col gap-4">
            <Link className="" href={"/"}>
                Back
            </Link>
            {isLoading && <p>Loading...</p>}
            {todo && (
                <div className="p-6 flex flex-col gap-3 max-w-2xl">
                    <div className="flex flex-wrap gap-3">
                        {todo.images.map((image) => (
                            <img
                                className="w-40 h-40 object-cover rounded-lg"
                                key={image.id}
                                src={
                                    "https://to-dos-api.softclub.tj/images/" +
                                    image.imageName
                                }
                                alt=""
                            />
                        ))}
                    </div>
                    <h1 className="text-3xl font-semibold">{todo.name}</h1>
                    <p className="text-gray-500">{todo.description}</p>
                    <p
                        className={`${todo.isCompleted ? "text-green-600" : "text-red-600"} w-fit px-2 py-1 rounded-full`}
                    >
                        {todo.isCompleted ? "Active" : "Inactive"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default page;
