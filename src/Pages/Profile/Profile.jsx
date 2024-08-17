import { Card, Avatar, Text, Group, Button } from '@mantine/core';

const Profile = () => {
  const user = {
    name: 'Nawang',
    initials: 'NS',
    email: 'nawang@example.com',
    userRecipes: ["ShaMomo", "Tingmo"]
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
      <Card withBorder padding="xl" radius="md">
        <Card.Section
          h={140}
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <Avatar
          color="purple"
          size={80}
          radius={80}
          mx="auto"
          mt={-30}
          style={{ border: '2px solid white' }}
        >
        {user.initials}
        </Avatar>
        <Text align="center" size="lg" weight={500} mt="sm">
          {user.name}
        </Text>
        <Text align="center" size="sm" color="dimmed">
          {user.email}
        </Text>
        <Group mt="md" direction="column" align="center">
          <Text size="lg" weight={500}>My Recipes:</Text>
          <Group spacing="sm" direction="column" align="center">
            {user.userRecipes.length > 0 ? (
              user.userRecipes.map((recipe, index) => (
                <Text key={index} size="sm">
                  {recipe}
                </Text>
              ))
            ) : (
              <Text size="sm" color="dimmed">No recipes available</Text>
            )}
          </Group>
        </Group>
        <Group mt="md" position="center">
          <Button variant="outline" color="red">
            Logout
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default Profile;
