import { useAppContext } from "@/app/AppContext";
import testData from "@/data/testData.json";

const Trains = () => {
    const { activeStation, nodes } = useAppContext();

    return (
        <>
            {testData.testStations.map((station) => {
                const nodeKey = `station_${station.number}`;
                const stationNode = nodes ? nodes[nodeKey] : null;

                if (!stationNode) return null;

                const isActive = activeStation?.number === station.number;
                const color = isActive ? "#3b82f6" : "#f97316";

                return (
                    <mesh
                        key={station.number}
                        position={[
                            stationNode.position.x,
                            stationNode.position.y,
                            stationNode.position.z,
                        ]}
                    >
                        <sphereGeometry args={[0.5, 16, 16]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                );
            })}
        </>
    );
};

export default Trains;
