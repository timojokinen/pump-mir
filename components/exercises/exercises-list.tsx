"use client";

import { Exercise } from "@prisma/client";
import { Button, Flex, Table, TextFieldInput } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import CreateExerciseDialog from "./create-exercise";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  exercises: Exercise[];
};

export default function ExercisesList({ exercises }: Props) {
  const { data } = useSession({ required: true });
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredExercises = useMemo(() => {
    const searchPattern = new RegExp(
      ".*" + searchQuery.toLowerCase().split("").join(".*") + ".*"
    );

    return exercises.filter((e) => searchPattern.test(e.name.toLowerCase()));
  }, [exercises, searchQuery]);

  const deleteExercise = async (id: string) => {
    await fetch("/api/exercises/" + id, { method: "DELETE" });
    router.refresh();
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Exercises</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Flex justify="end">
              <CreateExerciseDialog />
            </Flex>
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {exercises.length > 0 && (
          <Table.Row>
            <Table.Cell colSpan={2}>
              <TextFieldInput
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
              />
            </Table.Cell>
          </Table.Row>
        )}
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <Table.Row key={exercise.id}>
              <Table.RowHeaderCell>{exercise.name}</Table.RowHeaderCell>
              <Table.Cell>
                <Flex justify="end">
                  {exercise.creatorId === data!.user!.id! && (
                    <Button
                      variant="soft"
                      color="crimson"
                      size="1"
                      onClick={() => deleteExercise(exercise.id)}
                    >
                      Delete
                    </Button>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={2}>
              <Flex justify="center">No exercises found.</Flex>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
