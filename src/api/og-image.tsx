// api/og-image.tsx
// Place this file in your project root under /api/og-image.tsx
// Install: npm install @vercel/og

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Fact News';
    const category = searchParams.get('category') || '';
    const date = searchParams.get('date') || '';

    // Truncate title if too long
    const displayTitle = title.length > 120 ? title.substring(0, 120) + '...' : title;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: '#1a1a1a',
            padding: '80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: '#FF6B35',
                display: 'flex',
              }}
            >
              FACT NEWS
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '1040px',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {/* Category Badge */}
            {category && (
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#FF6B35',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: 24,
                  fontWeight: '600',
                  width: 'fit-content',
                }}
              >
                {category}
              </div>
            )}

            {/* Title */}
            <div
              style={{
                fontSize: 58,
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {displayTitle}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: '#888',
                display: 'flex',
              }}
            >
              {date || 'www.fact-news.info'}
            </div>
            <div
              style={{
                fontSize: 24,
                color: '#FF6B35',
                display: 'flex',
              }}
            >
              Azərbaycan və Dünya Xəbərləri
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}