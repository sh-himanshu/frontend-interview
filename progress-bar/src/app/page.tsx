import ProgressBar from '@/components/progress-bar/ProgressBar';

const Home = () => {
  return (
    <div className="p-10 bg-neutral-800 h-screen">
      <h1 className="text-lg text-white uppercase mb-4 font-medium">Progress Bar</h1>
      <ProgressBar />
    </div>
  );
};

export default Home;
