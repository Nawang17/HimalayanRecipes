import { useEffect, useState } from "react";
import { Card, Avatar, Text, Loader, SimpleGrid, Badge } from "@mantine/core";
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
    <div style={{ maxWidth: 800, margin: "auto", padding: "30px" }}>
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

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Text size="lg" weight={500}>
            My Recipes:
          </Text>
        </div>

        {loading ? (
          <Loader color="blue" style={{ marginTop: "20px" }} />
        ) : userRecipes.length > 0 ? (
          <SimpleGrid cols={2} spacing="lg" mt="md">
            {userRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                shadow="sm"
                padding="sm"
                radius="md"
                withBorder
                style={{ cursor: "pointer" }}
                onClick={() => window.location.href = `/recipe/${recipe.id}`}
              >
                <Card.Section>
                  <img
                    src={recipe.image || "https://via.placeholder.com/200"}
                    alt={recipe.recipeName}
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: "md",
                    }}
                  />
                </Card.Section>
                <Text mt="md" size="lg" weight={500}>
                  {recipe.recipeName}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
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
