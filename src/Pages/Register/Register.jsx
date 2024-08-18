import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Alert,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "../Login/AuthenticationTitle.module.css";
import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Smiley, WarningCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { notifications } from "@mantine/notifications";
import confetti from "canvas-confetti";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
const Login = () => {
  const navigate = useNavigate();

  const auth = getAuth();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = () => {
    setError("");
    setLoading(true);
    if (!username || !email || !password) {
      setError("Please fill all the fields");
      setLoading(false);

      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        //add user to users collection
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          photoURL: `https://ui-avatars.com/api/?background=106cad&color=fff&name=${username[0]}&size=128`,
          favorites: [],
        });

        // update username
        updateProfile(auth.currentUser, {
          displayName: username ? username : "User",
          photoURL: `https://ui-avatars.com/api/?background=106cad&color=fff&name=${username[0]}&size=128`,
        })
          .then(() => {
            console.log("User profile updated!");
            setLoading(false);
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
            notifications.show({
              title: "Welcome to HimalayaEats!",
              message: "You have successfully registered",
              color: "teal",
              position: "bottom-center",
              icon: <Smiley size={18} />,
            });
            navigate("/");
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            setLoading(false);
            console.log(errorMessage);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorMessage);
        setLoading(false);
        // ..
      });
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Register!{" "}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor onClick={() => navigate("/login")} size="sm" component="button">
          Login
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && (
          <Alert variant="light" color="red" icon={<WarningCircle size={32} />}>
            {error}
          </Alert>
        )}
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          placeholder="tseten"
          required
        />
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="example@mail.com"
          required
          mt="md"
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />

        <Button
          loading={loading}
          onClick={() => handleRegister()}
          fullWidth
          mt="xl"
        >
          Register
        </Button>
      </Paper>
    </Container>
  );
};
export default Login;
