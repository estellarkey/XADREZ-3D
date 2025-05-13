<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  // @ts-ignore
  let gameInstance;

  onMount(async () => {
    if (browser) {
      // Importação dinâmica do módulo
      const Chess3DModule = await import('$lib/index');
      
      // Cria a instância do jogo
      gameInstance = new Chess3DModule.Chess3DGame()
   
    }
  });

  onDestroy(() => {
    // @ts-ignore
    if (gameInstance) {
      gameInstance.dispose();
    }
  });
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div id="chess3d-container" />