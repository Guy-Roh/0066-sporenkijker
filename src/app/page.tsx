import MainApp from "@/app/MainApp";
import DataPanel from "@/components/UI/DataPanel";
import MainPanel from "@/components/UI/MainPanel";
import { useAppContext } from "./AppContext";
import { Station } from "./type";

const Page = () => {
    return (
        <main>
            <MainPanel />
            <DataPanel />
            <MainApp />
        </main>
    );
};

export default Page;
