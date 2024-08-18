import { useEffect, useState } from "react";
import { Flex, Loader, Text } from "@mantine/core";
import SearchBar from "../../Components/SearchBar";
import RecipeCard from "../../Components/RecipeCard";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useViewportSize } from "@mantine/hooks";
import useAuth from "../../Hooks/useAuth";
import { notifications } from "@mantine/notifications";
import { Heart, Lock } from "@phosphor-icons/react";

function Home() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useViewportSize();

  // Fetch all recipes
  async function getAllRecipes() {
    const recipesCollection = collection(db, "recipes");
    const recipesSnapshot = await getDocs(recipesCollection);
    const recipesList = recipesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return recipesList;
  }

  // Fetch user's favorite recipes
  async function fetchFavoriteRecipes() {
    const userId = user?.uid;

    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const favoriteIds = userDoc.data().favorites;
        if (Array.isArray(favoriteIds) && favoriteIds.length > 0) {
          const batchSize = 10;
          const batches = [];

          // Create batched queries for 'in' queries due to Firestore limit
          for (let i = 0; i < favoriteIds.length; i += batchSize) {
            const batchIds = favoriteIds.slice(i, i + batchSize);
            const q = query(
              collection(db, "recipes"),
              where("randomId", "in", batchIds)
            );
            batches.push(getDocs(q));
          }

          // Execute all batched queries in parallel
          const querySnapshots = await Promise.all(batches);

          // Flatten results from multiple snapshots
          const favoriteRecipes = querySnapshots.flatMap((snapshot) =>
            snapshot.docs.map((doc) => doc.data())
          );

          console.log("Favorite recipes:", favoriteRecipes);
          setFavoriteRecipes(favoriteRecipes); // Update state with fetched recipes
        } else {
          console.log("No favorite recipes found.");
        }
      } else {
        console.log("User document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching favorite recipes:", error.message);
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading state

      const recipes = await getAllRecipes();
      setRecipes(recipes);

      if (user) {
        await fetchFavoriteRecipes();
      }

      setLoading(false); // End loading state
    }

    fetchData();
  }, [user]); // Dependencies include `user` to ensure it runs when `user` changes

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToFavorites = async (randomId) => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        favorites: arrayUnion(randomId),
      });
      notifications.show({
        title: "Recipe added to favorites",
        message: "The recipe has been added to your favorites.",
        color: "red",
        icon: <Heart size={18} />,
        position: "bottom-center",
      });

      console.log("Recipe added to favorites successfully.");
    } catch (error) {
      console.error("Error adding recipe to favorites:", error.message);
    }
  };

  const removeFromFavorites = async (randomId) => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        favorites: arrayRemove(randomId),
      });
      notifications.show({
        title: "Recipe removed from favorites",
        message: "The recipe has been removed from your favorites.",
        color: "gray",

        position: "bottom-center",
      });

      console.log("Recipe removed from favorites successfully.");
    } catch (error) {
      console.error("Error removing recipe from favorites:", error.message);
    }
  };

  const toggleFavorite = (recipe) => {
    if (!user) {
      notifications.show({
        title: "Login required",
        message: "Please login to add recipes to favorites.",
        color: "blue",
        position: "bottom-center",
        icon: <Lock size={18} />,
      });
      return;
    }
    if (favoriteRecipes.some((fav) => fav.randomId === recipe.randomId)) {
      setFavoriteRecipes(
        favoriteRecipes.filter((fav) => fav.randomId !== recipe.randomId)
      );
      removeFromFavorites(recipe.randomId);
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
      addToFavorites(recipe.randomId);
    }
  };

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "20px",
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
            display: "grid",
            gap: "20px",
            gridTemplateColumns:
              width > 980
                ? "repeat(3, 1fr)"
                : width > 478
                ? "repeat(2, 1fr)"
                : "repeat(1, 1fr)",
            marginTop: 20,
          }}
        >
          {filteredRecipes.length > 0 &&
            filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                isFavorited={favoriteRecipes.some(
                  (fav) => fav.randomId === recipe.randomId
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
