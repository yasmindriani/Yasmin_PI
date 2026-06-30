const fs=require('fs');
const p=require('path');
const d='C:/Users/yasmi/Downloads';
const f=fs.readdirSync(d).filter(x=>x.endsWith('.png'));
['double frame polos','fancy nancy','heart chain','house','polkadot','purple stripes','double stripes','double yellow'].forEach(t=>{
    const match=f.filter(x=>x.toLowerCase().includes(t))
                 .map(x=>({n:x,t:fs.statSync(p.join(d,x)).mtimeMs}))
                 .sort((a,b)=>b.t-a.t)[0];
    if(match){
        const destName = t.includes('double frame polos') ? 'double frame polos (1).png' : `frame double ${t.replace('double ','')}.png`;
        console.log(`Copying ${match.n} -> ${destName}`);
        fs.copyFileSync(p.join(d,match.n), p.join('public/images', destName));
    }
});
