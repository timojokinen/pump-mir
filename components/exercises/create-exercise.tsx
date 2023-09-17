"use client";

import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateExerciseDialog() {
  const [name, setName] = useState("");
  const router = useRouter();

  const create = async () => {
    await fetch("/api/exercises", {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
    });
    setName("");
    router.refresh();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Create Exercise</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Create an exercise</Dialog.Title>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              name="name"
              placeholder="Bench Press"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={create}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
