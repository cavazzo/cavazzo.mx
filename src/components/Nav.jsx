import React, { useState } from "react";

const Nav = () => {
    const [ selected, setSelected ] = useState("Home");
    const [ isMenuMobileHidden, setIsMenuMobileHidden ] = useState(true);

    const toggleMobileMenu = () => {
        setIsMenuMobileHidden(!isMenuMobileHidden);
    }

    const scrollToElement = (el, menu) => {
		setSelected(menu);
		const element = document.getElementById(el);

        if (element) {
            const elementOffset = element.dataset.offset;
            const headerOffset = elementOffset || 45;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
            window.scrollTo({
                top: offsetPosition
            });
        }
	}

    const backToTop = () => {
		setSelected("Home");

		window.scrollTo({
			top: 0
		});
	}

    return (
        <main className="Nav fixed w-full z-20">
            <nav className="bg-white shadow-md">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-7">
                            <div>
                                {/* Website Logo */}
                                <a className="flex items-center py-5 px-2">
                                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-violet-600 text-xl" style={{ WebkitBackgroundClip: "text" }}>Cavazzo</span>
                                </a>
                            </div>
                            {/* Primary Navbar items */}
                            <div className="hidden md:flex items-center space-x-1" id="navbar-desktop">
                                <button className={`py-2 px-2 ${selected == "Home" ? "text-emerald-500 border-b-2 border-emerald-500 font-bold" : "text-gray-600 hover:text-emerald-500 transition duration-300 font-semibold"}`} onClick={backToTop} data-section="Home">Home</button>
                                <button className={`py-2 px-2 ${selected == "Skills" ? "text-emerald-500 border-b-2 border-emerald-500 font-bold" : "text-gray-600 hover:text-emerald-500 transition duration-300 font-semibold"}`} onClick={() => scrollToElement("skills-section", "Skills")} data-section="Skills">Skills</button>
                                <button className={`py-2 px-2 ${selected == "Projects" ? "text-emerald-500 border-b-2 border-emerald-500 font-bold" : "text-gray-600 hover:text-emerald-500 transition duration-300 font-semibold"}`} onClick={() => scrollToElement("projects-section", "Projects")} data-section="Projects">Projects</button>
                                <button className={`py-2 px-2 ${selected == "Contact" ? "text-emerald-500 border-b-2 border-emerald-500 font-bold" : "text-gray-600 hover:text-emerald-500 transition duration-300 font-semibold"}`} onClick={() => scrollToElement("contact-section", "Contact")} data-section="Contact">Contact</button>
                            </div>
                        </div>
                        {/* Secondary Navbar items */}
                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={toggleMobileMenu} className="outline-none mobile-menu-button">
                                <svg className=" w-6 h-6 text-gray-600 hover:text-emerald-500"
                                    x-show="!showMenu"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* mobile menu */}
                <div className={`${isMenuMobileHidden ? "hidden" : ""} mobile-menu`}>
                    <ul id="navbar-mobile">
                        <li className={`${selected == "Home" ? "active" : ""}`} data-section="Home">
                            <button className="w-full text-sm px-2 py-4 text-white bg-emerald-300 transition duration-300 font-bold" onClick={backToTop}>Home</button>
                        </li>
                        <li className={`${selected == "Skills" ? "active" : ""}`} data-section="Skills">
                            <button className="w-full text-sm px-2 py-4 text-gray-600 hover:bg-emerald-300 hover:text-white transition duration-300 font-semibold" onClick={() => scrollToElement("skills-section", "Skills")}>Skills</button>
                        </li>
                        <li className={`${selected == "Projects" ? "active" : ""}`} data-section="Projects">
                            <button className="w-full text-sm px-2 py-4 text-gray-600 hover:bg-emerald-300 hover:text-white transition duration-300 font-semibold" onClick={() => scrollToElement("projects-section", "Projects")}>Projects</button>
                        </li>
                        <li className={`${selected == "Contact" ? "active" : ""}`} data-section="Contact">
                            <button className="w-full text-sm px-2 py-4 text-gray-600 hover:bg-emerald-300 hover:text-white transition duration-300 font-semibold" onClick={() => scrollToElement("contact-section", "Contact")}>Contact</button>
                        </li>
                    </ul>
                </div>
		    </nav>
        </main>
    );
}

export default Nav;