/* eslint-disable react/prop-types */
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  ActionIcon,
} from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
function RecipeCard({ recipe, isFavorited, onToggleFavorite }) {
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: "300px", position: "relative" }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image src={recipe.image} height={160} alt={recipe.name} />
        <ActionIcon
          variant={"filled"}
          color="rgba(255, 255, 255, 1)"
          radius={"lg"}
          onClick={() => onToggleFavorite(recipe)}
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
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text weight={500}>{recipe.name}</Text>
        <Badge color="pink" variant="light">
          {recipe.cookTime} mins{" "}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {recipe.description}
      </Text>

      <Button
        onClick={() => navigate("/recipe")}
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        View Recipe
      </Button>
    </Card>
  );
}

export default RecipeCard;
