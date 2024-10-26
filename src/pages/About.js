import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';
import { Palette, Shield, Smile } from 'lucide-react';
import aboutImage from '../images/about.jpg';

function About() {
  return (
    <div className="about container mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <div className="flex flex-col lg:flex-row items-center justify-center mb-20 max-w-6xl mx-auto">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 flex justify-center lg:justify-end lg:pr-8">
          <div className="relative w-4/5 sm:w-3/5 lg:w-4/5">
            <img
              src={aboutImage}
              alt="Teo, founder of TEBONA"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gray-200 rounded-full z-[-1]"></div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:pl-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal mb-6 sm:mb-8 text-center lg:text-left text-gray-800 dark:text-white">ABOUT US</h1>

          <div className="space-y-6 sm:space-y-8">
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-light">
              TEBONA was started by Teo, who loves making cute, handmade toys. She began sewing when she was just 13 years old and has never stopped. What started as a fun hobby has grown into a business she loves.
            </p>

            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-light">
              Teo has made all kinds of toys over the years. She's sewn characters from movies and TV shows, like SPOCK, and many others. Each toy she makes shows how much she cares about her work and how creative she is.
            </p>

            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-light">
              At TEBONA, we're not just selling toys. We're sharing Teo's love for making things by hand. Our toys are special because they're made with care and imagination. We hope they bring joy and spark creativity in others too.
            </p>
          </div>

          <div className="flex justify-center lg:justify-start space-x-6 mt-8 sm:mt-10">
            <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mb-20 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal mb-12 text-center text-gray-800 dark:text-white">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 dark:bg-gray-600"></div>
          {[
            { year: '2010', event: 'Teo creates her first handmade toy' },
            { year: '2015', event: 'TEBONA is born as an online store' },
            { year: '2018', event: 'TEBONA expands to include custom orders' },
            { year: '2023', event: 'TEBONA celebrates making over 10,000 toys' }
          ].map((item, index) => (
            <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                <div className="font-normal text-gray-600 dark:text-gray-400 text-xl sm:text-2xl mb-2">{item.year}</div>
                <div className="text-gray-800 dark:text-gray-200 text-base sm:text-lg font-light">{item.event}</div>
              </div>
              <div className="w-2/12 flex justify-center">
                <div className="w-4 h-4 bg-gray-500 dark:bg-gray-300 rounded-full border-4 border-white dark:border-gray-800"></div>
              </div>
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl sm:text-4xl font-normal mb-12 text-center text-gray-800 dark:text-white">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Creativity', description: 'We believe in pushing the boundaries of toy design and bringing imagination to life.', icon: Palette },
            { title: 'Quality', description: 'Every toy is made with the utmost care and attention to detail, ensuring durability and safety.', icon: Shield },
            { title: 'Joy', description: 'Our ultimate goal is to bring smiles and happiness to children and adults alike.', icon: Smile }
          ].map((value, index) => (
            <div key={index} className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className="w-20 h-20 mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <value.icon size={40} className="text-gray-600 dark:text-gray-300" />
              </div>
              <h3 className="font-normal text-2xl mb-4 text-gray-800 dark:text-white">{value.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center font-light">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
