import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';

const HeroesPage = () => {
  const { data: response, status } = useFetchHeroes();
  if (status === 'error') return <p>Error :(</p>;

  return (
    <div>
      <h1>Heroes Page</h1>
      {status === 'loading' ? (
        <p>Loading... Please wait</p>
      ) : (
        <div>
          {response?.data.map(h => {
            return (
              <div data-testid="hero-card" key={h.id}>
                <h2>{h.firstName}</h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HeroesPage;
