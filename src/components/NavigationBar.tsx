import React, { useState } from 'react';

import { Moon, Sun } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { pathNames } from '../Routes';
import Button from './Button';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isDark] = useState(false);

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

        <div className="mih-50 flex flex-row flex-wrap items-center justify-between gap-10 pr-10">
          {isDark ? <Sun className="cursor-pointer" /> : <Moon className="cursor-pointer" />}
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
