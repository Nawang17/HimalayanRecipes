import { useEffect, useState } from "react";
import { Card, Avatar, Text, Loader, SimpleGrid } from "@mantine/core";
import useAuth from "../../Hooks/useAuth";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayRemove,
  doc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import RecipeCard from "../../Components/RecipeCard";
import { useViewportSize } from "@mantine/hooks";
import { Heart, Lock } from "@phosphor-icons/react";
import { notifications } from "@mantine/notifications";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useViewportSize();
  const { userId } = useParams();
  // Fetch user's favorite recipes

  async function fetchUserInfo() {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.data();
  }

  async function fetchFavoriteRecipes() {
    try {
      const userDoc = await getDoc(doc(db, "users", user?.uid));
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

  async function fetchUserRecipes() {
    try {
      const recipesCollection = collection(db, "recipes");
      const q = query(recipesCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No recipes found for this user.");
        return [];
      }

      const fetchedRecipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched recipes:", fetchedRecipes);
      return fetchedRecipes;
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading state

      const userinfo = await fetchUserInfo();
      setUserInfo(userinfo);

      const recipes = await fetchUserRecipes();
      setUserRecipes(recipes);

      if (user) {
        await fetchFavoriteRecipes();
      }

      setLoading(false); // End loading state
    }

    fetchData();
  }, [user]);

  const addToFavorites = async (randomId) => {
    try {
      const userRef = doc(db, "users", user?.uid);

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
      const userRef = doc(db, "users", user?.uid);

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
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px" }}>
      <Card withBorder padding="xl" radius="md">
        <Card.Section
          h={140}
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/originals/41/d7/19/41d7198d3cdd94cf1f2b5956bd10851b.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Avatar
          color="purple"
          size={80}
          radius={80}
          mx="auto"
          mt={-30}
          style={{ border: "2px solid white" }}
          src={userInfo?.photoURL}
        />

        <Text align="center" size="lg" weight={500} mt="sm">
          {userInfo?.username}
        </Text>

        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <Text size="xl" pb={20} fw={600}>
            My Recipes {userRecipes?.length > 0 && `(${userRecipes.length})`}
          </Text>
        </div>

        {loading ? (
          <Loader color="blue" style={{ marginTop: "20px" }} />
        ) : userRecipes?.length > 0 ? (
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
            {userRecipes.map((recipe, index) => (
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
        ) : (
          <Text size="sm" c="dimmed" style={{ marginTop: "20px" }}>
            No recipes available
          </Text>
        )}
      </Card>
    </div>
  );
};

export default Profile;
