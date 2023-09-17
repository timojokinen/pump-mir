import CreateExerciseDialog from "@/components/exercises/create-exercise";
import ExercisesList from "@/components/exercises/exercises-list";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Container, Flex, Section } from "@radix-ui/themes";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const exercises = await prisma.exercise.findMany({
    where: {
      creatorId: session!.user!.id,
    },
  });

  return (
    <main>
      <Container size="2" mb="8" p="4">
        <ExercisesList exercises={exercises}></ExercisesList>
      </Container>
      {/*       <Grid columns="2" mb="6">
        <Label.Root htmlFor="input1">
          <Text size="4">Bench Press</Text>
        </Label.Root>
        <TextField.Input
          id="input1"
          placeholder="Enter your email"
        ></TextField.Input>
      </Grid>
      <Flex justify="end">
        <Button variant="surface" size="4">
          Log Workout
        </Button>
      </Flex> */}
    </main>
  );
}
