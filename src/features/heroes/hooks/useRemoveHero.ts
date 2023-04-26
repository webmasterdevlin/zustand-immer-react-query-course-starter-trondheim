import { useMutation, useQueryClient } from 'react-query';
import { EndPoints } from '../../../axios/api-config';
import { deleteAxios } from '../../../axios/generic-api-calls';
import { keys } from '../../keyNames';
import type { HeroModel } from '../hero';

export default function useRemoveHero() {
  const queryClient = useQueryClient();

  return useMutation(
    heroId => {
      return deleteAxios<void>(EndPoints.heroes, heroId);
    },
    {
      onMutate: async (heroId: string) => {
        // cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([keys.heroes]);
        // Snapshot the previous value
        const backup = queryClient.getQueryData<{ data: HeroModel[] }>([keys.heroes]);
        // Optimistically update by removing the hero
        if (backup)
          queryClient.setQueryData<{ data: HeroModel[] }>([keys.heroes], {
            data: [
              ...backup.data.filter(h => {
                return h.id !== heroId;
              }),
            ],
          });
        return { backup };
      },
      onError: (err, variables, context) => {
        // rolling back to previous state
        if (context?.backup) queryClient.setQueriesData<HeroModel[]>([keys.heroes], context.backup.data);
      },
      // always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries([keys.heroes]);
      },
    },
  );
}
