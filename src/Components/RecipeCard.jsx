/* eslint-disable react/prop-types */
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

function RecipeCard({ recipe }) {
  return (
    <Card
      style={{ width: "300px" }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image src={recipe.image} height={160} alt={recipe.name} />
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

      <Button color="blue" fullWidth mt="md" radius="md">
        View Recipe
      </Button>
    </Card>
  );
}

export default RecipeCard;
