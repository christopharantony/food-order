import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};
const defaultData = [];

const Meals = () => {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requestConfig, defaultData);

  if (isLoading) return <p className="center">Loading...</p>;

  if (error) return <Error title="Failed to load meals" message={error} />;

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
