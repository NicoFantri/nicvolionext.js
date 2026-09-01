import { NextResponse } from 'next/server';

const OPENPANEL_API_URL = 'https://api.openpanel.dev';
const OPENPANEL_CLIENT_ID = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID;
const OPENPANEL_SECRET_ID = process.env.OPENPANEL_API_SECRET_ID;
const OPENPANEL_PROJECT_ID = process.env.OPENPANEL_PROJECT_ID;
export async function GET() {
  try {
    // Bail out immediately if credentials are not configured
    if (!OPENPANEL_CLIENT_ID || !OPENPANEL_SECRET_ID || !OPENPANEL_PROJECT_ID) {
      return NextResponse.json({ totalUV: '-', dailyUV: '-' });
    }

    // 获取总访问数据
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s max

    const response = await fetch(`${OPENPANEL_API_URL}/export/events?projectId=${OPENPANEL_PROJECT_ID}&event=screen_view`, {
      headers: {
        'openpanel-client-id': OPENPANEL_CLIENT_ID!,
        'openpanel-client-secret': OPENPANEL_SECRET_ID!,
      },
      signal: controller.signal,
    });


    // console.log('response: ', response)
    if (!response.ok) {
      throw new Error('Failed to fetch visit stats');
    }


    const data = await response.json();
    // console.log('data: ', data)
    const totalUV = data?.meta?.totalCount;
    clearTimeout(timeout);

    // 获取今日访问数据
    // 昨天的 yyyy-MM-dd
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // 今天的 yyyy-MM-dd
    const todayStr = today.toISOString().split('T')[0];
    const controller2 = new AbortController();
    const timeout2 = setTimeout(() => controller2.abort(), 5000);

    const todayResponse = await fetch(`${OPENPANEL_API_URL}/export/events?projectId=${OPENPANEL_PROJECT_ID}&event=screen_view&start=${yesterdayStr}&end=${todayStr}`, {
      headers: {
        'openpanel-client-id': OPENPANEL_CLIENT_ID!,
        'openpanel-client-secret': OPENPANEL_SECRET_ID!,
      },
      signal: controller2.signal,
    });
    clearTimeout(timeout2);

    // console.log('todayResponse: ', todayResponse)
    if (!todayResponse.ok) {
      throw new Error('Failed to fetch visit stats');
    }

    const todayData = await todayResponse.json();
    // console.log('todayData: ', todayData)
    const dailyUV = todayData?.meta?.totalCount;

    return NextResponse.json({
      totalUV,
      dailyUV,
    });
  } catch (error) {
    // console.error('Error fetching visit stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visit stats' },
      { status: 500 }
    );
  }
}