<script>
    import Nav from "../components/navigation/Nav.svelte";
</script>

<main class="_layout h-full overflow-auto">
    <Nav />
    
    <div class="pt-16">
        <slot />
    </div>
</main>
