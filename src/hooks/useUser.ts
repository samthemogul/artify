import { useContext } from 'react'
import { UserContext } from '../context/UserContextProvider';

const useUser = () => useContext(UserContext);

export default useUser