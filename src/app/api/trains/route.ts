import { IRailDeparture } from '@/app/type';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const stationId = searchParams.get('stationId') || 'BE.NMBS.008821006';

    const url = `https://api.irail.be/liveboard/?id=${stationId}&format=json`;

    try {

        const res = await fetch(url, {
            headers: {
                'User-Agent': 'sporenkijker/0.88',
                'Accept': 'application/json',
            },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            return NextResponse.json({ error: `iRail API Error: ${res.status}` }, { status: res.status });
        }

        const data = await res.json();

        const departures: IRailDeparture[] = data.departures?.departure || [];
        const nowInSeconds = Math.floor(Date.now() / 1000);

        const relevantTrains = departures.filter((train) => {
            const scheduledTime = parseInt(train.time);
            const delay = parseInt(train.delay || '0');
            const realDeparture = scheduledTime + delay;
            const diffMinutes = (realDeparture - nowInSeconds) / 60;

            return diffMinutes > -1 && diffMinutes <= 15 && train.platform !== '?';
        });

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

        const result = uniqueTrains.map((train) => ({
            destination: train.station,
            platform: train.platform,
            scheduledTime: new Date(parseInt(train.time) * 1000).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Brussels' 
            }),
            delay: parseInt(train.delay || '0') / 60,
            vehicleId: train.vehicle
        }));
        console.log("Train data response:", result);

        return new Response(JSON.stringify({ station: stationId, trains: result }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                // This tells the browser: "Don't save this locally, always ask for new data"
                'Cache-Control': 'no-store, max-age=0' 
            }
        });

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}