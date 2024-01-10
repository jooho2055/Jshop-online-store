import React from 'react';
import { useAuthContext } from '../components/context/AuthContext';
import { Navigate } from 'react-router-dom';

// check if a user is login or not
// check if the user is admin or not
// if 'requireAdmin' is true, then it should be logged in, and it has to be admin
// if not, go to / upper(parent route)
// if requirement is fullfilled, show 'children'

export default function ProtectedRoute({ children, requireAdmin }) {
	const { user, isLoading } = useAuthContext();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!user || (requireAdmin && !user?.isAdmin)) {
		console.log(user);
		return <Navigate to='/' replace />; // replace (true) {not storing in history}
	}

	return children;
}
