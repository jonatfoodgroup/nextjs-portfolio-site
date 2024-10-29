"use client";
import React from 'react';
import Header from './Header';
import Topbar from './Topbar';
import HeroSection from './HeroSection';
import Introduction from './Introduction';
import ImageGrid from './ImageGrid';
import FeatureSection from './FeatureSection';
import Callout from './Callout';
import GetStarted from './GetStarted';
import Carousel from './Carousel';

const StandardView = ({
    content = null
}) => {
    if (!content) null;
    return (
        <div>
            <Topbar content={content.topbar} />
            <Header content={content.header} />
            <HeroSection content={content.hero} />
            <Introduction content={content.introduction} />
            <ImageGrid content={content.image_grid} />
            <FeatureSection content={content.feature_section} />
            
            <Callout content={content.callout} />
            <GetStarted content={content.get_started} />
            <Carousel content={content.carousel} />
        </div>
    );
    }

    export default StandardView;