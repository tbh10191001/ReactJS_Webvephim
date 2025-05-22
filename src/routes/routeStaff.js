import { Navigate } from 'react-router-dom';

export const PrivateStaff = ({ children }) => {
    const staff = JSON.parse(localStorage.getItem('staff'));
    return (
        <div>
            {staff.role.idrole === 1 ? children : <Navigate to="/login" />}
        </div>
    );
};
