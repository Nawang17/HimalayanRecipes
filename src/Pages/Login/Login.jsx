import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
} from "@mantine/core";
import classes from "./AuthenticationTitle.module.css";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { HandWaving, WarningCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { notifications } from "@mantine/notifications";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleDemoLogin = () => {
    const demoemail = "demo@gmail.com";
    const demopassword = "demo123";
    setEmail(demoemail);
    setPassword(demopassword);

    setError("");
    setLoading(true);
    signInWithEmailAndPassword(auth, demoemail, demopassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        notifications.show({
          title: `Welcome back ${user.displayName}`,
          message: "You have successfully logged in",
          color: "teal",
          position: "bottom-center",
          icon: <HandWaving size={18} />,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setLoading(false);
      });
  };
  const handleLogin = () => {
    setError("");
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        notifications.show({
          title: `Welcome back ${user.displayName}`,
          message: "You have successfully logged in",
          color: "teal",
          position: "bottom-center",
          icon: <HandWaving size={18} />,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setLoading(false);
      });
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          onClick={() => navigate("/register")}
          size="sm"
          component="button"
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && (
          <Alert variant="light" color="red" icon={<WarningCircle size={32} />}>
            {error}
          </Alert>
        )}
        <TextInput
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          label="Email"
          placeholder="example@mail.com"
          required
        />
        <PasswordInput
          onChange={(event) => setPassword(event.currentTarget.value)}
          value={password}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />

        <Button
          loading={loading}
          onClick={() => handleLogin()}
          fullWidth
          mt="xl"
        >
          Sign in
        </Button>
        <Button
          color="black"
          variant="outline"
          onClick={() => handleDemoLogin()}
          fullWidth
          mt="sm"
        >
          Try Demo Account
        </Button>
      </Paper>
    </Container>
  );
};
export default Login;
