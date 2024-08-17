import RecipeCard from "../../Components/RecipeCard";
import { Text } from "@mantine/core";

function Favorites() {
  const dummyFavoriteRecipes = [
    {
      name: "ShaMomos",
      image: "https://data.tibettravel.org/assets/images/tibetan-food/momo11.jpg",
      cookTime: 45,
      description: "Delicious dumplings filled with meat.",
    },
    {
      name: "Tibetan Butter Tea",
      image: "https://cdn.shopify.com/s/files/1/2669/5944/files/butter_tea_shutterstock_333184121_600x600.jpg?v=1612914596",
      cookTime: 8,
      description: "A salty tea made with yak butter and salt",
    },
  ];

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "20px 10px" }}>
      <Text py={15} align="left" size="xl" style={{ color: "black", fontWeight: "700" }}>
        Favorites
      </Text>
      {dummyFavoriteRecipes.length > 0 ? (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
          {dummyFavoriteRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              isFavorited={true} // Dummy data is favorited
              onToggleFavorite={() => {}}
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
