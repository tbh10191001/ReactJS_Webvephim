import { Navigate } from 'react-router-dom';

export const PrivateCustomer = ({ children }) => {
    const customer = JSON.parse(localStorage.getItem('customer'));
    return (
        <div>
            {customer.role && customer.role.idrole === 2 ? (
                children
            ) : (
                <Navigate to="/login" />
            )}
        </div>
    );
};
