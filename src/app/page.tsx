import MainApp from "./MainApp";
import PlatformSelect from "@/components/UI/PlatformSelect";
import MainPanel from "@/components/UI/MainPanel";
import CanvasLoader from "@/components/UI/CanvasLoader";



const Page = () => {
    return (
        <main>
            <CanvasLoader />
            <MainPanel />
            <PlatformSelect />
            <MainApp />
        </main>
    );
};

export default Page;
