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
      question: 'How can I sign up for ${projectName}?',
      answer:
        "You can sign up by visiting our website and clicking on the 'Sign Up' button. Follow the instructions to create your account and start exploring government schemes.",
    },
    {
      question: 'What information do I need to provide?',
      answer:
        "To get personalized scheme recommendations, you'll need to provide basic personal information and any relevant documents for verification.",
    },
    {
      question: 'Is there a mobile version of ${projectName}?',
      answer:
        'Currently, ${projectName} is accessible via our website. We are working on a mobile app to enhance accessibility and convenience.',
    },
    {
      question: "How do I know which schemes I'm eligible for?",
      answer:
        '${projectName} uses AI to analyze your information and match you with schemes you are eligible for, ensuring you only see relevant options.',
    },
    {
      question: 'Can I contact support if I have issues?',
      answer:
        'Yes, our support team is available to assist you with any issues or questions. You can reach out through the contact form on our website.',
    },
    {
      question: 'How secure is my data on ${projectName}?',
      answer:
        'We prioritize your data security with advanced encryption and strict privacy policies to ensure your information is safe and confidential.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Get in touch with the ${projectName} team for any inquiries or support. We're here to help you access government schemes efficiently.`}
        />
      </Head>
      <WebSiteHeader
        projectName={'Ai driven system to automate government schemes'}
        pages={pages}
      />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Ai driven system to automate government schemes'}
          image={['Support team ready to help']}
          mainText={`Connect with ${projectName} Support Team`}
          subTitle={`We're here to assist you with any questions or support you need. Reach out to us and let ${projectName} help you access government schemes effortlessly.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'Ai driven system to automate government schemes'}
          design={FaqDesigns.SPLIT_LIST || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Ai driven system to automate government schemes'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact form submission image']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`We're available to assist you with any inquiries or support needs. Contact us anytime, and our team will respond promptly to help you.`}
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
