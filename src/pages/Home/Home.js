import Content from './ContentHome';
import Header from '../../components/Layouts/Header';
import { useState } from 'react';
import Footer from '~/components/Layouts/Footer';
import SliderPR from './SilderPR';
import SilderPromote from './SliderPromote';

function Home() {
    return (
        <div className="w-full h-full" style={{ marginTop: 55 }}>
            <Header />
            <SliderPR />
            <Content />
            <SilderPromote />
            <Footer />
        </div>
    );
}

export default Home;
