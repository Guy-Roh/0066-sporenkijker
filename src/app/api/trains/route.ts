import { NextResponse } from 'next/server';

// Define the shape of the iRail API response
interface IRailDeparture {
    id: string;
    delay: string; // iRail returns this as string seconds
    station: string;
    time: string; // Unix timestamp in seconds
    vehicle: string;
    platform: string;
}

export async function GET(request: Request) {
    // Parse query params to allow dynamic station selection
    const { searchParams } = new URL(request.url);
    const stationId = searchParams.get('stationId') || 'BE.NMBS.008821006';

    const url = `https://api.irail.be/liveboard/?id=${stationId}&format=json`;

    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'sporenkijker/0.2',
                'Accept': 'application/json',
            },
            // Cache control: Revalidate every 30 seconds to avoid stale data
            next: { revalidate: 30 }
        });

        if (!res.ok) {
            return NextResponse.json({ error: `iRail API Error: ${res.status}` }, { status: res.status });
        }

        const data = await res.json();
        const departures: IRailDeparture[] = data.departures?.departure || [];

        // Filter Logic
const nowInSeconds = Math.floor(Date.now() / 1000);

        const relevantTrains = departures.filter((train) => {
            const scheduledTime = parseInt(train.time);
            // Safety check: ensure delay is a number, default to 0
            const delay = parseInt(train.delay || '0'); 
            const realDeparture = scheduledTime + delay;

            // Difference in minutes
            const diffMinutes = (realDeparture - nowInSeconds) / 60;

            return diffMinutes > -1 && diffMinutes <= 15 && train.platform !== '?'; // only upcoming trains with known platforms
        });

        // Keep only earliest train per platform
        const platformMap = new Map<string, IRailDeparture>();
        relevantTrains.forEach((train) => {
            const existing = platformMap.get(train.platform);
            const trainTime = parseInt(train.time) + parseInt(train.delay || '0');
            
            if (!existing) {
                platformMap.set(train.platform, train);
            } else {
                const existingTime = parseInt(existing.time) + parseInt(existing.delay || '0');
                if (trainTime < existingTime) {
                    platformMap.set(train.platform, train);
                }
            }
        });

        const uniqueTrains = Array.from(platformMap.values());

        // Format the output object
        const result = uniqueTrains.map((train) => ({
            destination: train.station,
            platform: train.platform,
            scheduledTime: new Date(parseInt(train.time) * 1000).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
            }),
            delay: parseInt(train.delay || '0') / 60, // Delay in minutes
            vehicleId: train.vehicle
        }));

        return NextResponse.json({ station: stationId, trains: result });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch train data' }, { status: 500 });
    }
}
