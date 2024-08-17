import { useState } from "react";
import {
  Image,
  Input,
  NumberInput,
  Text,
  Textarea,
  Button,
  ActionIcon,
} from "@mantine/core";
import { Trash } from "@phosphor-icons/react";

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [steps, setSteps] = useState([""]);
  const [tags, setTags] = useState(""); // State for tags
  const [recipeName, setRecipeName] = useState(""); // State for recipe name
  const [cookingTime, setCookingTime] = useState(""); // State for cooking time
  const [description, setDescription] = useState(""); // State for description
  const [image, setImage] = useState(null); // State for the image

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = steps.map((step, i) => (i === index ? value : step));
    setSteps(updatedSteps);
  };

  const handleRemoveStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleCreateRecipe = () => {
    const recipeData = {
      recipeName,
      cookingTime,
      description,
      tags,
      ingredients,
      steps,
      image, // Include image data
    };
    console.log("Recipe Data:", recipeData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Text pt={10} size="xl" fw={600}>
        🍲 Create a new recipe
      </Text>

      <Input.Wrapper
        mt={10}
        style={{
          width: "100%",
        }}
        label="Upload Image"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ width: "100%" }}
        />
      </Input.Wrapper>

      {image && (
        <Image
          mt={10}
          h={200}
          w="auto"
          fit="contain"
          radius="md"
          src={image}
          alt="Recipe Image"
        />
      )}

      <Input.Wrapper
        mt={10}
        style={{
          width: "100%",
        }}
        label="Recipe name"
      >
        <Input
          placeholder="Recipe name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
      </Input.Wrapper>
      <NumberInput
        mt={10}
        style={{
          width: "100%",
        }}
        label="Cooking time (minutes)"
        placeholder="Cooking time"
        value={cookingTime}
        onChange={(value) => setCookingTime(value)}
      />

      <Textarea
        mt={10}
        label="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Input.Wrapper
        mt={10}
        style={{
          width: "100%",
        }}
        label="Tags (comma-separated)"
      >
        <Input
          placeholder="e.g., spicy, vegan, dessert"
          value={tags}
          onChange={handleTagsChange}
        />
      </Input.Wrapper>

      <Text pt={20} size="md" fw={600}>
        Ingredients
      </Text>
      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Text
            style={{
              width: "30px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {index + 1}.
          </Text>
          <Input
            style={{ width: "60%" }}
            placeholder="Ingredient name"
            value={ingredient.name}
            onChange={(e) =>
              handleIngredientChange(index, "name", e.target.value)
            }
          />
          <Input
            ml={10}
            style={{ width: "30%" }}
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) =>
              handleIngredientChange(index, "quantity", e.target.value)
            }
          />
          <ActionIcon
            ml={10}
            onClick={() => handleRemoveIngredient(index)}
            disabled={ingredients.length === 1}
            color="red"
            variant="outline"
            size="lg"
            aria-label="delete"
          >
            <Trash size={22} />
          </ActionIcon>
        </div>
      ))}
      <Button ml={30} mt={10} onClick={handleAddIngredient}>
        Add Ingredient
      </Button>

      <Text pt={20} size="md" fw={600}>
        Preparation Steps
      </Text>
      {steps.map((step, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Text
            style={{
              width: "30px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {index + 1}.
          </Text>
          <Textarea
            style={{ flexGrow: 1 }}
            placeholder={`Step ${index + 1}`}
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
          />
          <ActionIcon
            ml={10}
            onClick={() => handleRemoveStep(index)}
            disabled={steps.length === 1}
            color="red"
            variant="outline"
            size="lg"
            aria-label="delete"
          >
            <Trash size={22} />
          </ActionIcon>
        </div>
      ))}
      <Button ml={30} mt={10} onClick={handleAddStep}>
        Add Step
      </Button>
      <div
        style={{
          marginLeft: "30px",
        }}
      >
        <Button
          style={{ width: "100%" }}
          mt={30}
          color="green"
          onClick={handleCreateRecipe}
        >
          Create new Recipe
        </Button>
      </div>
    </div>
  );
};

export default CreateRecipe;
