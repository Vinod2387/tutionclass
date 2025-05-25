import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Users, Book } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { Course } from '../types';

export const CoursesPage: React.FC = () => {
  const { courses, getCourses, isLoading } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  useEffect(() => {
    let result = [...courses];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(term) || 
          course.description.toLowerCase().includes(term) ||
          course.instructorName.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(course => course.category === selectedCategory);
    }
    
    // Filter by level
    if (selectedLevel) {
      result = result.filter(course => course.level === selectedLevel);
    }
    
    setFilteredCourses(result);
  }, [courses, searchTerm, selectedCategory, selectedLevel]);

  // Extract unique categories and levels for filters
  const categories = Array.from(new Set(courses.map(course => course.category)));
  const levels = Array.from(new Set(courses.map(course => course.level)));

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleLevelFilter = (level: string) => {
    setSelectedLevel(selectedLevel === level ? null : level);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedLevel(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-secondary-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl font-bold text-secondary-900" 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Our Courses
          </motion.h1>
          <motion.p 
            className="mt-4 text-xl text-secondary-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover a wide range of courses designed to help you achieve your learning goals
          </motion.p>
        </div>

        {/* Search and filters */}
        <motion.div 
          className="mt-8 bg-white shadow rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search courses by name, description or instructor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                leftIcon={<Filter size={16} />}
                className="mb-2 md:mb-0"
              >
                Filters
              </Button>
              {selectedCategory || selectedLevel ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={resetFilters}
                  className="text-error-500 hover:text-error-700"
                >
                  Clear filters
                </Button>
              ) : null}
            </div>
          </div>

          <div className="mt-4">
            <div>
              <h3 className="text-sm font-medium text-secondary-700 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      selectedCategory === category 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-medium text-secondary-700 mb-2">Level</h3>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelFilter(level)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      selectedLevel === level 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <motion.div 
            className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCourses.map((course) => (
              <motion.div 
                key={course.id} 
                variants={itemVariants}
              >
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
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {course.level}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                        {course.category}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-secondary-100 mt-auto">
                    <div className="w-full">
                      <div className="text-sm text-secondary-500 mb-3">
                        Instructor: {course.instructorName}
                      </div>
                      <Link to={`/courses/${course.id}`} className="w-full">
                        <Button 
                          variant="primary" 
                          size="sm"
                          className="w-full"
                          rightIcon={<Book size={16} />}
                        >
                          View Course
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No results */}
        {!isLoading && filteredCourses.length === 0 && (
          <div className="mt-12 text-center py-12 bg-white rounded-lg shadow-sm">
            <Book size={48} className="mx-auto text-secondary-300" />
            <h3 className="mt-4 text-xl font-medium text-secondary-900">No courses found</h3>
            <p className="mt-1 text-secondary-500">Try adjusting your search or filters</p>
            <Button 
              variant="outline" 
              size="sm"
              className="mt-4"
              onClick={resetFilters}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};