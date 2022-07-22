<script>
    import { onMount } from "svelte";
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faEnvelope, faSpinner } from '@fortawesome/free-solid-svg-icons';
    import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
    import { FontAwesomeIcon } from 'fontawesome-svelte';
    import { goto, metatags } from "@roxi/routify";
    import Skill from "../components/card/Skill.svelte";
    import avatar from "../assets/img/avatar.jpg";

    metatags.title = "Cavazzo";
    library.add(faEnvelope, faSpinner, faLinkedin, faGithub);

    const Skills = [
        {
            img: "logo_c.png",
            name: "C#",
            yearsOfExperience: 6,
            levelOfExperience: 85,
            type: "Languages"
        },
        {
            img: "logo_vb.png",
            name: "Visual Basic",
            yearsOfExperience: 2,
            levelOfExperience: 45,
            type: "Languages"
        },
        {
            img: "logo_php.png",
            name: "PHP",
            yearsOfExperience: 1,
            levelOfExperience: 30,
            type: "Languages"
        },
        {
            img: "logo_sql.png",
            name: "SQL Server 2019",
            yearsOfExperience: 6,
            levelOfExperience: 85,
            type: "Backend"
        },
        {
            img: "logo_postgresql.png",
            name: "PostgreSQL",
            yearsOfExperience: 1,
            levelOfExperience: 45,
            type: "Backend"
        },
        {
            img: "logo_mysql.png",
            name: "MySQL",
            yearsOfExperience: 1,
            levelOfExperience: 40,
            type: "Backend"
        },
        {
            img: "logo_mongo.png",
            name: "MongoDB",
            yearsOfExperience: 1,
            levelOfExperience: 30,
            type: "Backend"
        },
        {
            img: "logo_worker.png",
            name: "Worker Service",
            yearsOfExperience: 3,
            levelOfExperience: 80,
            type: "Backend"
        },
        {
            img: "logo_api.png",
            name: "API's RESTFUL",
            yearsOfExperience: 4,
            levelOfExperience: 90,
            type: "Backend"
        },
        {
            img: "logo_docker.png",
            name: "Docker",
            yearsOfExperience: 1,
            levelOfExperience: 65,
            type: "Backend"
        },
        {
            img: "logo_node.png",
            name: "NodeJS",
            yearsOfExperience: 3,
            levelOfExperience: 70,
            type: "Backend"
        },
        {
            img: "logo_netcore.png",
            name: "Razor Pages",
            yearsOfExperience: 1,
            levelOfExperience: 45,
            type: "Frontend"
        },
        {
            img: "logo_mvc.png",
            name: "MVC",
            yearsOfExperience: 3,
            levelOfExperience: 70,
            type: "Frontend"
        },
        {
            img: "logo_angular.png",
            name: "Angular",
            yearsOfExperience: 1,
            levelOfExperience: 50,
            type: "Frontend"
        },
        {
            img: "logo_react.png",
            name: "React",
            yearsOfExperience: 2,
            levelOfExperience: 70,
            type: "Frontend"
        },
        {
            img: "logo_svelte.png",
            name: "Svelte",
            yearsOfExperience: 1,
            levelOfExperience: 50,
            type: "Frontend"
        },
        {
            img: "logo_web.png",
            name: "HTML, CSS3, Javascript",
            yearsOfExperience: 6,
            levelOfExperience: 90,
            type: "Frontend"
        }
    ];
    let SkillTypes = [];
    let counter = 0;
    let updateRate = 10;
    let mouse = {};
    let projectInfo;
    let name = "";
    let email = "";
    let subjects = [];
    let message = "";
    let sendingMessage = false;

    onMount(() => {
        const projectWrapper = document.getElementById("project-wrapper");
        projectInfo = document.getElementById("project-info");

        Skills.forEach(skill => {
            const type = skill.type;

            if (!SkillTypes.includes(type)) {
                SkillTypes = [
                    ...SkillTypes,
                    type
                ];
            }
        });

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
        mouse.setOrigin(projectWrapper);

        const menuObserver = new IntersectionObserver((entries) => {
            const activeMenuClass = ["text-emerald-500", "border-b-2", "border-emerald-500", "font-bold"];
            const desktopNav = document.getElementById("navbar-desktop");
            const mobileNav = document.getElementById("navbar-mobile");

            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // out
                }
                else {
                    // in
                    cleanMenuActives();
                    const section = entry.target.dataset.itemSection;
                    const buttonDesktop = desktopNav.querySelector(`button[data-section='${section}']`);
                    const liMobile = mobileNav.querySelector(`li[data-section='${section}']`)
                    
                    buttonDesktop.classList.add(...activeMenuClass);
                    liMobile.classList.add("active");
                }
            });

            
        }, {
            threshold: 1
        });

        menuObserver.observe(document.getElementById("home-section"));
        menuObserver.observe(document.getElementById("ob-skills-section"));
        menuObserver.observe(document.getElementById("projects-section"));
        menuObserver.observe(document.getElementById("contact-section"));
    });

    const isTimeToUpdate = () => {
        return counter++ % updateRate === 0;
    }

    const updateTransformStyle = function(x, y) {
        const style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        projectInfo.style.transform = style;
        projectInfo.style.webkitTransform = style;
        projectInfo.style.mozTransform = style;
        projectInfo.style.msTransform = style;
        projectInfo.style.oTransform = style;
    };

    const update = (event) => {
        mouse.updatePosition(event);
        updateTransformStyle(
            (mouse.y / projectInfo.offsetHeight/2).toFixed(2),
            (mouse.x / projectInfo.offsetWidth/2).toFixed(2)
        );
    }

    const onMouseEnterHandler = (event) => {
        update(event);
    }

    const onMouseLeaveHandler = (event) => {
        projectInfo.style = "";
    }

    const onMouseMoveHandler = (event) => {
        console.log(mouse.show());
        if (isTimeToUpdate()) {
            update(event);
        }
    }

    const cleanMenuActives = () => {
        const activeMenuClass = ["text-emerald-500", "border-b-2", "border-emerald-500", "font-bold"];
        const noActiveMenuClass = ["text-gray-600", "hover:text-emerald-500", "transition", "duration-300", "font-semibold"];
        const desktopNav = document.getElementById("navbar-desktop");
        const mobileNav = document.getElementById("navbar-mobile");

        desktopNav.querySelectorAll("button").forEach(bu => {
            bu.classList.remove(...activeMenuClass);
            bu.classList.remove(...noActiveMenuClass);
        });
        mobileNav.querySelectorAll("li").forEach(l => {
            l.classList.remove("active");
        });
    }

    const sendMessage = async () => {
        sendingMessage = true;
            
        try {
            const api_send = `https://api.cavazzo.com.mx/api/contact/notify`;

            if (name != "" && email != "" && subjects.length > 0) {
                const _subjects = subjects.toString();
                const request = await fetch(api_send, {
                    method: "POST",
                    body: JSON.stringify({ name, email, interest: _subjects, message: message }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const response = await request.json();
            }
        } catch (error) {
            console.error(error);
        }
        
        sendingMessage = false;
    }
</script>

<style>
    .gradient-bg {
        fill: url(#header-shape-gradient) #fff;
    }

    #header-shape-gradient {
        --color-stop: #89d4cf;
        --color-bot: #6e45e1;
    }

    .form-check-input:checked {
        background-color: #0d6efd;
        border-color: #0d6efd
    }

    .form-check-input:checked[type=checkbox] {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e")
    }
</style>

<main class="home m-0">
    <div class="flex relative w-full h-full overflow-hidden mb-10" id="home-section" data-item-section="Home">
        <svg class="absolute h-full md:h-auto w-auto md:w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320">
            <defs>
                <linearGradient id="header-shape-gradient" x2="0.35" y2="1">
                    <stop offset="0%" stop-color="var(--color-stop)" />
                    <stop offset="30%" stop-color="var(--color-stop)" />
                    <stop offset="100%" stop-color="var(--color-bot)" />
                  </linearGradient>
              </defs>
            <path class="gradient-bg" fill="#0099ff" fill-opacity=".8" d="M0,224L34.3,224C68.6,224,137,224,206,218.7C274.3,213,343,203,411,208C480,213,549,235,617,250.7C685.7,267,754,277,823,266.7C891.4,256,960,224,1029,218.7C1097.1,213,1166,235,1234,224C1302.9,213,1371,171,1406,149.3L1440,128L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
        </svg>
        <svg class="flex absolute top-96 -left-5 md:left-24 lg:left-40 w-1/5 md:w-1/12 h-40" viewbox="-10 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="
                M 0, 89
                C 0, 18.689999999999998 18.689999999999998, 0 89, 0
                S 178, 18.689999999999998 178, 89
                    159.31, 178 89, 178
                    0, 159.31 0, 89
                " fill="#FADB5F" transform="rotate(21,100,100)">
            </path>
        </svg>
        <svg class="flex absolute top-0 right-0 md:right-24 mr-0 lg:mr-20 w-1/5 md:w-1/12 h-40" viewbox="-10 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="
                M 0, 89
                C 0, 18.689999999999998 18.689999999999998, 0 89, 0
                S 178, 18.689999999999998 178, 89
                    159.31, 178 89, 178
                    0, 159.31 0, 89
                " fill="#FADB5F" transform="rotate(-21,100,100)">
            </path>
        </svg>
        <div class="flex flex-col md:flex-row justify-center w-full h-full md:h-120 mt-10 py-3 px-2 lg:px-16">
            <div class="flex flex-col relative py-8 w-full md:w-3/4 h-full bg-white bg-opacity-30 rounded-md border border-white border-opacity-25 shadow-sm backdrop-filter backdrop-blur-sm">
                <div class="flex flex-col md:flex-row justify-around items-center px-4 w-full h-full">
                    <div class="flex flex-col items-center justify-center p-0 md:p-3 mb-4 md:mb-0 w-40 h-40 md:w-64 md:h-64">
                        <div class="bg-cover bg-no-repeat bg-center rounded-full border-4 border-white w-full h-full" style={`background-image: url("${avatar}")`}></div>
                    </div>
                    <div class="flex flex-col justify-center items-center md:items-start w-full md:w-7/12 h-full text-left">
                        <div class="text-3xl font-bold text-emerald-500">
                            Jesús Cavazos
                        </div>
                        <div class="text-lg text-gray-700 font-bold mb-5">
                            Software developer
                        </div>
                        <div class="leading-relaxed text-base text-gray-600 font-semibold text-center md:text-left px-5 md:px-0">
                            Hi, i'm a passionate developer with <b class="text-violet-600">6 years of experience</b>, currently i'm working at Epicor as SR Product Developer. I also offer services to develop systems independently, such as web pages, APIs to communicate across systems, also i automate processes with Windows tasks or create worker services for Linux/Windows. 
                        </div>
                    </div>
                </div>
                <div class="mt-6 md:mt-0 w-full">
                    <div class="flex justify-center items-center mx-auto">
                        <a class="cursor-pointer" href="https://www.linkedin.com/in/cavazzo" alt="Linkedin" target="_blank">
                            <svg class="mx-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a class="cursor-pointer" href="https://github.com/cavazzo" alt="Github" target="_blank">
                            <svg class="mx-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col w-full h-full px-2 md:px-0" id="skills-section">
        <div class="flex flex-row justify-center relative w-full md:w-10/12 mx-auto mt-5 md:mt-10">
            <div class="flex absolute w-full h-10 -top-3 bg-transparent z-10 border-0 backdrop-filter backdrop-blur-sm"></div>
            <div class="flex absolute w-full h-full" style="background: rgb(255,255,255); background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(209,250,229,1) 30%, rgba(237,233,254,1) 70%, rgba(255,255,255,0) 100%);"></div>
            <div class="flex flex-col justify-center items-center w-full h-full space-y-8 py-8 z-10">
                <div class="flex flex-col text-center items-center justify-center">
                    <div class="text-2xl font-bold">
                        Skills
                    </div>
                    <div class="text-sm text-gray-500 font-bold" id="ob-skills-section" data-item-section="Skills">
                        More than 6 years of experience developing software in the labor market, here I list the technologies that I have used the most.
                    </div>
                </div>
                {#each SkillTypes as skillType}
                    <div class="text-2xl mt-12 font-bold">
                        {skillType}
                    </div>
                    <div class="flex flex-wrap w-3/4 justify-around h-full">
                        {#each Skills.filter(skill => skill.type == skillType) as skill, i}
                            <Skill
                                img="./images/{skill.img}"
                                name={skill.name}
                                yearsOfExperience={skill.yearsOfExperience}
                                levelOfExperience={skill.levelOfExperience}
                                shadowColor={(i + 1) % 2 == 0 ? "shadow-violet-400/20" : "shadow-emerald-400/20"} 
                            />
                        {/each}
                    </div>
                {/each}
            </div>
            <div class="flex absolute w-full h-10 -bottom-3 bg-transparent z-10 border-0 backdrop-filter backdrop-blur-sm"></div>
        </div>
    </div>
    <div class="flex flex-col w-full h-full items-center px-2 md:px-0 mt-14" id="projects-section" data-offset="85" data-item-section="Projects">
        <div class="mb-10 text-2xl font-bold">Projects</div>
        <div class="hidden lg:flex flex-row justify-center items-start w-full h-full md:w-10/12 mx-auto">
            <div
                id="project-wrapper"
                class="flex justify-center w-3/4 h-full"
                style="perspective: 300px"
                on:mouseenter="{(event) => onMouseEnterHandler(event)}"
                on:mouseleave="{onMouseLeaveHandler}"
                on:mousemove="{(event) => onMouseMoveHandler(event)}"
            >
                <div id="project-info" class="flex w-full h-120 p-2 rounded-md shadow-lg bg-gradient-to-tr from-gray-400 to-gray-700 border border-gray-200 transition-transform duration-300">
                    <img class="absolute right-5 top-5 w-3/4 h-3/4 rounded" src="./images/project_1.png" alt="web" />
                    <div class="flex flex-row w-full h-full">
                        <div class="w-full h-full px-5 pt-3 rounded-md space-y-3 bg-white bg-opacity-60 border border-white border-opacity-25 shadow-sm backdrop-filter backdrop-blur-sm" style="clip-path: polygon(0 0, 100% 90%, 100% 100%, 0% 100%);">
                            <div class="w-full h-full float-right bg-transparent" style="shape-outside: polygon(0 0, 100% 90%, 100% 0%);"></div>
                            <div class="font-extrabold text-3xl text-white">Radiance</div>
                            <div class="block font-extrabold text-sm text-gray-800">Trucks Monitoring system in real time, notifies alerts emited from trucks as SOS, off route, failures, etc. These alerts can be managed by users to do the properly follow with the operatorof the truck.</div>
                            <div class="font-bold text-sm text-violet-800 underline"><a href="https://demo.cavazzo.com.mx/monitoring" target="_blank">https://demo.cavazzo.com.mx/monitoring</a></div>
                            <div class="font-bold text-sm text-violet-800 underline"><a href="https://demo.cavazzo.com.mx/api-monitoring/swagger" target="_blank">https://demo.cavazzo.com.mx/api-monitoring/swagger</a></div>
                            <div class="flex flex-row w-full space-x-3 absolute">
                                <div class="w-12 h-12 bg-center bg-cover" style="background-image: url(./images/logo_netcore.png);"></div>
                                <div class="w-12 h-12 bg-center bg-cover" style="background-image: url(./images/logo_c.png);"></div>
                                <div class="w-12 h-12 bg-center bg-cover" style="background-image: url(./images/logo_node.png);"></div>
                                <div class="w-12 h-12 bg-center bg-cover" style="background-image: url(./images/logo_api.png);"></div>
                                <div class="w-12 h-12 bg-center bg-cover" style="background-image: url(./images/logo_react.png);"></div>
                                <div class="w-12 h-12 bg-center bg-cover" style="background-image: url(./images/logo_mysql.png);"></div>
                                <div class="w-12 h-12 bg-center bg-cover" style="background-image: url(./images/logo_web.png);"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex lg:hidden items-center w-10/12 h-full p-5 bg-gradient-to-tr from-gray-400 to-gray-700 rounded-md">
            <div class="flex flex-col items-center mx-auto space-y-5 w-full h-full rounded bg-white bg-opacity-30 border border-white border-opacity-25 shadow-sm backdrop-filter backdrop-blur-sm">
                <div class="font-extrabold text-3xl text-white mt-8">Radiance</div>
                <div class="font-bold text-base text-center px-4 md:px-14">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eligendi corrupti laborum dignissimos aperiam ut fugiat omnis, deserunt maiores facilis architecto doloremque nam minus at amet eos adipisci quam alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor impedit architecto ducimus autem id nostrum necessitatibus nihil hic adipisci. Quas earum deserunt maiores suscipit vel, neque deleniti blanditiis ducimus veniam.</div>
                <div class="flex flex-col w-full text-center items-center space-y-1 px-5 sm:px-0">
                    <div class="font-bold text-sm text-violet-800 underline"><a href="https://demo.cavazzo.com.mx/monitoring" target="_blank">https://demo.cavazzo.com.mx/monitoring</a></div>
                    <div class="font-bold text-sm text-violet-800 underline"><a href="https://demo.cavazzo.com.mx/api-monitoring/swagger" target="_blank">https://demo.cavazzo.com.mx/api-monitoring/swagger</a></div>
                </div>
                <img class="w-3/4 h-3/4 rounded" src="./images/project_1.png" alt="web" />
                <div class="flex flex-wrap md:flex-row w-full gap-3 pb-5 justify-center items-center space-x-3 pt-5">
                    <img class="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="./images/logo_netcore.png" alt="" />
                    <img class="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="./images/logo_c.png" alt="" />
                    <img class="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="./images/logo_node.png" alt="" />
                    <img class="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="./images/logo_api.png" alt="" />
                    <img class="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="./images/logo_react.png" alt="" />
                    <img class="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="./images/logo_mysql.png" alt="" />
                    <img class="w-1/6 h-1/6 sm:w-16 sm:h-16 md:w-12 md:h-12" src="./images/logo_web.png" alt="" />
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col w-full h-full items-center px-2 md:px-0 mt-14 mb-20" id="contact-section" data-offset="85" data-item-section="Contact">
        <div class="mb-10 text-2xl font-bold">Contact information</div>
        <div class="flex flex-col md:flex-row w-8/12 h-full items-stretch rounded shadow-md shadow-gray-300 border border-gray-300">
            <div class="flex flex-col w-full md:w-5/12 rounded-l-md p-2.5">
                <div class="flex flex-col w-full h-full pb-8 md:pb-0 px-8 rounded-lg bg-gradient-to-t to-emerald-500 from-emerald-300">
                    <div class="font-bold text-white text-center lg:text-left text-xl lg:text-2xl mt-10">How can i help you?</div>
                    <div class="font-bold text-white text-center lg:text-left text-opacity-80 mt-2 text-sm">Fill up the form and i will get back to you within 24 hours.</div>
                    <div class="flex flex-row w-full mt-10 text-sm lg:text-lg space-x-2">
                        <span class="text-violet-500 bg-white rounded-md py-0.5 px-2"><FontAwesomeIcon icon={faEnvelope} size="lg" /></span>
                        <span class="text-white">
                            <a href="mailto:jesus@cavazzo.com.mx" alt="Contact email">jesus@cavazzo.com.mx</a>
                        </span>
                    </div>
                    <div class="flex flex-row w-full mt-10 text-sm lg:text-lg space-x-2">
                        <span class="text-violet-500 bg-white rounded-md py-0.5 px-2"><FontAwesomeIcon icon={faLinkedin} size="lg" /></span>
                        <span class="text-white underline">
                            <a href="https://www.linkedin.com/in/cavazzo/" target="_blank">LinkedIn/cavazzo</a>
                        </span>
                    </div>
                    <div class="flex flex-row w-full mt-10 text-sm lg:text-lg space-x-2">
                        <span class="text-violet-500 bg-white rounded-md py-0.5 px-2"><FontAwesomeIcon icon={faGithub} size="lg" /></span>
                        <span class="text-white underline">
                            <a href="https://github.com/cavazzo" target="_blank">Github/cavazzo</a>
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full md:w-7/12 rounded-r-md py-12 px-5 space-y-5">
                <div class="flex flex-col md:flex-row gap-4 w-full">
                    <div class="relative z-0 mb-6 w-full md:w-1/2 group">
                        <input bind:value={name} type="text" name="floating_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer" placeholder=" " required />
                        <label for="floating_name" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Firts Name</label>
                    </div>
                    <div class="relative z-0 mb-6 w-full md:w-1/2 group">
                        <input bind:value={email} type="email" name="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer" placeholder=" " required />
                        <label for="floating_email" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                </div>
                <div class="flex flex-col w-full space-y-5">
                    <div class="text-gray-600 font-bold text-base">Select the subjects of your interest</div>
                    <div class="flex flex-row flex-wrap w-full gap-5">
                        <div class="form-check">
                            <input bind:group={subjects} class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Web Site">
                            <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                                Web Site
                            </label>
                        </div>
                        <div class="form-check">
                            <input bind:group={subjects} class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Api Rest">
                            <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                                Api Rest
                            </label>
                        </div>
                        <div class="form-check">
                            <input bind:group={subjects} class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Windows/Linux Service">
                            <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                                Windows/Linux Service
                            </label>
                        </div>
                        <div class="form-check">
                            <input bind:group={subjects} class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Desktop Application">
                            <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                                Desktop Application
                            </label>
                        </div>
                    </div>
                    <div class="w-full">
                        <textarea bind:value={message} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg resize-none border border-gray-300 outline-1 outline-violet-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your message..."></textarea>
                    </div>
                    <div class="flex flex-row w-full h-full">
                        <button on:click="{sendMessage}" type="button" disabled={sendingMessage} class="w-full inline-block px-6 py-2.5 bg-violet-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-700 active:shadow-lg transition duration-150 ease-in-out">
                            {#if sendingMessage}
                                <FontAwesomeIcon icon={faSpinner} spin={true} />
                            {:else}
                                Send Message
                            {/if}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>