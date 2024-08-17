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
  Textarea,
} from "@mantine/core";
import { ArrowLeft, Clock } from "@phosphor-icons/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebase";

const RecipeDisplay = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { recipeId } = useParams();
  console.log(recipeId);
  useEffect(() => {
    async function fetchRecipe() {
      try {
        const recipeRef = doc(db, "recipes", recipeId);
        const recipeSnap = await getDoc(recipeRef);

        if (recipeSnap.exists()) {
          setRecipe(recipeSnap.data());
          console.log(recipeSnap.data());
          setLoading(false);
          // Set the recipe data to state
        } else {
          console.log("No such recipe!");
          // Set loading to false once fetching is done
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    }

    fetchRecipe(); // Call the async function to fetch the recipe
  }, [recipeId]); // Dependency array to re-run the effect if recipeId changes
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
            <Rating size="md" defaultValue={4} readOnly />
            <Text size="xl">5 Reviews </Text>
          </Flex>
          <Text size="md" mt={10}>
            Submitted by{" "}
            <Text c="blue" fw={500} component="span">
              Kyikyi
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
            <Flex mt={20} align={"center"} gap={"md"}>
              <Rating size="md" defaultValue={4} readOnly />
              <Text size="xl">5 Reviews </Text>
            </Flex>
            <Flex mt={20} gap={5} align={"flex-start"}>
              <Avatar size="lg" src="" alt="User Avatar" />
              <Textarea
                style={{
                  width: "100%",
                }}
                ml={10}
                rows={4}
                placeholder="Leave a review"
              />
            </Flex>
            <Flex
              mt={20}
              ml={70}
              align={"center"}
              justify={"space-between"}
              gap={10}
            >
              <Flex align={"center"} gap={10}>
                <Text fw={"bold"} size="lg">
                  Your Rating:
                </Text>
                <Rating size="md" defaultValue={0} />
              </Flex>
              <Button radius={"xl"}>Post Review</Button>
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
