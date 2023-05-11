import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddChocolate = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleAddChocolate = (event) => {
    event.preventDefault();

    const addedChocolate = { name, country, category, image };
    console.log(addedChocolate);
    fetch("http://localhost:4000/chocolates", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addedChocolate),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "success",
            text: "Chocolate Added Successfully",
            icon: "success",
            confirmButtonText: "Done",
          });
        }
      });
  };
  return (
    <div className="py-10">
      <div className="flex justify-center px-8">
        <h2 className="bg-yellow-700 text-white font-bold text-4xl text-center py-2 md:px-5 :w-3/6 mb-8 rounded-md">
          Chocolate Management System
        </h2>
      </div>
      <div className="w-3/4 mx-auto">
        <Link to="/">
          <button className="py-2 px-3 rounded-md my-4 font-semibold">
            <span className="flex justify-center items-center gap-2">
              <FaArrowLeft />
              <span> All Chocolate</span>
            </span>
          </button>
        </Link>
        <div className="bg-gray-100 px-20 py-12">
          <div className="mb-5">
            <h2 className="text-center font-bold text-xl">New Chocolates</h2>
            <p className="text-center text-slate-600">
              Use the below form to create a new product
            </p>
          </div>
          <form onSubmit={handleAddChocolate} action="" className="space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Hot Pink Chocolate"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Country</span>
              </label>
              <input
                type="text"
                name="country"
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Category</span>
              </label>

              <select
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered w-full mb-5"
              >
                <option disabled defaultValue>
                  Choose Chocolate Category
                </option>
                <option value="premium">Premium</option>
                <option value="regular">Regular</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Image</span>
              </label>
              <input
                type="text"
                name="image"
                onChange={(e) => setImage(e.target.value)}
                placeholder="Chocolate Image"
                className="input input-bordered w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-700 w-full py-2.5 rounded-lg text-white font-bold"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChocolate;
