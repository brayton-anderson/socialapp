import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { createStyles, Avatar, Group, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from '@mantine/notifications';
import { Check } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  mineral: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },
  createMineral: {
    justifyContent: "center",
  },
  media: {
    width: "50vw",
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "25vw",
    },
  },
}));

const CreateMineral = ({ setMinerals }) => {
  const user = useUser();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      mineral: "",
    },
  });
  const [inputDisabled, setInputDisabled] = useState(false);

  const onSubmitMineral = async (value) => {
    setInputDisabled(true);
    const mineral = {
      postedAt: Date.now(),
      body: value.mineral,
      likes: [],
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
      },
    };
    const response = await fetch("/api/mineral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mineral),
    });

    const responseJson = await response.json();
    
    setMinerals((minerals) => [
      {
        _id: responseJson.insertedId,
        ...mineral
      },
      ...minerals,
    ]);
    form.reset();
    setInputDisabled(false);
    showSuccess();
  };

  const showSuccess = () => {
    showNotification({
      title: "Success",
      message: "Your mineral has been sent",
      icon: <Check size={18} />,
      autoClose: 5000,
      styles: (theme) => ({
        root: {
          borderColor: theme.colors.green[6],
        }
      }),
    });
  };

  return (
    <Group position={"center"} mt={10} mb={20}>
      <Avatar src={user.picture} alt={user.name} radius="xl" />
      <form onSubmit={form.onSubmit((value) => onSubmitMineral(value))}>
        <Group>
          <Textarea
            required
            placeholder="Send a mineral..."
            variant="filled"
            className={classes.media}
            {...form.getInputProps("mineral")}
          />
          <Button type="submit" disabled={inputDisabled}>Send</Button>
        </Group>
      </form>
    </Group>
  );
};

export default CreateMineral;
