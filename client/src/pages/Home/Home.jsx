import Collections from "../../components/Collections";


const Home = () => {
    const apis = [
        {
            id: 1,
            title: "Python",
            image: "/python.png",
            link: "/allApis/python",
        },
        {
            id: 2,
            title: "JavaScript",
            image: "/javascript.png",
            link: "/allApis/javascript",
        },
        {
            id: 3,
            title: "Java",
            image: "/java.png",
            link: "/allApis/java",
        },
    ];
    return (
        <div className="w-full mt-20 min-h-screen bg-[#1a1c1ff8]">
            <FirstSection />
            <Collections collectionName={"APIs Languages"} apis={apis} />
        </div>
    );
};

export default Home;
