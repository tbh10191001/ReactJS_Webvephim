import Footer from '~/components/Layouts/Footer';
import Header from '~/components/Layouts/Header';
import Content from './Content';

function Login() {
    return (
        <div className="w-full h-full">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default Login;
