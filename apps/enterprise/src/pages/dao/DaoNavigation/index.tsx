import { getLast } from 'lib/shared/utils/getlast';
import { ViewSelector } from 'lib/ui/inputs/Select/ViewSelector';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const daoView = ['staking', 'distribute', 'members'] as const;
type DaoView = typeof daoView[number];

const daoViewName: Record<DaoView, string> = {
  staking: 'Staking',
  distribute: 'Distribute',
  members: 'Members'
};

const daoViewPath: Record<DaoView, string> = {
  staking: 'staking',
  distribute: 'Distribute',
  members: 'Members'
};

export const DaoNavigation = () => {
  const dao = useCurrentDao();
  // @ts-ignore
  const options =
    dao.dao_type === 'multisig' ? daoView.filter((v) => v !== 'staking') : daoView.filter((v) => v !== 'members');

  const { pathname } = useLocation();

  const activeView = useMemo(() => {
    const path = getLast(pathname.split('/').filter((p) => p !== ''));
    return (Object.entries(daoViewPath).find(([, v]) => v === path)?.[0] ?? 'overview') as DaoView;
  }, [pathname]);

  const navigate = useNavigate();

  return (
    <ViewSelector
      options={options}
      getName={(view) => daoViewName[view]}
      selectedOption={activeView}
      onSelect={(view) => navigate(daoViewPath[view])}
      groupName="dao-navigation"
    />
  );
};
