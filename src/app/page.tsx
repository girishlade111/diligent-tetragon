import React from 'react';
import { AboutSafelightIntro } from '@/components/home/AboutSafelightIntro';
import { CareerCreditsSection } from '@/components/home/CareerCreditsSection';
import { DesignCodeToolkit } from '@/components/home/DesignCodeToolkit';
import { LabFilmReel } from '@/components/home/LabFilmReel';
import { PortraitHero } from '@/components/home/PortraitHero';
import { SelectedWorkContactSheet } from '@/components/home/SelectedWorkContactSheet';
import { ServicesGelSection } from '@/components/home/ServicesGelSection';
import { TestimonialsBoard } from '@/components/home/TestimonialsBoard';
import { WorkflowCallSheet } from '@/components/home/WorkflowCallSheet';
import { WritingNotebookPreview } from '@/components/home/WritingNotebookPreview';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactCTA } from '@/components/shared/ContactCTA';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PortraitHero />
        <AboutSafelightIntro />
        <SelectedWorkContactSheet />
        <ServicesGelSection />
        <WorkflowCallSheet />
        <DesignCodeToolkit />
        <CareerCreditsSection />
        <TestimonialsBoard />
        <LabFilmReel />
        <WritingNotebookPreview />
        <ContactCTA />
      </main>
      <SiteFooter takeOverride={1} />
    </>
  );
}
