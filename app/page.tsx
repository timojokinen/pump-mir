"use client";

import * as Label from "@radix-ui/react-label";
import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
  TextField
} from "@radix-ui/themes";

export default function Home() {
  return (
    <main>
      <Section>
        <Container size="3" mb="8">
          <Heading as="h1" size="9">
            PumpMir
          </Heading>
        </Container>
        <Container size="3">
          <Card size="5">
            <Heading mb="4" as="h2" size="5">
              Log Workout
            </Heading>
            <Grid columns="2" mb="6">
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
            </Flex>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
