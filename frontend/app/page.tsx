"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

export default function Home() {
  const [items, setItems] = useState<any>([]);
  const [newItem, setNewItem] = useState<any>("");

  useEffect(() => {
    const fetchItems = async () => {
      const res = await AxiosInstance.get("/items");
      setItems(res.data);
    };

    fetchItems();
  }, []);

  const addItem = async (e: any) => {
    e.preventDefault();
    const res = await AxiosInstance.post("/items", { name: newItem });
    setItems([...items, res.data]);
    setNewItem("");
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map((item: any) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <form onSubmit={addItem}>
        {/* <form > */}
        <input
          type="text"
          value={newItem}
          className=" text-red-500"
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
