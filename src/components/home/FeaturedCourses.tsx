import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useAppStore } from '../../store';

export const FeaturedCourses: React.FC = () => {
  const { courses, getCourses, isLoading } = useAppStore();
  
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  // Display at most 3 featured courses
  const featuredCourses = courses.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-secondary-900 sm:text-4xl">
            Featured Courses
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-secondary-500 sm:mt-4">
            Discover our most popular courses taught by expert instructors
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <motion.div 
            className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {featuredCourses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Card hoverable className="h-full flex flex-col">
                  <div className="aspect-w-16 aspect-h-9 w-full">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-secondary-500">
                        <Clock size={16} className="mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center text-sm text-secondary-500">
                        <Users size={16} className="mr-1" />
                        {course.enrollmentCount} students
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-secondary-600 line-clamp-3">
                      {course.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {course.level}
                      </span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                        {course.category}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-secondary-100 mt-auto">
                    <div className="w-full flex justify-between items-center">
                      <div className="text-sm text-secondary-500">
                        Instructor: {course.instructorName}
                      </div>
                      <Link to={`/courses/${course.id}`}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-primary-500 hover:text-primary-700"
                          rightIcon={<ChevronRight size={16} />}
                        >
                          Details
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <Link to="/courses">
            <Button 
              variant="outline"
              size="lg"
              rightIcon={<ChevronRight size={16} />}
            >
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};