import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Briefcase } from 'lucide-react';

const stats = [
  {
    id: 1,
    name: 'Active Students',
    value: '5,000+',
    icon: <Users className="h-8 w-8 text-primary-500" />,
    description: 'Students currently enrolled in our courses',
  },
  {
    id: 2,
    name: 'Expert Instructors',
    value: '50+',
    icon: <Briefcase className="h-8 w-8 text-primary-500" />,
    description: 'Industry professionals and academic experts',
  },
  {
    id: 3,
    name: 'Courses Offered',
    value: '100+',
    icon: <BookOpen className="h-8 w-8 text-primary-500" />,
    description: 'Courses across various disciplines and levels',
  },
  {
    id: 4,
    name: 'Success Rate',
    value: '95%',
    icon: <Award className="h-8 w-8 text-primary-500" />,
    description: 'Students achieving their learning goals',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-secondary-900 sm:text-4xl">
            EduPrime by the Numbers
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-secondary-500">
            Our growth and achievements over the years
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="bg-secondary-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              variants={{
                hidden: { scale: 0.9, opacity: 0 },
                visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
              }}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-primary-600">{stat.value}</h3>
              <p className="text-lg font-medium text-secondary-900 mt-2">{stat.name}</p>
              <p className="mt-1 text-secondary-500 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};