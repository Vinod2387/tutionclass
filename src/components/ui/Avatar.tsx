import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-full overflow-hidden flex items-center justify-center bg-secondary-100',
          sizes[size],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-600 font-medium">
            {fallback || (alt ? alt.charAt(0).toUpperCase() : 'U')}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  spacing?: 'tight' | 'standard' | 'loose';
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 3, spacing = 'standard', ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const showCount = max > 0 && childrenArray.length > max;
    const visibleAvatars = showCount ? childrenArray.slice(0, max) : childrenArray;
    const overflowCount = childrenArray.length - max;

    const spacingClasses = {
      tight: '-ml-2',
      standard: '-ml-3',
      loose: '-ml-4',
    };

    return (
      <div ref={ref} className={cn('flex', className)} {...props}>
        {visibleAvatars.map((child, index) => (
          <div 
            key={index} 
            className={cn(index !== 0 && spacingClasses[spacing], 'relative')}
          >
            {child}
          </div>
        ))}

        {showCount && (
          <div 
            className={cn(
              spacingClasses[spacing], 
              'relative rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center',
              {
                'h-8 w-8 text-xs': React.isValidElement(visibleAvatars[0]) && visibleAvatars[0].props.size === 'sm',
                'h-10 w-10 text-sm': React.isValidElement(visibleAvatars[0]) && visibleAvatars[0].props.size === 'md',
                'h-12 w-12': React.isValidElement(visibleAvatars[0]) && visibleAvatars[0].props.size === 'lg',
                'h-16 w-16 text-lg': React.isValidElement(visibleAvatars[0]) && visibleAvatars[0].props.size === 'xl',
              }
            )}
          >
            +{overflowCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';