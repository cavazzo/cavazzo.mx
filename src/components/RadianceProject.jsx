import React, { useRef, useEffect } from "react";

const RadianceProject = () => {
    const projectInfo = useRef();
    const projectWrapper = useRef();
    let counter = 0;
    let updateRate = 10;
    let mouse = {};

    useEffect(() => {
        mouse = {
            _x: 0,
            _y: 0,
            x: 0,
            y: 0,
            updatePosition: function(event) {
                var e = event || window.event;
                this.x = e.clientX - this._x;
                this.y = (e.clientY - this._y) * -1;
            },
            setOrigin: function(e) {
                this._x = e.offsetLeft + Math.floor(e.offsetWidth/2);
                this._y = e.offsetTop + Math.floor(e.offsetHeight/2);
            },
            show: function() { return '(' + this.x + ', ' + this.y + ')'; }
        };
        mouse.setOrigin(projectWrapper.current);
    }, []);

    const updateTransformStyle = function(x, y) {
        const style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        projectInfo.current.style.transform = style;
        projectInfo.current.style.webkitTransform = style;
        projectInfo.current.style.mozTransform = style;
        projectInfo.current.style.msTransform = style;
        projectInfo.current.style.oTransform = style;
    };

    const update = (event) => {
        mouse.updatePosition(event);
        updateTransformStyle(
            (mouse.y / projectInfo.current.offsetHeight/2).toFixed(2),
            (mouse.x / projectInfo.current.offsetWidth/2).toFixed(2)
        );
    }

    const isTimeToUpdate = () => {
        return counter++ % updateRate === 0;
    }

    const onMouseEnterHandler = (event) => {
        update(event);
    }

    const onMouseLeaveHandler = () => {
        projectInfo.current.style = "";
    }

    const onMouseMoveHandler = (event) => {
        if (isTimeToUpdate()) {
            update(event);
        }
    }

    return (
        <div className="flex flex-col w-full h-full items-center px-2 md:px-0 mt-14" id="projects-section" data-offset="85" data-item-section="Projects">
            <div className="mb-10 text-2xl font-bold">Projects</div>
            <div className="hidden lg:flex flex-row justify-center items-start w-full h-full md:w-10/12 mx-auto">
                <div
                    ref={projectWrapper}
                    id="project-wrapper"
                    className="flex justify-center w-3/4 h-full"
                    style={{ perspective: "300px" }}
                    onMouseEnter={(event) => onMouseEnterHandler(event)}
                    onMouseLeave={onMouseLeaveHandler}
                    onMouseMove={(event) => onMouseMoveHandler(event)}
                >
                    <div ref={projectInfo} id="project-info" className="flex w-full h-120 p-2 rounded-md shadow-lg bg-gradient-to-tr from-gray-400 to-gray-700 border border-gray-200 transition-transform duration-300">
                        <img className="absolute right-5 top-5 w-3/4 h-3/4 rounded" src="/project_1.png" alt="radiance" />
                        <div className="flex flex-row w-full h-full">
                            <div className="w-full h-full px-5 pt-3 rounded-md space-y-3 bg-white bg-opacity-60 border border-white border-opacity-25 shadow-sm backdrop-filter backdrop-blur-sm" style={{ clipPath: "polygon(0 0, 100% 90%, 100% 100%, 0% 100%)" }}>
                                <div className="w-full h-full float-right bg-transparent" style={{ shapeOutside: "polygon(0 0, 100% 90%, 100% 0%);" }}></div>
                                <div className="font-extrabold text-3xl text-white">Radiance</div>
                                <div className="block font-extrabold text-sm text-gray-800">Trucks Monitoring system in real time, notifies alerts emited from trucks as SOS, off route, failures, etc. These alerts can be managed by users to do the properly follow with the operatorof the truck.</div>
                                <div className="font-bold text-sm text-violet-800 underline"><a href="https://demo.cavazzo.com.mx/monitoring" target="_blank">https://demo.cavazzo.com.mx/monitoring</a></div>
                                <div className="font-bold text-sm text-violet-800 underline"><a href="https://demo.cavazzo.com.mx/api-monitoring/swagger" target="_blank">https://demo.cavazzo.com.mx/api-monitoring/swagger</a></div>
                                <div className="flex flex-row w-full space-x-3 absolute">
                                    <div className="w-12 h-12 bg-center bg-cover" style={{ backgroundImage: "url(/logo_netcore.png)" }}></div>
                                    <div className="w-12 h-12 bg-center bg-cover" style={{ backgroundImage: "url(/logo_c.png)" }}></div>
                                    <div className="w-12 h-12 bg-center bg-cover" style={{ backgroundImage: "url(/logo_node.png)" }}></div>
                                    <div className="w-12 h-12 bg-center bg-cover" style={{ backgroundImage: "url(/logo_api.png)" }}></div>
                                    <div className="w-12 h-12 bg-center bg-cover" style={{ backgroundImage: "url(/logo_react.png)" }}></div>
                                    <div className="w-12 h-12 bg-center bg-cover" style={{ backgroundImage: "url(/logo_mysql.png)" }}></div>
                                    <div className="w-12 h-12 bg-center bg-cover" style={{ backgroundImage: "url(/logo_web.png)" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex lg:hidden items-center w-10/12 h-full p-5 bg-gradient-to-tr from-gray-400 to-gray-700 rounded-md">
                <div className="flex flex-col items-center mx-auto space-y-5 w-full h-full rounded bg-white bg-opacity-30 border border-white border-opacity-25 shadow-sm backdrop-filter backdrop-blur-sm">
                    <div className="font-extrabold text-3xl text-white mt-8">Radiance</div>
                    <div className="font-bold text-base text-center px-4 md:px-14">Trucks Monitoring system in real time, notifies alerts emited from trucks as SOS, off route, failures, etc. These alerts can be managed by users to do the properly follow with the operatorof the truck.</div>
                    <div className="flex flex-col w-full text-center items-center space-y-1 px-5 sm:px-0">
                        <div className="font-bold text-sm text-violet-800 underline"><a href="https://demo.cavazzo.com.mx/monitoring" target="_blank">https://demo.cavazzo.com.mx/monitoring</a></div>
                        <div className="font-bold text-sm text-violet-800 underline"><a href="https://demo.cavazzo.com.mx/api-monitoring/swagger" target="_blank">https://demo.cavazzo.com.mx/api-monitoring/swagger</a></div>
                    </div>
                    <img className="w-3/4 h-3/4 rounded" src="/project_1.png" alt="web" />
                    <div className="flex flex-wrap md:flex-row w-full gap-3 pb-5 justify-center items-center space-x-3 pt-5">
                        <img className="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="/logo_netcore.png" alt="" />
                        <img className="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="/logo_c.png" alt="" />
                        <img className="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="/logo_node.png" alt="" />
                        <img className="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="/logo_api.png" alt="" />
                        <img className="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="/logo_react.png" alt="" />
                        <img className="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="/logo_mysql.png" alt="" />
                        <img className="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="/logo_web.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RadianceProject;