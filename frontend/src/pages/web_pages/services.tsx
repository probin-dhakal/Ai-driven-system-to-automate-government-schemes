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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

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

  const features_points = [
    {
      name: 'Smart Eligibility Check',
      description:
        'Quickly determine your eligibility for various government schemes using our intelligent AI system. This feature ensures you focus on the most relevant opportunities.',
      icon: 'mdiCheckCircle',
    },
    {
      name: 'Seamless Application Process',
      description:
        'Experience a smooth and guided application process with step-by-step instructions. Our platform helps you complete applications accurately and efficiently.',
      icon: 'mdiClipboardCheck',
    },
    {
      name: 'Real-Time Notifications',
      description:
        'Stay informed with real-time updates and notifications about your application status and new scheme opportunities. Never miss an important update again.',
      icon: 'mdiBell',
    },
  ];

  const faqs = [
    {
      question: 'How does ${projectName} help with government schemes?',
      answer:
        '${projectName} simplifies the process by providing personalized scheme recommendations, automating document verification, and guiding you through the application process.',
    },
    {
      question: 'Is there a cost to use ${projectName}?',
      answer:
        'No, ${projectName} is free for users seeking to access government schemes. Our goal is to make these services accessible to everyone.',
    },
    {
      question: 'What types of government schemes can I find?',
      answer:
        'You can find a wide range of schemes, including financial aid, healthcare, education, and more, tailored to your eligibility and needs.',
    },
    {
      question: 'How secure is my data on ${projectName}?',
      answer:
        'We prioritize your data security with advanced encryption and strict privacy policies to ensure your information is safe and confidential.',
    },
    {
      question: 'Can I track my application status?',
      answer:
        'Yes, ${projectName} provides real-time updates and notifications, allowing you to track the status of your applications easily.',
    },
    {
      question: 'What if I need help with the platform?',
      answer:
        "Our support team is available to assist you with any questions or issues. You can contact us through the platform's contact form.",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - Streamline Access to Government Schemes`}</title>
        <meta
          name='description'
          content={`Explore the services offered by our AI-driven platform to simplify your access to government schemes. Discover features, get assistance, and find answers to your questions.`}
        />
      </Head>
      <WebSiteHeader
        projectName={'Ai driven system to automate government schemes'}
        pages={pages}
      />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Ai driven system to automate government schemes'}
          image={['User-friendly service interface']}
          mainText={`Unlock Government Benefits with Ease`}
          subTitle={`Discover how ${projectName} simplifies the process of accessing government schemes. Our services are designed to provide personalized guidance and efficient application processes for citizens.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'Ai driven system to automate government schemes'}
          image={['AI-driven service features']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Services`}
          subTitle={`Discover the innovative features of ${projectName} that make accessing government schemes simple and efficient.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <FaqSection
          projectName={'Ai driven system to automate government schemes'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Your Questions Answered About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Ai driven system to automate government schemes'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact support team image']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need assistance? Contact us anytime, and our team will respond promptly to help you with your inquiries.`}
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
