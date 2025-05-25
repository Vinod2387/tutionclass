import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded bg-primary-500 text-white flex items-center justify-center">
                <span className="font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold text-white">EduPrime</span>
            </div>
            <p className="text-secondary-300 text-base">
              Empowering minds through quality education since 2010. Our mission is to provide accessible, 
              innovative learning experiences for everyone.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-secondary-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-secondary-200 tracking-wider uppercase">
                  Courses
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/courses/category/computer-science" className="text-base text-secondary-300 hover:text-white">
                      Computer Science
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses/category/mathematics" className="text-base text-secondary-300 hover:text-white">
                      Mathematics
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses/category/marketing" className="text-base text-secondary-300 hover:text-white">
                      Marketing
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses/category/physics" className="text-base text-secondary-300 hover:text-white">
                      Physics
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses/category/business" className="text-base text-secondary-300 hover:text-white">
                      Business
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-secondary-200 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/help" className="text-base text-secondary-300 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-base text-secondary-300 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-base text-secondary-300 hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-base text-secondary-300 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-base text-secondary-300 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-secondary-200 tracking-wider uppercase">
                  Contact Us
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex">
                    <MapPin className="h-6 w-6 text-secondary-400 mr-2" />
                    <span className="text-secondary-300">123 Education Street, Knowledge City, 12345</span>
                  </li>
                  <li className="flex">
                    <Phone className="h-6 w-6 text-secondary-400 mr-2" />
                    <span className="text-secondary-300">+1 (555) 123-4567</span>
                  </li>
                  <li className="flex">
                    <Mail className="h-6 w-6 text-secondary-400 mr-2" />
                    <span className="text-secondary-300">info@eduprime.edu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-secondary-700 pt-8">
          <p className="text-base text-secondary-400 text-center">
            &copy; {currentYear} EduPrime Institute. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};