import Button from '../../components/Button';
import Container from '../../components/Container';

const Home = () => {
  return (
    <Container title="Home">
      <Button path="/about-us" title="About us" extraStyles="mt-6" />
    </Container>
  );
};

export default Home;
