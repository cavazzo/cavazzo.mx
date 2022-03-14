<script>
    import { url } from "@roxi/routify";
    import { onMount } from "svelte";
    import logo from "../../assets/img/logo.png";

	let selected = "Home";

    onMount(() => {
        const btn = document.querySelector("button.mobile-menu-button");
        const menu = document.querySelector(".mobile-menu");

        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    });

	const scrollToElement = (el, menu) => {
		selected = menu;
		const element = document.getElementById(el);
		const elementOffset = element.dataset.offset;
		const headerOffset = elementOffset || 45;
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
		window.scrollTo({
			top: offsetPosition
		});
	}

	const backToTop = () => {
		selected = "Home";

		window.scrollTo({
			top: 0
		});
	}
</script>

<div class="Nav fixed w-full z-20" id="main-navbar">
    <!-- Navbar goes here -->
		<nav class="bg-white shadow-md">
			<div class="max-w-6xl mx-auto px-4">
				<div class="flex justify-between">
					<div class="flex space-x-7">
						<div>
							<!-- Website Logo -->
							<a href={$url("/")} class="flex items-center py-5 px-2">
								<!-- <img src={logo} alt="Logo" class="h-8 w-8 mr-2"> -->
								<span class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-violet-600 text-xl" style="-webkit-background-clip: text;">Cavazzo</span>
							</a>
						</div>
						<!-- Primary Navbar items -->
						<div class="hidden md:flex items-center space-x-1" id="navbar-desktop">
							<button class="py-2 px-2 {selected == "Home" ? "text-emerald-500 border-b-2 border-emerald-500 font-bold" : "text-gray-600 hover:text-emerald-500 transition duration-300 font-semibold"}" on:click="{backToTop}" data-section="Home">Home</button>
							<button class="py-2 px-2 {selected == "Skills" ? "text-emerald-500 border-b-2 border-emerald-500 font-bold" : "text-gray-600 hover:text-emerald-500 transition duration-300 font-semibold"}" on:click="{() => scrollToElement("skills-section", "Skills")}" data-section="Skills">Skills</button>
							<button class="py-2 px-2 {selected == "Projects" ? "text-emerald-500 border-b-2 border-emerald-500 font-bold" : "text-gray-600 hover:text-emerald-500 transition duration-300 font-semibold"}" on:click="{() => scrollToElement("projects-section", "Projects")}" data-section="Projects">Projects</button>
							<button class="py-2 px-2 {selected == "Contact" ? "text-emerald-500 border-b-2 border-emerald-500 font-bold" : "text-gray-600 hover:text-emerald-500 transition duration-300 font-semibold"}" on:click="{() => scrollToElement("contact-section", "Contact")}" data-section="Contact">Contact</button>
						</div>
					</div>
					<!-- Secondary Navbar items -->
					<!-- <div class="hidden md:flex items-center space-x-3 ">
						<a href="" class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</a>
						<a href="" class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</a>
					</div> -->
					<!-- Mobile menu button -->
					<div class="md:hidden flex items-center">
						<button class="outline-none mobile-menu-button">
						<svg class=" w-6 h-6 text-gray-600 hover:text-emerald-500"
							x-show="!showMenu"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					</div>
				</div>
			</div>
			<!-- mobile menu -->
			<div class="hidden mobile-menu">
				<ul id="navbar-mobile">
					<li class="{selected == "Home" ? "active" : ""}" data-section="Home">
                        <button class="w-full text-sm px-2 py-4 text-white bg-emerald-300 transition duration-300 font-bold" on:click="{backToTop}">Home</button>
                    </li>
					<li class="{selected == "Skills" ? "active" : ""}" data-section="Skills">
                        <button class="w-full text-sm px-2 py-4 text-gray-600 hover:bg-emerald-300 hover:text-white transition duration-300 font-semibold" on:click="{() => scrollToElement("skills-section", "Skills")}">Skills</button>
                    </li>
					<li class="{selected == "Projects" ? "active" : ""}" data-section="Projects">
                        <button class="w-full text-sm px-2 py-4 text-gray-600 hover:bg-emerald-300 hover:text-white transition duration-300 font-semibold" on:click="{() => scrollToElement("projects-section", "Projects")}">Projects</button>
                    </li>
					<li class="{selected == "Contact" ? "active" : ""}" data-section="Contact">
                        <button class="w-full text-sm px-2 py-4 text-gray-600 hover:bg-emerald-300 hover:text-white transition duration-300 font-semibold" on:click="{() => scrollToElement("contact-section", "Contact")}">Contact</button>
                    </li>
				</ul>
			</div>
		</nav>
</div>