import { NextResponse } from 'next/server';
import data from "./data.json"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const stationId = searchParams.get('stationId');

    const stationData = data.find(station => station.station === stationId);
    if (stationData) {
        return NextResponse.json(stationData);
    }
    return NextResponse.json({ error: 'Station not found' }, { status: 404 });
}