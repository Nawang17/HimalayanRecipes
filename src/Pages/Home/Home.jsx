import React, { useState } from 'react';
import { TextInput } from "@mantine/core";
import { Text } from "@mantine/core";
import SearchBar from '../../Components/SearchBar';
import RecipeCard from "../../Components/RecipeCard";

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const recipes = [
    {
      name: "ShaMomos",
      image: "https://data.tibettravel.org/assets/images/tibetan-food/momo11.jpg",
      cookTime: 45,
      description: "Delicious dumplings filled with meat.",
    },
    {
      name: "Tingmo",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu9bnwA_Ny2wUfuJcuMf_JhhTY4Smq27ekLA&s",
      cookTime: 20,
      description: "A soft, fluffy steamed bun.",
    },
  ];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm && (
        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            backgroundColor: 'lightblue',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      )}
  
      <Text align='center' size='xl'>Popular Recipes</Text>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px',}}>
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );  
}

export default Home;
