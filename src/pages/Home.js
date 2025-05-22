import Content from '~/components/Layouts/DefaultLayout/Home/Content';
import SilderPromote from '~/components/Layouts/DefaultLayout/Home/SliderPromote';
import Cinema from '../pages/Cinema';
import SliderPR from '~/components/Layouts/DefaultLayout/Home/SilderPR';

function Home() {
    let local = window.location.pathname;
    let pageInfo = null;
    let component;
    switch (local) {
        case '/':
            component = (
                <div>
                    <SliderPR />
                    <Content />
                </div>
            );
            break;
        case '/cinema':
            component = <Cinema />;
            break;
        default:
            component = null;
    }

    return (
        <div className="w-full h-full" style={{ marginTop: 55 }}>
            {pageInfo === null ? (
                <div>
                    {component}
                    <SilderPromote />
                </div>
            ) : (
                <div>{pageInfo}</div>
            )}{' '}
        </div>
    );
}

export default Home;
