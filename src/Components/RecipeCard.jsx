import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  ActionIcon,
  Rating
} from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe, isFavorited, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/recipe"); 
  };

  return (
    <Card
      onClick={handleCardClick}
      style={{
        width: "300px",
        position: "relative",
        cursor: "pointer",
      }}
      shadow="sm"
      padding="lg"
      radius="md"
      variant="default"
    >
      <Card.Section>
        <Image src={recipe.image} height={160} alt={recipe.name} />
        <ActionIcon
          variant={"filled"}
          color="rgba(255, 255, 255, 1)"
          radius={"lg"}
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
            <IconHeartFilled color="red" size={18} />
          ) : (
            <IconHeart color="red" size={18} />
          )}
        </ActionIcon>
        <Badge
          color="pink"
          variant="white"
          style={{
            position: "absolute",
            top: 130,
            left: 10,
          }}
        >
          {recipe.cookTime} mins{" "}
        </Badge>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text weight={500}>{recipe.name}</Text>
        <Group justify="end" mt="md" mb="xs">
          <Rating size="xs" defaultValue={0} value={recipe.avgRating} readOnly />
          <Text size="sm">{recipe.avgRating}</Text>
        </Group>
      </Group>

      <Text size="sm" c="dimmed">
        {recipe.description}
      </Text>
    </Card>
  );
}

export default RecipeCard;
