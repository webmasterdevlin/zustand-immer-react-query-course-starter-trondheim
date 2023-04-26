import React from 'react';

import { Moon, Sun } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { pathNames } from '../Routes';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import { useThemeStore } from '../store/themeStore';
import Button from './Button';
import TotalOfCharacters from './TotalOfCharacters';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { isDark } = useThemeStore(state => {
    return state.theme;
  });
  const { setDarkTheme, setLightTheme } = useThemeStore();
  const { data: heroes } = useFetchHeroes();

  return (
    <>
      <div className={'mih-50 flex flex-row flex-wrap items-center justify-between'}>
        <div>
          {Object.entries(pathNames)?.map(([key, value], index) => {
            return (
              <Button
                key={index}
                onClick={() => {
                  navigate(value);
                }}
              >
                {key}
              </Button>
            );
          })}
        </div>
        <div className="flex">
          <TotalOfCharacters label="heroes" collection={heroes?.data} />
        </div>
        <div className="mih-50 flex flex-row flex-wrap items-center justify-between gap-10 pr-10">
          {isDark ? (
            <Sun onClick={setLightTheme} className="cursor-pointer" />
          ) : (
            <Moon onClick={setDarkTheme} className="cursor-pointer" />
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
