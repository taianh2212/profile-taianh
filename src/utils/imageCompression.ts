/**
 * Compress and resize an image file before uploading
 * @param file - The original image file
 * @param maxSizeMB - Maximum size in MB (default: 1MB)
 * @param maxWidthOrHeight - Maximum width or height in pixels (default: 1920px)
 * @returns Compressed image as a Blob
 */
export async function compressImage(
    file: File,
    maxSizeMB: number = 1,
    maxWidthOrHeight: number = 1920
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Calculate new dimensions while maintaining aspect ratio
                if (width > height) {
                    if (width > maxWidthOrHeight) {
                        height = (height * maxWidthOrHeight) / width;
                        width = maxWidthOrHeight;
                    }
                } else {
                    if (height > maxWidthOrHeight) {
                        width = (width * maxWidthOrHeight) / height;
                        height = maxWidthOrHeight;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }
                
                // Draw image with high quality
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);
                
                // Try different quality levels to meet size requirement
                const tryCompress = (quality: number) => {
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('Failed to compress image'));
                                return;
                            }
                            
                            const sizeMB = blob.size / 1024 / 1024;
                            
                            // If size is acceptable or quality is already very low, resolve
                            if (sizeMB <= maxSizeMB || quality <= 0.1) {
                                console.log(`Compressed: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${sizeMB.toFixed(2)}MB (quality: ${quality})`);
                                resolve(blob);
                            } else {
                                // Try with lower quality
                                tryCompress(quality - 0.1);
                            }
                        },
                        'image/jpeg',
                        quality
                    );
                };
                
                // Start with high quality
                tryCompress(0.85);
            };
            
            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };
            
            img.src = e.target?.result as string;
        };
        
        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };
        
        reader.readAsDataURL(file);
    });
}

/**
 * Convert a Blob to File
 */
export function blobToFile(blob: Blob, fileName: string): File {
    return new File([blob], fileName, { type: blob.type });
}
