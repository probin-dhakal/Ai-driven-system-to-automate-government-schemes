import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Ai driven system to automate government schemes';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/contact',
      label: 'contact',
    },
  ];

  const features_points = [
    {
      name: 'Personalized Scheme Discovery',
      description:
        'Automatically discover government schemes tailored to your needs and eligibility. Save time and effort by accessing only the most relevant options.',
      icon: 'mdiMagnify',
    },
    {
      name: 'Automated Document Verification',
      description:
        'Easily upload and verify documents with our AI-powered system. Ensure accuracy and speed in your application process without the hassle of manual checks.',
      icon: 'mdiFileCheck',
    },
    {
      name: 'Guided Application Process',
      description:
        'Navigate the application process with step-by-step guidance. Track your progress and receive notifications to stay informed and on schedule.',
      icon: 'mdiProgressCheck',
    },
  ];

  const faqs = [
    {
      question: 'How does ${projectName} determine my eligibility for schemes?',
      answer:
        '${projectName} uses AI to analyze your provided information and documents to match you with schemes you are eligible for, ensuring you only see relevant options.',
    },
    {
      question: 'Is my personal information secure on ${projectName}?',
      answer:
        'Yes, we prioritize your privacy and security. All data is encrypted and stored securely, and we comply with data protection regulations to safeguard your information.',
    },
    {
      question: 'Can I apply for multiple schemes at once?',
      answer:
        'Absolutely! ${projectName} allows you to apply for multiple schemes simultaneously, streamlining the process and saving you time.',
    },
    {
      question: 'What if I need help with the application process?',
      answer:
        'Our platform offers step-by-step guidance and an AI assistant to help you through the application process. You can also contact our support team for additional assistance.',
    },
    {
      question: 'Are there any fees for using ${projectName}?',
      answer:
        '${projectName} is free to use for citizens seeking to access government schemes. We aim to make the process as accessible as possible for everyone.',
    },
    {
      question: 'How often are new schemes added to the platform?',
      answer:
        'We regularly update our database with new schemes as they become available, ensuring you have access to the latest opportunities.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Access Government Schemes Easily with Our AI-Driven Platform`}</title>
        <meta
          name='description'
          content={`Discover and apply for government schemes effortlessly with our AI-driven platform. Streamline your access to benefits with personalized guidance and automated processes.`}
        />
      </Head>
      <WebSiteHeader
        projectName={'Ai driven system to automate government schemes'}
        pages={pages}
      />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Ai driven system to automate government schemes'}
          image={['Mother exploring government schemes']}
          mainText={`Empower Your Access to Government Schemes`}
          subTitle={`Discover eligible government schemes effortlessly with our AI-driven platform. Streamline your application process and secure benefits with ease using ${projectName}.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'Ai driven system to automate government schemes'}
          image={['AI-driven platform interface']}
          withBg={1}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Explore how ${projectName} simplifies access to government schemes with innovative features designed for your convenience.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'Ai driven system to automate government schemes'}
          image={['Team working on platform']}
          mainText={`Transforming Access to Government Benefits`}
          subTitle={`At ${projectName}, we are dedicated to empowering citizens by simplifying the process of accessing government schemes. Our AI-driven platform ensures that everyone, regardless of location, can easily discover and apply for the benefits they deserve.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <FaqSection
          projectName={'Ai driven system to automate government schemes'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter
        projectName={'Ai driven system to automate government schemes'}
        pages={pages}
      />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
