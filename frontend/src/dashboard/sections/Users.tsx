import { useEffect, useMemo, useState } from "react";
import { LoadingSection } from '../../components/LoadingSection';
import { usersAPI } from '../services/users.service';
import { useUsersCrud } from '../hooks/useUsersCrud';
import { CreditUserCard } from '../components/users/card/CreditUserCard';
import { toast } from 'react-toastify';

export const UserSection = () => {
  const { users, retrieve } = useUsersCrud();

  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const fetchUsers = useMemo( () => async () => {
    try {
      setLoading(true);
      const usrs = await toast.promise( usersAPI.findAll(), {
        pending: 'Fetching credit users...',
        success: 'Users retrieved',
        error: 'There was an error while requesting for the source'
      } );
      retrieve(usrs);
      setLoading(false);
    } catch (error) {
      const { message } = error as Error;
      setError(message);
      setLoading(false);
    }
  }, [] );

  useEffect(() => {
    document.title = 'Dashboard | Users';
    fetchUsers();
  }, [fetchUsers]);

  return (loading)
    ? (<LoadingSection type='bubbles' color='#648EFB' width='128px' height='128px' />)
    : (
      <div className='section-content'>
        <div className='section-toolbar'>
          <button className='toolbar__btn'>Create</button>
        </div>
        <ul>
          { users.map( (item) => (<CreditUserCard key={ item.id } creditUser={ item } />) ) }
        </ul>             
      </div>
    );
}
