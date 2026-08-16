(async()=>{
  try{
    const files=['game.gz.1.txt','game.gz.2.txt','game.gz.3.txt'];
    const parts=await Promise.all(files.map(f=>fetch(f,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`${f}: ${r.status}`);return r.text()})));
    const bin=atob(parts.join('').replace(/\s+/g,''));
    const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const src=await new Response(stream).text();
    const core=document.createElement('script');core.textContent=src;document.head.appendChild(core);
    const extra=await fetch('reforged.js',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`reforged.js: ${r.status}`);return r.text()});
    const patch=document.createElement('script');patch.textContent=extra;document.head.appendChild(patch);
  }catch(err){
    console.error('ECHO loader',err);
    const t=document.getElementById('toast');if(t){t.textContent='Impossible de charger ECHO';t.classList.add('show')}
  }
})();
