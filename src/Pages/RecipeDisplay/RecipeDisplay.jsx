import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Flex,
  Image,
  Pill,
  Rating,
  Text,
  Textarea,
} from "@mantine/core";
import { ArrowLeft, Clock } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

// Sample data for ingredients
const ingredients = [
  { name: "All-purpose flour", quantity: "2 cups (280 grams)" },
  { name: "Salt", quantity: "1 teaspoon" },
  { name: "Active dry yeast", quantity: "1 teaspoon" },
  { name: "Water", quantity: "2⁄3 cup plus 2 tablespoons, divided" },
  { name: "Sugar", quantity: "2 teaspoons" },
];
const tags = ["Tibetan", "Bread", "Steamed", "Buns"];
// Sample data for steps
const steps = [
  "In a large bowl, combine flour, salt, and yeast.",
  "Gradually add water and mix until a dough forms.",
  "Knead the dough on a floured surface for about 10 minutes.",
  "Let the dough rise in a warm place for 1 hour, or until doubled in size.",
  "Divide the dough into small pieces and shape them into buns.",
  "Steam the buns for about 15 minutes, or until cooked through.",
  "Serve with your choice of accompaniment, such as phing sha or shapta.",
];

const RecipeDisplay = () => {
  const navigate = useNavigate();

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
      <Text pt={10} size="2.5rem" fw={500}>
        Tingmo
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
        It probably depends on which part of the world you live in. If you’re in
        North America, it may be the famous Tibetan butter tea, or bhocha, as it
        is known to Tibetans, which inspired the once-viral bulletproof coffee
        trend. But if you live in the Himalayan region of India, Bhutan, or
        Nepal, home to some of the largest Tibetan exile settlements of the past
        seven decades, you will likely know of momo, Tibetan dumplings that have
        become widely adopted in these Himalayan countries. Tingmomo is another
        Tibetan treat you should know. A steamed bun with a soft, fluffy
        texture, its name, some say, is a contraction of tingba, the Tibetan
        word for “cloud,” and momo, the Tibetan word for “dumpling.” The buns,
        called tingmo for short, are typically paired with phing sha, a savory
        stir-fry of glass noodles with mokru (wood ear mushrooms) and chunks of
        meat; or with shapta, thinly sliced meat stir-fried with velvety gravy
        that you sop up with pieces of tingmo.
      </Text>
      <Image
        mt={10}
        h={300}
        radius="md"
        src={
          "https://cdn.vox-cdn.com/thumbor/uS9IylxD7qaQBSjim_5AcFgyOzE=/0x0:4124x2842/620x413/filters:focal(1733x1092:2391x1750):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69417084/VICTA_EATER_TINGMOMO_HORIZONTAL_SOLO.0.jpg"
        }
        alt="Recipe Image"
      />
      <Flex align={"center"} gap={5} mt={15}>
        <Clock size={22} />
        <Text>
          Ready in:{" "}
          <Text fw={600} component="span">
            90 minutes
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
          {ingredients.map((ingredient, index) => (
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
          {steps.map((step, index) => (
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
            {tags.map((tag, index) => (
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
    </div>
  );
};

export default RecipeDisplay;
