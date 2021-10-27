<script>
    import Nav from "../components/navigation/Nav.svelte";
</script>

<style>
    .pattern {
        background-color: #ffffff;
        opacity: 1;
        background-image: radial-gradient(#004e53 0.2px, #ffffff 0.2px);
        background-size: 4px 4px;
    }
</style>

<main class="_layout pattern h-full overflow-auto">
    <Nav />
    
    <div class="pt-16">
        <slot />
    </div>
</main>
