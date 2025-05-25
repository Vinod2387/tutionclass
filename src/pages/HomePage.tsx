import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedCourses } from '../components/home/FeaturedCourses';
import { StatsSection } from '../components/home/StatsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { AnnouncementsSection } from '../components/home/AnnouncementsSection';
import { CtaSection } from '../components/home/CtaSection';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedCourses />
      <StatsSection />
      <TestimonialsSection />
      <AnnouncementsSection />
      <CtaSection />
    </div>
  );
};