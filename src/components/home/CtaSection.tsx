import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const CtaSection: React.FC = () => {
  return (
    <section className="bg-primary-500">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-0 lg:flex-1"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to start your learning journey?
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-primary-100">
            Join thousands of students who are already benefiting from our expert-led courses.
            Sign up today and take the first step toward a brighter future.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex lg:mt-0 lg:flex-shrink-0"
        >
          <div className="inline-flex rounded-md shadow">
            <Link to="/register">
              <Button
                variant="secondary"
                size="lg"
                className="font-bold text-primary-600"
                rightIcon={<ArrowRight size={16} />}
              >
                Get Started
              </Button>
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link to="/courses">
              <Button
                variant="ghost"
                size="lg"
                className="text-white border border-white hover:bg-primary-400"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};