import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes/public';
import { DefaultLayout } from './components/Layouts';
import CinemaCity from './components/Layouts/DefaultLayout/Cinema/CinemaCity';
import LayoutCustomer from './components/Layouts/DefaultLayout/Customer/Layout';
import Footer from './components/Layouts/DefaultLayout/Footer';
import Header from './components/Layouts/DefaultLayout/Header';
import LayoutStaff from './components/Layouts/DefaultLayout/Staff/Layout';
import CheckTicket from './pages/CheckTicket';
import Cinema from './pages/Cinema';
import Film from './pages/Film';
import Ticket from './pages/Ticket';
import { PrivateCustomer } from './routes/routeCustomer';
import { PrivateStaff } from './routes/routeStaff';

function App() {
    return (
        <BrowserRouter>
            <div className="">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route
                        path="/cinema"
                        element={
                            <>
                                <Header />
                                <Cinema />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/customer/information"
                        element={
                            <PrivateCustomer>
                                <LayoutCustomer />
                            </PrivateCustomer>
                        }
                    />
                    <Route
                        path="/customer/account"
                        element={
                            <PrivateCustomer>
                                <LayoutCustomer />
                            </PrivateCustomer>
                        }
                    />
                    <Route
                        path="/customer/order"
                        element={
                            <PrivateCustomer>
                                <LayoutCustomer />
                            </PrivateCustomer>
                        }
                    />
                    <Route
                        path="/staff/information"
                        element={
                            <PrivateStaff>
                                <LayoutStaff />
                            </PrivateStaff>
                        }
                    />
                    <Route
                        path="/staff/statistical/room"
                        element={
                            <PrivateStaff>
                                <LayoutStaff />
                            </PrivateStaff>
                        }
                    />
                    <Route
                        path="/staff/customer/account"
                        element={
                            <PrivateStaff>
                                <LayoutStaff />
                            </PrivateStaff>
                        }
                    />
                    <Route
                        path="/staff/customer/information"
                        element={
                            <PrivateStaff>
                                <LayoutStaff />
                            </PrivateStaff>
                        }
                    />
                    <Route
                        path="/staff/statistical/type"
                        element={
                            <PrivateStaff>
                                <LayoutStaff />
                            </PrivateStaff>
                        }
                    />
                    <Route
                        path="/film/:id"
                        element={
                            <>
                                <Header />
                                <Film />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/cinema/:id"
                        element={
                            <>
                                <Header />
                                <CinemaCity />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/ticket/:id"
                        element={
                            <>
                                <Header />
                                <Ticket />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/checkticket/:mave"
                        element={
                            <>
                                <CheckTicket />
                            </>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
