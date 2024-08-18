import { useEffect, useState } from "react";
import { Flex, Loader, Text } from "@mantine/core";
import SearchBar from "../../Components/SearchBar";
import RecipeCard from "../../Components/RecipeCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useViewportSize } from "@mantine/hooks";
function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useViewportSize();

  useEffect(() => {
    async function getAllRecipes() {
      const recipesCollection = collection(db, "recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesList = recipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return recipesList;
    }

    getAllRecipes().then((recipes) => {
      console.log(recipes); // Logs all recipes data
      setRecipes(recipes);
      setLoading(false);
    });
    getAllRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (recipe) => {
    if (favoriteRecipes.some((fav) => fav.recipeName === recipe.recipeName)) {
      setFavoriteRecipes(
        favoriteRecipes.filter((fav) => fav.recipeName !== recipe.recipeName)
      );
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    }
  };

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "20px 10px",
      }}
    >
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm && (
        <Text pt={15}>
          {filteredRecipes.length}{" "}
          {filteredRecipes.length > 1 ? "recipes" : "recipe"} found for "
          {searchTerm}"
        </Text>
      )}
      {searchTerm && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {filteredRecipes.length > 0 &&
            filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                isFavorited={favoriteRecipes.some(
                  (fav) => fav.recipeName === recipe.recipeName
                )}
                onToggleFavorite={toggleFavorite}
              />
            ))}
        </div>
      )}
      {!searchTerm && (
        <div>
          <Text
            py={15}
            align="left"
            size="xl"
            style={{ color: "black", fontWeight: "700" }}
          >
            Popular Recipes
          </Text>
          {loading ? (
            <Flex justify={"center"} pt={20} align={"center"}>
              <Loader color="blue" />
            </Flex>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns:
                  width > 980
                    ? "repeat(3, 1fr)"
                    : width > 478
                    ? "repeat(2, 1fr)"
                    : "repeat(1, 1fr)",
              }}
            >
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  isFavorited={favoriteRecipes.some(
                    (fav) => fav.recipeName === recipe.recipeName
                  )}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
