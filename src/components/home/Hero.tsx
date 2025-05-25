import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-28">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="sm:text-center lg:text-left"
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-secondary-900 sm:text-5xl md:text-6xl">
                <span className="block">Elevate your</span>{' '}
                <span className="block text-primary-500">learning journey</span>
              </h1>
              <p className="mt-3 text-base text-secondary-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join a community of dedicated learners and expert instructors. 
                Discover courses designed to propel your career forward and unlock your full potential.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    rightIcon={<ArrowRight size={16} />}
                  >
                    Explore Courses
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Meet Our Instructors
                  </Button>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden lg:block">
        <motion.img
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Students learning"
        />
      </div>
    </div>
  );
};