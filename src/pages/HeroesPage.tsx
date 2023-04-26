import { useState } from 'react';
import { useQueryClient } from 'react-query';
import Button from '../components/Button';
import TitleBar from '../components/TitleBar';
import UpdateUiLabel from '../components/UpdateUiLabel';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import { keys } from '../features/keyNames';
import type { HeroModel } from '../features/heroes/hero';

const HeroesPage = () => {
  const { data: response, status } = useFetchHeroes();
  const queryClient = useQueryClient();

  const [tracker, setTracker] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: HeroModel[] }>([keys.heroes], prevData => {
      return {
        data: prevData?.data?.filter(h => {
          return h.id !== id;
        }) as HeroModel[],
      };
    });
  };

  if (status === 'error') return <p>Error oh no</p>;

  return (
    <div>
      <TitleBar title="Heroes Page" />
      <UpdateUiLabel />
      {status === 'loading' ? (
        <p>Loading... Please wait</p>
      ) : (
        response?.data.map(h => {
          return (
            <div className="flex items-center justify-between" data-testid="hero-card" key={h.id}>
              <h1>
                <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                {tracker === h.id && <span> - marked</span>}
              </h1>
              <div>
                <Button
                  color="primary"
                  onClick={() => {
                    setTracker(h.id);
                  }}
                >
                  Mark
                </Button>
                <Button
                  onClick={() => {
                    handleSoftDelete(h.id);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default HeroesPage;
