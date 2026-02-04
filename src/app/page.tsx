import MainApp from "./MainApp";
import PlatformSelect from "@/components/UI/PlatformSelect";
import MainPanel from "@/components/UI/MainPanel";



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
