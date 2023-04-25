import { useQuery } from 'react-query';
import { EndPoints } from '../../../axios/api-config';
import { getAxios } from '../../../axios/generic-api-calls';
import { keys } from '../../keyNames';
import type { HeroModel } from '../hero';

export default function useFetchHeroes() {
  return useQuery([keys.heroes], () => {
    return getAxios<HeroModel[]>(EndPoints.heroes);
  });
}
