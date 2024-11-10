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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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

  const faqs = [
    {
      question: 'What is the main purpose of ${projectName}?',
      answer:
        '${projectName} is designed to help citizens easily access and apply for government schemes by providing personalized recommendations and a streamlined application process.',
    },
    {
      question: 'How do I start using ${projectName}?',
      answer:
        'Simply sign up on our platform, provide your details, and let our AI guide you through discovering eligible schemes and completing applications.',
    },
    {
      question: 'Can I trust ${projectName} with my personal data?',
      answer:
        'Yes, we use advanced encryption and follow strict privacy policies to ensure your data is secure and confidential at all times.',
    },
    {
      question: 'How often is the scheme information updated?',
      answer:
        'We regularly update our database to include the latest government schemes, ensuring you have access to the most current opportunities.',
    },
    {
      question: 'What if I encounter issues while using ${projectName}?',
      answer:
        'Our support team is available to assist you with any issues or questions. You can reach out to us through the contact form on our website.',
    },
    {
      question: 'Is there a mobile app for ${projectName}?',
      answer:
        'Currently, ${projectName} is accessible via our website, but we are working on developing a mobile app for even more convenience.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn how our platform helps you access government schemes efficiently and securely.`}
        />
      </Head>
      <WebSiteHeader
        projectName={'Ai driven system to automate government schemes'}
        pages={pages}
      />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Ai driven system to automate government schemes'}
          image={['FAQ section illustration']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about accessing government schemes with ${projectName}. We're here to help you every step of the way.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'Ai driven system to automate government schemes'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Ai driven system to automate government schemes'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer support team image']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have questions or need help? Contact us anytime, and our team will respond promptly to assist you with your inquiries.`}
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
