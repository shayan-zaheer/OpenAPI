import { useRef } from "react";
import PropTypes from "prop-types";

import APIsCard from "./APIsCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Collections = ({ collectionName, apis }) => {
    const collectionRef = useRef(null);

    const apiList = Array.isArray(apis) ? apis : [];

    useGSAP(() => {
        if (!collectionRef.current || apiList.length === 0) return;

        gsap.from(collectionRef.current.children, {
            scrollTrigger: {
                trigger: collectionRef.current,
                start: "top 80%",
            },
            duration: 0.5,
            y: 400,
            stagger: 0.3,
        });
    }, [apiList.length]);

    return (
        <section className="w-full min-h-[500px] relative  bg-[#121315ed] p-10 ">
            <h1 className="text-white text-4xl font-bold border-b-4 inline-block border-blue-500 mb-5 max-sm:text-2xl">
                {collectionName || "API Collection"}
            </h1>
            <div className="w-full h-[350px] rounded-2xl p-5 flex items-center overflow-x-auto overflow-y-hidden bg-[#222528]">
                <div ref={collectionRef} className="flex gap-x-5">
                    {apiList.length > 0 ? (
                        apiList.map((api) => (
                            <APIsCard
                                key={api.id || api._id || Math.random()}
                                api={api}
                            />
                        ))
                    ) : (
                        <div className="text-gray-400 text-center w-full">
                            No APIs available in this collection.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

Collections.propTypes = {
    collectionName: PropTypes.string,
    apis: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            _id: PropTypes.string,
            title: PropTypes.string,
            image: PropTypes.string,
            link: PropTypes.string,
        })
    ),
};

Collections.defaultProps = {
    collectionName: "API Collection",
    apis: [],
};

export default Collections;
