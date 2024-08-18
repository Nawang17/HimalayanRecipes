import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Flex,
  Image,
  Loader,
  Pill,
  Rating,
  Text,
} from "@mantine/core";
import { ArrowLeft, Clock, Lock } from "@phosphor-icons/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import useAuth from "../../Hooks/useAuth";
import { notifications } from "@mantine/notifications";

const RecipeDisplay = () => {
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const { recipeId } = useParams();
  const [userRating, setUserRating] = useState(null);

  const fetchUserRating = async () => {
    if (user) {
      try {
        const ratingRef = doc(db, `users/${user.uid}/ratings/${recipeId}`);
        const ratingSnap = await getDoc(ratingRef);

        if (ratingSnap.exists()) {
          setUserRating(ratingSnap.data().rating);
          console.log("User rating fetched successfully.", ratingSnap.data());
        } else {
          setUserRating(null);
        }
      } catch (error) {
        console.error("Error fetching user rating:", error.message);
      }
    }
  };

  const storeUserRating = async () => {
    try {
      const ratingRef = doc(db, `users/${user?.uid}/ratings/${recipeId}`);
      await setDoc(ratingRef, { rating });

      console.log("User rating stored successfully.");
    } catch (error) {
      console.error("Error storing user rating:", error.message);
    }
  };
  const rateRecipe = async () => {
    if (!user) {
      notifications.show({
        title: "You need to be logged in to rate a recipe",
        message: "Please login to rate this recipe",
        color: "blue",
        position: "bottom-center",
        icon: <Lock size={18} />,
      });
      return;
    }
    try {
      // Query to find the document with the given randomId
      const recipesCollection = collection(db, "recipes");
      const q = query(recipesCollection, where("randomId", "==", recipeId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const recipeDoc = querySnapshot.docs[0]; // Get the first (and should be the only) document
        const recipeRef = doc(db, "recipes", recipeDoc.id);

        // Retrieve current data
        const recipeData = recipeDoc.data();
        const prevRatings = recipeData.ratings || []; // Initialize if not present
        const prevRatingCount = prevRatings.length;
        const prevAverageRating = recipeData.averageRating || 0;

        // Add new rating
        const updatedRatings = [...prevRatings, rating];
        const newAverageRating =
          (prevAverageRating * prevRatingCount + rating) /
          (prevRatingCount + 1);

        // Update the recipe document
        await updateDoc(recipeRef, {
          ratings: updatedRatings,
          averageRating: newAverageRating,
        });
        await storeUserRating();
        setUserRating(rating);
        fetchRecipe();
        console.log("Recipe rated successfully.");
      } else {
        console.log("No recipe found with the given randomId.");
      }
    } catch (error) {
      console.error("Error rating recipe:", error.message);
    }
  };
  async function fetchRecipe() {
    try {
      const recipesRef = collection(db, "recipes"); // Reference to the 'recipes' collection
      const q = query(recipesRef, where("randomId", "==", recipeId)); // Query for the document with the specified randomId

      const recipeSnap = await getDocs(q); // Get all documents matching the query

      if (!recipeSnap.empty) {
        const recipeData = recipeSnap.docs[0].data(); // Access the data of the first document
        console.log("Recipe data:", recipeData);
        setRecipe(recipeData); // Set the recipe data to state
        setLoading(false);
      } else {
        console.log("No such recipe!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await fetchRecipe(); // Fetch and set the recipe data first
      await fetchUserRating(); // Fetch the user rating after the recipe is fetched
    };

    fetchData(); // Call the function to fetch data
  }, [recipeId, user]); // D

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <ActionIcon
        onClick={() => {
          navigate(-1);
        }}
        size={30}
        color="blacks"
        variant="transparent"
        aria-label="goback"
      >
        <ArrowLeft size={30} />
      </ActionIcon>
      {!loading && recipe ? (
        <>
          <Text pt={10} size="2.5rem" fw={500}>
            {recipe?.recipeName}
          </Text>
          <Flex mt={10} align={"center"} gap={"md"}>
            <Rating
              fractions={2}
              size="md"
              value={recipe?.averageRating}
              defaultValue={0}
              readOnly
            />
            <Text size="md">
              {recipe?.ratings?.length > 0 &&
                `( ${recipe?.ratings?.length} rating ) `}{" "}
            </Text>
          </Flex>
          <Text size="md" mt={10}>
            Submitted by{" "}
            <Text
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/profile/${recipe?.userId}`);
              }}
              c="blue"
              fw={500}
              component="span"
            >
              {recipe?.username}
            </Text>
          </Text>
          <Text size="md" mt={10}>
            {recipe?.description}
          </Text>
          <Image
            mt={10}
            h={300}
            radius="md"
            src={recipe?.image}
            alt="Recipe Image"
          />
          <Flex align={"center"} gap={5} mt={15}>
            <Clock size={22} />
            <Text>
              Ready in:{" "}
              <Text fw={600} component="span">
                {recipe?.cookingTime} minute
              </Text>
            </Text>
          </Flex>
          <Divider my="lg" variant="dashed" />
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <Text size="1.5rem" fw={600} mt={10}>
              INGREDIENTS:
            </Text>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {recipe?.ingredients?.map((ingredient, index) => (
                <div key={index}>
                  <Text size="lg">
                    {ingredient.quantity}{" "}
                    <Text fw={600} component="span">
                      {ingredient.name}
                    </Text>
                  </Text>
                </div>
              ))}
            </div>
          </div>
          <Divider my="lg" variant="dashed" />
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <Text size="1.5rem" fw={600} mt={10}>
              DIRECTIONS:
            </Text>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {recipe?.steps?.map((step, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "flex-start" }}
                >
                  <Text size="lg" fw={700} style={{ marginRight: "10px" }}>
                    {index + 1}.
                  </Text>
                  <Text size="lg">{step}</Text>
                </div>
              ))}
            </div>
            <Divider my="lg" variant="dashed" />

            <Flex mt={20} align={"center"} gap={10}>
              <Text size="lg">Tags:</Text>
              <Flex align={"center"} gap={"sm"}>
                {recipe?.tags.split(",").map((tag, index) => (
                  <Pill key={index}>{tag}</Pill>
                ))}
              </Flex>
            </Flex>

            <Flex mt={20} gap={10} align={"center"}>
              <Avatar size="md" src={user?.photoURL} alt="User Avatar" />

              {!userRating ? (
                <Flex align={"center"} justify={"space-between"} gap={15}>
                  <Flex justify={"space-between"} align={"center"} gap={15}>
                    <Text fw={"bold"} size="lg">
                      Rate the recipe:
                    </Text>
                    <Rating
                      fractions={2}
                      onChange={(value) => {
                        setRating(value);
                        console.log(value);
                      }}
                      size="md"
                      value={rating}
                      defaultValue={0}
                    />
                  </Flex>
                  <Button
                    onClick={() => {
                      rateRecipe();
                    }}
                    radius={"xl"}
                  >
                    Post Rating
                  </Button>
                </Flex>
              ) : (
                <Flex align={"center"} justify={"space-between"} gap={15}>
                  <Flex justify={"space-between"} align={"center"} gap={15}>
                    <Text fw={"bold"} size="lg">
                      You Rated:
                    </Text>
                    <Rating
                      fractions={2}
                      size="md"
                      value={userRating}
                      defaultValue={0}
                      readOnly
                    />
                  </Flex>
                  <Text>{userRating}</Text>
                </Flex>
              )}
            </Flex>
          </div>
        </>
      ) : (
        <Flex justify={"center"} pt={20} align={"center"}>
          <Loader color="blue" />
        </Flex>
      )}
    </div>
  );
};

export default RecipeDisplay;
