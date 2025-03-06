import { useEffect, useState } from "react";
import { MealItem } from "./MealItem";

export const Meals = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    try {
      const fetchMeals = async () => {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Could not fetch meals");
        }

        const data = await response.json();

        setMeals(data);
      };
      fetchMeals();
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  return (
    <ul id="meals">
      {meals.map((meal, _) => (
        <MealItem key={meal.id} {...meal} />
      ))}
    </ul>
  );
};
