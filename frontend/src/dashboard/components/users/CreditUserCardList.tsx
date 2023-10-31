import { useUsersCrud } from '../../hooks/useUsersCrud'
import { CreditUserCard } from './CreditUserCard'



export const CreditUserCardList = () => {
  const { users } = useUsersCrud();

  return (
    <ul>
      { users.map( (item) => (<CreditUserCard key={ item.id } creditUser={ item } />) ) }
    </ul>
  )
}

