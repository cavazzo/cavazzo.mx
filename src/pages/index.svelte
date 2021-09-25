<script>
    import { goto } from "@roxi/routify"; 

	let name ="Index";
</script>

<h1>You are in {name} pag!</h1>
<button on:click={() => { $goto("/about") }}>click me</button>