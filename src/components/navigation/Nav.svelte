<script>
    import { url } from "@roxi/routify";
    import { onMount } from "svelte";
    import logo from "../../assets/img/logo.png";

    onMount(() => {
        const btn = document.querySelector("button.mobile-menu-button");
        const menu = document.querySelector(".mobile-menu");

        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    });
</script>

<div class="Nav fixed w-full z-20">
    <!-- Navbar goes here -->
		<nav class="bg-white shadow-md">
			<div class="max-w-6xl mx-auto px-4">
				<div class="flex justify-between">
					<div class="flex space-x-7">
						<div>
							<!-- Website Logo -->
							<a href={$url("/")} class="flex items-center py-4 px-2">
								<img src={logo} alt="Logo" class="h-8 w-8 mr-2">
								<span class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-violet-600 text-xl" style="-webkit-background-clip: text;">Cavazzo</span>
							</a>
						</div>
						<!-- Primary Navbar items -->
						<div class="hidden md:flex items-center space-x-1">
							<a href={$url("/")} class="py-2 px-2 text-emerald-500 border-b-2 border-emerald-500 font-bold ">Home</a>
							<a href={$url("/services")} class="py-4 px-2 text-gray-600 font-semibold hover:text-emerald-500 transition duration-300">Services</a>
							<a href={$url("/about")} class="py-4 px-2 text-gray-600 font-semibold hover:text-emerald-500 transition duration-300">About</a>
							<a href={$url("/contact")} class="py-4 px-2 text-gray-600 font-semibold hover:text-emerald-500 transition duration-300">Contact</a>
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
				<ul class="">
					<li class="active">
                        <a href={$url("/")} class="block text-sm px-2 py-4 text-white bg-emerald-300 transition duration-300 font-bold">Home</a>
                    </li>
					<li>
                        <a href={$url("/services")} class="block text-sm px-2 py-4 text-gray-600 hover:bg-emerald-300 hover:text-white transition duration-300 font-semibold">Services</a>
                    </li>
					<li>
                        <a href={$url("/about")} class="block text-sm px-2 py-4 text-gray-600 hover:bg-emerald-300 hover:text-white transition duration-300 font-semibold">About</a>
                    </li>
					<li>
                        <a href={$url("/contact")} class="block text-sm px-2 py-4 text-gray-600 hover:bg-emerald-300 hover:text-white transition duration-300 font-semibold">Contact</a>
                    </li>
				</ul>
			</div>
		</nav>
</div>