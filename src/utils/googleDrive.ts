/**
 * Helper xử lý ảnh Google Drive sang dạng Direct View ổn định:
 * Ưu tiên https://lh3.googleusercontent.com/d/{FILE_ID} hoặc https://drive.google.com/thumbnail?id={FILE_ID}&sz=w1000
 */
export function getGoogleDriveDirectLink(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();

  // If it's already a direct Google user content link or standard http/https asset link
  if (trimmed.includes('googleusercontent.com/d/') || trimmed.includes('drive.google.com/thumbnail')) {
    return trimmed;
  }

  // Regex extracts Google Drive file ID from various link structures
  const fileIdPatterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of fileIdPatterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  // If it's just the plain 25-50 char alphanumeric ID
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    return `https://lh3.googleusercontent.com/d/${trimmed}`;
  }

  // Return original if no Drive pattern matched (e.g. regular URL or SVG data URI)
  return trimmed;
}

/**
 * Format phone number to clean display: 0903 471 106
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

