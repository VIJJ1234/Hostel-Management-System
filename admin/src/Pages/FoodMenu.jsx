import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodMenu = () => {
  const [menu, setMenu] = useState({
    day: '',
    breakfast: '',
    lunch: '',
    dinner: ''
  });
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/foodMenu');
      setMenus(res.data);
    } catch (error) {
      console.error('Fetch menus error', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu({ ...menu, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/foodMenu', menu);
      fetchMenus();
    } catch (error) {
      console.error('Submit menu error', error);
    }
  };

  const deleteMenu = async (day) => {
    try {
      await axios.delete(`http://localhost:5000/api/foodMenu/${day}`);
      fetchMenus();
    } catch (error) {
      console.error('Delete menu error', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block">Day</label>
          <input
            type="text"
            name="day"
            value={menu.day}
            onChange={handleChange}
            className="w-full px-2 py-1 border"
          />
        </div>
        <div className="mb-2">
          <label className="block">Breakfast</label>
          <input
            type="text"
            name="breakfast"
            value={menu.breakfast}
            onChange={handleChange}
            className="w-full px-2 py-1 border"
          />
        </div>
        <div className="mb-2">
          <label className="block">Lunch</label>
          <input
            type="text"
            name="lunch"
            value={menu.lunch}
            onChange={handleChange}
            className="w-full px-2 py-1 border"
          />
        </div>
        <div className="mb-2">
          <label className="block">Dinner</label>
          <input
            type="text"
            name="dinner"
            value={menu.dinner}
            onChange={handleChange}
            className="w-full px-2 py-1 border"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Save Menu</button>
      </form>
      <h2 className="text-xl font-bold mb-2">Weekly Menu</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Day</th>
            <th className="py-2 px-4 border">Breakfast</th>
            <th className="py-2 px-4 border">Lunch</th>
            <th className="py-2 px-4 border">Dinner</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.day}>
              <td className="py-2 px-4 border">{menu.day}</td>
              <td className="py-2 px-4 border">{menu.breakfast}</td>
              <td className="py-2 px-4 border">{menu.lunch}</td>
              <td className="py-2 px-4 border">{menu.dinner}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => deleteMenu(menu.day)}
                  className="px-2 py-1 bg-red-500 text-white"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodMenu;
