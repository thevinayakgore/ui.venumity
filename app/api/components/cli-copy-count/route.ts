// app/api/components/cli-copy-count/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store (will reset on server restart)
const copyCounts = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const { componentId } = await request.json();
    
    if (!componentId) {
      return NextResponse.json({ error: 'Component ID required' }, { status: 400 });
    }

    // Get the origin/referer of the request
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');
    
    // Check if the request comes from your main site
    const allowedOrigin = 'https://ui.venumity.com';
    const isFromMainSite = referer?.startsWith(allowedOrigin) || origin === allowedOrigin;
    
    // Only count if request comes from main site
    if (isFromMainSite) {
      const currentCount = copyCounts.get(componentId) || 0;
      const newCount = currentCount + 1;
      copyCounts.set(componentId, newCount);
      return NextResponse.json({ copyCount: newCount });
    }
    
    // Return current count without incrementing for other origins
    const currentCount = copyCounts.get(componentId) || 0;
    return NextResponse.json({ copyCount: currentCount });
    
  } catch (error) {
    console.error('Error updating copy count:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const componentId = searchParams.get('componentId');
    
    if (!componentId) {
      return NextResponse.json({ error: 'Component ID required' }, { status: 400 });
    }

    const copyCount = copyCounts.get(componentId) || 0;
    
    return NextResponse.json({ copyCount });
  } catch (error) {
    console.error('Error fetching copy count:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}