import { useViewportSize } from "@mantine/hooks";
import RecipeCard from "../../Components/RecipeCard";
import { Flex, Loader, Text } from "@mantine/core";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { notifications } from "@mantine/notifications";
import { Heart, Lock } from "@phosphor-icons/react";

function Favorites() {
  const { width } = useViewportSize();
  const { user } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      setLoading(true); // Set loading to true at the start
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
        setLoading(false); // Set loading to false once the operation is complete
      }
    };

    fetchFavoriteRecipes();
  }, [user]);
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
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "20px" }}>
      <Text
        py={15}
        align="left"
        size="xl"
        style={{ color: "black", fontWeight: "700" }}
      >
        Favorites{" "}
        {favoriteRecipes?.length > 0 && `(${favoriteRecipes?.length})`}
      </Text>
      {loading ? (
        <Flex align="center" justify="center">
          <Loader size="md" />
        </Flex>
      ) : favoriteRecipes.length > 0 ? (
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
          {favoriteRecipes.map((recipe, index) => (
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
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
}

export default Favorites;
