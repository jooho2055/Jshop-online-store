import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		onUserStateChange((user) => {
			setUser(user);
			setIsLoading(false);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
