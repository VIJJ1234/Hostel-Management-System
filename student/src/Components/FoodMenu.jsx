import axios from 'axios';
import { useEffect, useState } from 'react';

const FoodMenu = () => {
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = new Date();
        const currentDay = days[today.getDay()];

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/foodMenu`);
        console.log('Menu data from backend:', response.data);

        const todaysMenu = response.data.find(menu => 
          menu.day.toLowerCase() === currentDay.toLowerCase()
        );

        if (todaysMenu) {
          setMenu(todaysMenu);
        } else {
          setError('No menu available for today');
        }
      } catch (error) {
        console.error(error);
        setError('There was an error fetching the menu');
      }
    };

    fetchMenu();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  if (!menu) {
    return <div className="text-center mt-6">Loading...</div>;
  }
  
  return (
    <div className="mx-auto my-2 p-2 bg-gradient-to-r from-green-200 to-blue-200 shadow-lg rounded-lg h-[450px]">
      <h2 className="text-2xl font-bold text-center mb-2 text-green-700">Today's Food Menu</h2>
      <div className="text-lg mb-4">
        <strong className="text-gray-700">Day:</strong> <span className="text-gray-800">{menu.day}</span>
      </div>
      <div className="text-lg mb-4 bg-green-50 p-4 rounded">
        <strong className="text-green-700">Breakfast:</strong> <span className="text-gray-800">{menu.breakfast || 'Not Available'}</span>
      </div>
      <div className="text-lg mb-4 bg-blue-50 p-4 rounded">
        <strong className="text-blue-700">Lunch:</strong> <span className="text-gray-800">{menu.lunch || 'Not Available'}</span>
      </div>
      <div className="text-lg mb-4 bg-yellow-50 p-4 rounded">
        <strong className="text-yellow-700">Dinner:</strong> <span className="text-gray-800">{menu.dinner || 'Not Available'}</span>
      </div>
    </div>
  );
};

export default FoodMenu;
