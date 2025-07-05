import styled from 'styled-components';
import Questionnaire from './components/Questionnaire';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  color: white;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
`;

function App() {
  return (
    <AppContainer>
      <Header>
        <Logo>Badbygg VVS</Logo>
        <Subtitle>Få ditt prisestimat på 2 minutter</Subtitle>
      </Header>
      <Questionnaire />
    </AppContainer>
  );
}

export default App;
