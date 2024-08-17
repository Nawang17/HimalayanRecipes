import { Card, Avatar, Text, Group } from "@mantine/core";
import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
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

        <Group mt="md" direction="column" align="center">
          <Text size="lg" weight={500}>
            My Recipes:
          </Text>
          {/* <Group spacing="sm" direction="column" align="center">
            {user.userRecipes.length > 0 ? (
              user.userRecipes.map((recipe, index) => (
                <Text key={index} size="sm">
                  {recipe}
                </Text>
              ))
            ) : (
              <Text size="sm" c="dimmed">
                No recipes available
              </Text>
            )}
          </Group> */}
        </Group>
      </Card>
    </div>
  );
};

export default Profile;
