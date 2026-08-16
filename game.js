(async()=>{
  try{
    const files=["game.v5.gz.1.txt", "game.v5.gz.2.txt", "game.v5.gz.3.txt", "game.v5.gz.4.txt"];
    const parts=await Promise.all(files.map(f=>fetch(f,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`${f}: ${r.status}`);return r.text()})));
    const bin=atob(parts.join('').replace(/\s+/g,'')),bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));const src=await new Response(stream).text();const core=document.createElement('script');core.textContent=src;document.head.appendChild(core);
  }catch(err){console.error('ECHO V5 loader',err);const t=document.getElementById('toast');if(t){t.textContent='Impossible de charger ECHO';t.classList.add('show')}}
})();
