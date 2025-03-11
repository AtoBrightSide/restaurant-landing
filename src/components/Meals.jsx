import { MealItem } from "./MealItem";
import useHttp from "../hooks/useHttp";
import { Error } from "./ui/Error";

export const Meals = () => {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", null, []);

  if (isLoading) {
    return <p className="center">Fetching meals ...</p>;
  }

  if (error) {
    console.log(error)
    return <Error title="Fetching failed 😕" message={error.message} />;
  }

  return (
    <ul id="meals">
      {meals.length > 0 &&
        meals.map((meal, _) => <MealItem key={meal.id} {...meal} />)}
    </ul>
  );
};
