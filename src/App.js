import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './components/context/AuthContext';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<Navbar></Navbar>
				<Outlet></Outlet>
			</AuthContextProvider>
		</QueryClientProvider>
	);
}

export default App;
