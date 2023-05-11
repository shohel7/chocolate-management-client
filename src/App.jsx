import React, { useState } from "react";
import "./App.css";
import { FaEdit, FaTimes } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

function App() {
  const loadChocolates = useLoaderData();
  const [chocolates, setChocolates] = useState(loadChocolates);
  // const { name, country, category } = loadChocolates;
  console.log(chocolates);

  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this Chocolate",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/chocolates/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Confirm Chocolate has been deleted.",
                "success"
              );
              const remaining = chocolates.filter((choco) => choco._id !== id);
              setChocolates(remaining);
            }
          });
      }
    });
  };
  return (
    <div className="">
      <div className="flex justify-center px-8">
        <h2 className="bg-yellow-700 text-white font-bold text-4xl text-center py-2 md:px-5 :w-3/6 my-8 rounded-md">
          Chocolate Management System
        </h2>
      </div>
      <div>
        <div className="overflow-x-auto w-10/12 mx-auto">
          <Link to="/addChocolate">
            <button className="border py-2 px-3 rounded-md my-4 font-semibold">
              + New Chocolate
            </button>
          </Link>
          <table className="table w-full text-center">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Country/Factory</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {chocolates.map((chocolate) => (
                <tr key={chocolate._id}>
                  <th>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={chocolate?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </th>
                  <td>
                    <div className="text-slate-500">{chocolate?.name}</div>
                  </td>
                  <td>
                    <div className="text-slate-500">{chocolate?.country}</div>
                  </td>
                  <td>
                    <div className="text-slate-500">{chocolate?.category}</div>
                  </td>
                  <th>
                    <div className="flex justify-center gap-3">
                      <Link to={`UpdateChocolate/${chocolate._id}`}>
                        <button className=" bg-orange-200 p-3 rounded-md">
                          <FaEdit className="text-yellow-700 text-xl" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(chocolate._id)}
                        className=" bg-orange-200 p-3 rounded-md"
                      >
                        <FaTimes className="text-yellow-700 text-xl" />
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
