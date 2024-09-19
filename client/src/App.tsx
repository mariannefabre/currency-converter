import { FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Converter } from "./Converter";
import { HeroHeader } from "./HeroHeader";
import { NavigationBar } from "./NavigationBar";
import { theme } from "./theme";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <NavigationBar />
        <HeroSection>
          <HeroHeader />
          <Converter />
        </HeroSection>
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const HeroSection = styled.div`
  display: flex;
  flex-grow: 1;
  overflow-wrap: anywhere;
  justify-content: space-between;
  padding: 80px;
  gap: 20px;

  @media (max-width: 1060px) {
    flex-flow: wrap-reverse;
    overflow-wrap: inherit;
    padding: 40px;
  }
`;

export default App;
