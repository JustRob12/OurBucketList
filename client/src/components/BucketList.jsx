import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const APIURL = import.meta.env.VITE_API_URL;
const API_URL = `${APIURL}/bucket`;

export default function BucketList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Could not fetch items. Try again later.",
      });
    }
  };

  const addItem = async () => {
    if (newItem.trim() === "") return;

    try {
      const res = await axios.post(API_URL, { title: newItem });
      setItems([...items, res.data]);
      setNewItem("");

      Swal.fire({
        icon: "success",
        title: "Item Added!",
        text: `${newItem} has been added to your bucket list.`,
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Could not add the item. Try again later.",
      });
    }
  };

  const toggleItem = async (id, isChecked) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { isChecked: !isChecked });
      setItems(items.map((item) => (item._id === id ? res.data : item)));

      Swal.fire({
        icon: isChecked ? "info" : "success",
        title: isChecked ? "Item Reverted!" : "Item Completed!",
        text: `The item has been ${isChecked ? "reverted" : "completed"}.`,
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Could not update the item. Try again later.",
      });
    }
  };

  const deleteItem = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${id}`);
          setItems(items.filter((item) => item._id !== id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The item has been deleted.",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Could not delete the item. Try again later.",
          });
        }
      }
    });
  };

  const uncheckedItems = items.filter((item) => !item.isChecked);
  const checkedItems = items.filter((item) => item.isChecked);

  return (
    <div className="flex flex-col min-h-screen bg-creamWhite p-4 md:p-8 md:flex-row">
      {/* Title Section */}
      <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-8 md:mb-12 md:w-full">
        Our Bucket List
      </h1>

      {/* Add New Item Section */}
      <div className="w-full md:w-1/3 flex flex-col mb-6 md:mb-0">
        <h2 className="text-xl font-extrabold text-pink-600 mb-6">Add New</h2>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item"
          className="border-2 border-pink-300 p-3 rounded-md w-full md:w-64 mb-4 focus:outline-none text-gray-800 shadow-sm"
        />
        <button
          onClick={addItem}
          className="bg-pink-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-pink-400 transition duration-300 shadow-lg"
        >
          Add
        </button>
      </div>

      {/* Bucket List Section */}
      <div className="w-full md:w-1/3 px-4">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-6">Bucket List</h2>
        <ul>
          {uncheckedItems.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between p-3 mb-3 rounded-md shadow-md bg-pink-100 text-gray-800 hover:bg-pink-200 transition"
            >
              <span className="text-lg font-medium">{item.title}</span>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => toggleItem(item._id, item.isChecked)}
                  className="w-6 h-6 accent-pink-500"
                />
                <button
                  onClick={() => deleteItem(item._id)}
                  className="text-pink-500 hover:text-pink-700 transition"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Complete Section */}
      <div className="w-full md:w-1/3 px-4">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-6">Complete</h2>
        <ul>
          {checkedItems.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between p-3 mb-3 rounded-md shadow-md bg-green-100 line-through text-gray-500 hover:bg-green-200 transition"
            >
              <span className="text-lg font-medium">{item.title}</span>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => toggleItem(item._id, item.isChecked)}
                  className="w-6 h-6 accent-green-500"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
