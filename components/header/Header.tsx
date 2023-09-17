import { Box, Container } from "@radix-ui/themes";

export default function Header() {
  return (
    <Box className="header" p="4" asChild>
      <header>
        <Container size="3"></Container>
      </header>
    </Box>
  );
}
