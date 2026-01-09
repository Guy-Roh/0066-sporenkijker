import { NextResponse } from 'next/server';

export async function GET() {
    const dummyData = {
        "station": "BE.NMBS.008821006",
        "trains": [
            {
                "destination": "Brussels-South/Brussels-Midi",
                "platform": "24",
                "scheduledTime": "17:19",
                "delay": 14,
                "vehicleId": "BE.NMBS.EC9248"
            },
            {
                "destination": "Mol",
                "platform": "6",
                "scheduledTime": "17:24",
                "delay": 0,
                "vehicleId": "BE.NMBS.S332967"
            },
            {
                "destination": "Charleroi-Central",
                "platform": "23",
                "scheduledTime": "17:25",
                "delay": 0,
                "vehicleId": "BE.NMBS.IC2039"
            },
            {
                "destination": "Leuven",
                "platform": "13",
                "scheduledTime": "17:30",
                "delay": 0,
                "vehicleId": "BE.NMBS.IC2917"
            },
            {
                "destination": "Amsterdam CS",
                "platform": "22",
                "scheduledTime": "17:30",
                "delay": 0,
                "vehicleId": "BE.NMBS.EUR9357"
            },
            {
                "destination": "Aarschot",
                "platform": "2",
                "scheduledTime": "17:36",
                "delay": 0,
                "vehicleId": "BE.NMBS.P8282"
            },
            {
                "destination": "Poperinge",
                "platform": "12",
                "scheduledTime": "17:36",
                "delay": 0,
                "vehicleId": "BE.NMBS.IC717"
            }
        ]
    };

    return NextResponse.json(dummyData);
}