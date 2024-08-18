/* eslint-disable react/prop-types */
import { Card, Image, Text, Badge, ActionIcon, Flex } from "@mantine/core";
import { Clock, Star } from "@phosphor-icons/react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe, isFavorited, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.randomId}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      style={{
        width: "100%",
        position: "relative",
        cursor: "pointer",
      }}
      shadow="sm"
      padding="lg"
      radius="md"
      variant="default"
    >
      <Card.Section>
        <Image src={recipe.image} height={160} alt={recipe.recipeName} />
        <ActionIcon
          variant={"filled"}
          color="rgba(255, 255, 255, 1)"
          radius={"xl"}
          size={"lg"}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click from triggering the card navigation
            onToggleFavorite(recipe);
          }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          {isFavorited ? (
            <IconHeartFilled color="red" size={19} />
          ) : (
            <IconHeart color="red" size={19} />
          )}
        </ActionIcon>
        <Badge
          color="black"
          variant="white"
          style={{
            position: "absolute",
            top: 130,
            left: 10,
          }}
          size="md"
        >
          <Flex align={"center"} gap={4}>
            <Clock size={16} /> {recipe?.cookingTime} min{" "}
          </Flex>
        </Badge>
      </Card.Section>

      <Flex align={"center"} justify="space-between" mt="md" mb="xs">
        <Text fw={600}>{recipe?.recipeName}</Text>
        <Flex align={"center"} gap={5}>
          <Star weight="fill" color="orange" size={20} />
          <Text fw={600}>
            {recipe?.averageRating > 1 ? recipe?.averageRating : 0}
          </Text>
        </Flex>
      </Flex>

      <Text size="sm" c="dimmed">
        {recipe?.description?.split(" ").slice(0, 30).join(" ")}...
      </Text>
      <Flex align={"center"} wrap={"wrap"} mt="md" gap={8}>
        {recipe.tags?.split(",").map((tag, index) => (
          <Badge key={index} color="gray">
            {tag}
          </Badge>
        ))}
      </Flex>
    </Card>
  );
}

export default RecipeCard;
