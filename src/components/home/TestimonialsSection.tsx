import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

const testimonials = [
  {
    id: 1,
    content: "The quality of education at EduPrime is outstanding. The instructors are knowledgeable and passionate about their subjects. I've learned so much in such a short time.",
    author: {
      name: 'Emily Rodriguez',
      role: 'Computer Science Student',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    rating: 5,
  },
  {
    id: 2,
    content: "I've taken courses from several online platforms, but EduPrime stands out with their structured curriculum and hands-on approach. The support from instructors is exceptional.",
    author: {
      name: 'Michael Chen',
      role: 'Marketing Professional',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    rating: 5,
  },
  {
    id: 3,
    content: "Enrolling at EduPrime was one of the best decisions I've made for my career. The business ethics course completely transformed my approach to leadership.",
    author: {
      name: 'Sophia Williams',
      role: 'Business Manager',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    rating: 4,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-12 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-secondary-900 sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-secondary-500">
            Hear from students who have experienced the EduPrime difference
          </p>
        </div>

        <motion.div 
          className="mt-12 grid gap-8 md:grid-cols-3"
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
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md p-6"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  transition: { duration: 0.5 } 
                },
              }}
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? 'text-accent-500 fill-accent-500'
                        : 'text-secondary-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-secondary-600 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <Avatar 
                  src={testimonial.author.avatar} 
                  alt={testimonial.author.name}
                  size="md"
                />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-secondary-900">
                    {testimonial.author.name}
                  </h3>
                  <p className="text-sm text-secondary-500">
                    {testimonial.author.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};