import Button from '../../components/Button';
import Container from '../../components/Container';

const AboutUs = () => {
  return (
    <Container title="About Us">
      <Button
        title="Home"
        extraStyles="mt-6 dark:bg-rose-200 dark:active:bg-rose-300 bg-rose-500 active:bg-rose-600"
        path={'/'}
      />
    </Container>
  );
};

export default AboutUs;
