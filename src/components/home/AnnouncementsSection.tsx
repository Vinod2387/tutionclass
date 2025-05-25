import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatDate } from '../../lib/utils';
import { useAppStore } from '../../store';

export const AnnouncementsSection: React.FC = () => {
  const { announcements, getAnnouncements, isLoading } = useAppStore();

  useEffect(() => {
    getAnnouncements();
  }, [getAnnouncements]);

  // Only show first 3 announcements on homepage
  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <section className="py-12 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-secondary-900">
              Announcements
            </h2>
            <p className="mt-2 text-lg text-secondary-500">
              Stay updated with the latest news and announcements
            </p>
          </div>
          <Bell className="h-8 w-8 text-primary-500" />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {recentAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hoverable>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl text-secondary-900">
                        {announcement.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-secondary-500">
                        <Calendar size={16} className="mr-1" />
                        {formatDate(announcement.date)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary-600">
                      {announcement.content}
                    </p>
                    <div className="mt-4 text-sm text-secondary-500">
                      Posted by: {announcement.authorName}
                      {announcement.courseId && (
                        <span className="ml-2 text-primary-500">
                          Course related
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};