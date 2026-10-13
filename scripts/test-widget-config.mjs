import h from "../api/index.mjs";
const f = (h.default ?? h).fetch ?? h.fetch;
const B="https://x.vercel.app/api/index?__path=widget/config";
const cases=[
 ["missing tenant",B,{origin:"https://x.vercel.app"},400],
 ["missing key (demo requires key)",B+"&tenant=demo",{origin:"https://x.vercel.app"},403],
 ["invalid key",B+"&tenant=demo&key=fake_invalid_123",{origin:"https://x.vercel.app"},403],
 ["valid key forwarded",B+"&tenant=demo&key=demo_public_key",{origin:"https://x.vercel.app"},200],
 ["valid key, unauthorized domain",B+"&tenant=demo&key=demo_public_key",{origin:"https://evil.example.com"},403],
 ["valid key, no origin",B+"&tenant=demo&key=demo_public_key",{},403],
 ["unknown tenant",B+"&tenant=nope&key=demo_public_key",{origin:"https://x.vercel.app"},403],
];
let fail=0;
for(const [n,u,hd,exp] of cases){const r=await f(new Request(u,{headers:hd}));const ok=r.status===exp;if(!ok)fail++;console.log(ok?"PASS":"FAIL",n,r.status);}
process.exit(fail);
