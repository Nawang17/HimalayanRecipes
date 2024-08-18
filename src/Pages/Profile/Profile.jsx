import { useEffect, useState } from "react";
import { Card, Avatar, Text, Group, Loader } from "@mantine/core";
import useAuth from "../../Hooks/useAuth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const Profile = () => {
  const { user } = useAuth();
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserRecipes() {
      if (user?.uid) {
        const recipesCollection = collection(db, "recipes");
        const q = query(recipesCollection, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedRecipes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserRecipes(fetchedRecipes);
        setLoading(false);
      }
    }

    fetchUserRecipes();
  }, [user?.uid]);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
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
          src={user?.photoURL}
        />

        <Text align="center" size="lg" weight={500} mt="sm">
          {user?.displayName}
        </Text>

        <Group mt="md" direction="column" align="center">
          <Text size="lg" weight={500}>
            My Recipes:
          </Text>
          {loading ? (
            <Loader color="blue" />
          ) : userRecipes.length > 0 ? (
            userRecipes.map((recipe) => (
              <Text key={recipe.id} size="sm">
                {recipe.recipeName}
              </Text>
            ))
          ) : (
            <Text size="sm" c="dimmed">
              No recipes available
            </Text>
          )}
        </Group>
      </Card>
    </div>
  );
};

export default Profile;
