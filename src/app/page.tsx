import MainApp from "@/app/MainApp";
import PlatformSelect from "@/components/UI/PlatformSelect";
import MainPanel from "@/components/UI/MainPanel";
import { useAppContext } from "./AppContext";
import { Station } from "./type";

const Page = () => {
    return (
        <main>
            <MainPanel />
            <PlatformSelect />
            <MainApp />
        </main>
    );
};

export default Page;
