import { useCallback } from 'react';

interface CloudinaryUploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

// Cloudinary configuration
const CLOUD_NAME = 'dx5szhyyt';
const UPLOAD_PRESET = 'profile'; // Unsigned upload preset from Cloudinary

export function useCloudinaryUpload({ onSuccess, onError }: CloudinaryUploadOptions = {}) {
  const openUploadWidget = useCallback(() => {
    // @ts-ignore - Cloudinary widget is loaded via script tag
    if (typeof window.cloudinary === 'undefined') {
      console.error('Cloudinary widget not loaded');
      onError?.(new Error('Cloudinary widget not loaded'));
      return;
    }

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFileSize: 10000000, // 10MB
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        cropping: true,
        croppingAspectRatio: 1,
        croppingShowDimensions: true,
        showSkipCropButton: true,
        folder: 'profile_uploads',
        resourceType: 'image',
        theme: 'minimal',
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#10B981',
            tabIcon: '#10B981',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#10B981',
            action: '#10B981',
            inactiveTabIcon: '#9CA3AF',
            error: '#EF4444',
            inProgress: '#10B981',
            complete: '#10B981',
            sourceBg: '#F9FAFB',
          },
        },
      },
      (error: any, result: any) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          onError?.(error);
          return;
        }

        if (result.event === 'success') {
          const imageUrl = result.info.secure_url;
          console.log('Upload successful:', imageUrl);
          onSuccess?.(imageUrl);
        }
      }
    );

    widget.open();
  }, [onSuccess, onError]);

  return { openUploadWidget };
}
