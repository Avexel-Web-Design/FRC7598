import{r as a,j as e}from"./index-CwHMxabV.js";import{u as p}from"./useScrollReveal-Cps71qcx.js";const u=({name:t,bgColorClass:r="",textColorClass:s="text-white",className:l="",size:n="md"})=>{const d=a.useMemo(()=>t?t.split(" ").map(x=>x.charAt(0).toUpperCase()).slice(0,2).join(""):"??",[t]),c=a.useMemo(()=>{switch(n){case"lg":return"w-32 h-32 text-4xl";case"sm":return"w-10 h-10 text-sm";case"xs":return"w-8 h-8 text-xs";case"md":default:return"w-16 h-16 text-xl"}},[n]),m=a.useMemo(()=>r?{}:{background:"linear-gradient(135deg, #8b5cf6, #3b82f6)"},[r]);return e.jsxs("div",{className:`relative rounded-full overflow-hidden ${c} ${l}`,"aria-label":`Monogram for ${t}`,children:[e.jsx("div",{className:"absolute inset-0 bg-grid-pattern opacity-10"}),e.jsx("div",{className:`absolute inset-0 ${r}`,style:m}),e.jsx("div",{className:"absolute inset-0 bg-gradient-radial from-white/10 to-transparent opacity-40"}),e.jsx("div",{className:"absolute inset-[-1px] border border-white/20 rounded-full"}),e.jsx("div",{className:"absolute inset-[-2px] border border-white/10 rounded-full animate-pulse-slow"}),e.jsx("div",{className:`absolute inset-0 flex items-center justify-center font-bold ${s}`,children:d})]})},i=({year:t,title:r,description:s})=>e.jsxs("div",{className:"relative pl-8 pb-12 group",children:[e.jsxs("div",{className:"absolute left-[-5px] w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500",children:[e.jsx("div",{className:"absolute -inset-2 rounded-full border border-primary-500/30 group-hover:border-primary-500/60 transition-colors duration-300"}),e.jsx("div",{className:"absolute -inset-4 rounded-full border border-primary-500/20 group-hover:border-primary-500/40 transition-colors duration-300"})]}),e.jsx("div",{className:"absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 to-secondary-500/50"}),e.jsxs("div",{className:"group-hover:translate-x-1 transition-transform duration-300",children:[e.jsx("h4",{className:"text-xl font-bold mb-2 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent",children:t}),e.jsx("p",{className:"text-xl font-medium text-white mb-1",children:r}),e.jsx("p",{className:"text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300",children:s})]})]}),o=({name:t,role:r,description:s})=>e.jsxs("div",{className:"relative group",children:[e.jsx("div",{className:"absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"}),e.jsxs("div",{className:"relative flex flex-col h-full glass-morphism p-6 rounded-xl border border-white/5 transition-all duration-500 group-hover:translate-y-[-2px]",children:[e.jsx("div",{className:"relative mb-6 mx-auto",children:e.jsx(u,{name:t,size:"lg",className:"mx-auto"})}),e.jsxs("div",{className:"text-center mb-4",children:[e.jsx("h3",{className:"text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent",children:t}),e.jsx("p",{className:"text-gray-400 mt-1",children:r})]}),e.jsx("p",{className:"text-gray-300 text-center flex-grow",children:s})]})]}),h=()=>(p(),e.jsxs("section",{id:"about",className:"py-20 bg-black relative overflow-hidden scroll-mt-16",children:[e.jsx("div",{className:"absolute top-1/4 left-1/4 w-64 h-64 border border-white/5 rounded-full animate-spin-slow-reverse"}),e.jsx("div",{className:"absolute bottom-1/3 right-1/3 w-96 h-96 border border-white/5 animate-spin-slow"}),e.jsxs("div",{className:"container mx-auto px-4 lg:px-8 relative z-10",children:[e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"text-center mb-12 reveal",children:[e.jsx("span",{className:"inline-block text-xs uppercase tracking-widest text-primary-400 font-medium border-b border-primary-500/30 pb-1 mb-4",children:"Who We Are"}),e.jsx("h2",{className:"text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent",children:"Student Developers. Real Solutions."}),e.jsx("p",{className:"text-lg text-gray-300",children:"We're more than just a web development team – we're Harbor Springs High School students passionate about technology and innovation, putting our skills to work while supporting STEM education in Northern Michigan."})]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-8 reveal",children:[e.jsxs("div",{className:"glass-morphism p-8 rounded-xl border border-white/5",children:[e.jsx("h3",{className:"text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent",children:"Our Story"}),e.jsx("p",{className:"text-gray-400 leading-relaxed",children:"Avexel represents the intersection of competitive robotics and professional web development. What began as a vision to channel our technical expertise into meaningful digital solutions has evolved into something greater."}),e.jsx("p",{className:"text-gray-400 leading-relaxed mt-4",children:"Today, we blend our engineering mindset with creative design to deliver websites that truly perform. Each project we complete not only serves our clients but also helps sustain the STEM education around us."})]}),e.jsxs("div",{className:"glass-morphism p-8 rounded-xl border border-white/5",children:[e.jsx("h3",{className:"text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent",children:"Our Mission"}),e.jsx("p",{className:"text-gray-400 leading-relaxed",children:"We're dedicated to crafting exceptional digital experiences with purpose. Every line of code we write serves two essential goals: delivering outstanding value to our clients and supporting the next generation of technology innovators."}),e.jsx("p",{className:"text-gray-400 leading-relaxed mt-4",children:"When you partner with Avexel, you're not just launching a website—you're helping fuel technological education and innovation that extends far beyond your project."})]})]}),e.jsx("div",{className:"mt-12 reveal",children:e.jsxs("div",{className:"glass-morphism p-8 rounded-xl border border-white/5",children:[e.jsx("h3",{className:"text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent",children:"Why Choose Us"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"mb-4",children:e.jsx("i",{className:"fas fa-code text-3xl bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent"})}),e.jsx("h4",{className:"font-bold mb-2",children:"Modern Technology"}),e.jsx("p",{className:"text-gray-400",children:"We leverage cutting-edge tools and frameworks to build fast, responsive, and secure websites that stand out."})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"mb-4",children:e.jsx("i",{className:"fas fa-heart text-3xl bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent"})}),e.jsx("h4",{className:"font-bold mb-2",children:"Passion for Excellence"}),e.jsx("p",{className:"text-gray-400",children:"Our competitive robotics background drives us to pursue perfection in every project we undertake."})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"mb-4",children:e.jsx("i",{className:"fas fa-hands-helping text-3xl bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent"})}),e.jsx("h4",{className:"font-bold mb-2",children:"Impact"}),e.jsx("p",{className:"text-gray-400",children:"Your project directly supports STEM education and helps cultivate tomorrow's technology leaders."})]})]})]})})]}),e.jsxs("div",{className:"mb-16 reveal",children:[e.jsx("h3",{className:"text-3xl mt-5 font-bold mb-8 text-center bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent",children:"Our Team"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-8",children:[e.jsx(o,{name:"Ryan Latimer",role:"Lead Developer",description:"Programming team lead on FRC 7790 with expertise in full-stack development. Specializes in React applications and creating responsive, intuitive user interfaces."}),e.jsx(o,{name:"Gavin Moceri",role:"Technical Lead",description:"Robotics software specialist with strong backend development skills. Experience with robot control systems translated into secure, efficient web architecture."}),e.jsx(o,{name:"Conner Breckenfeld",role:"Design Specialist",description:"Design team member bringing creative vision to both robot design and digital interfaces. Focused on creating accessible, visually engaging web experiences."})]})]}),e.jsxs("div",{className:"mt-20 reveal",children:[e.jsx("h3",{className:"text-3xl font-bold mb-12 text-center bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent",children:"Our Journey"}),e.jsxs("div",{className:"max-w-3xl mx-auto",children:[e.jsx(i,{year:"2024",title:"Avexel is conceptualized",description:"As team members of FRC Team 7790, we wanted to find a way to support our robotics team while making use of our web development skills."}),e.jsx(i,{year:"2025",title:"FRC7790.com Is Created",description:"Our opening website, created to build a platform for our robotics team to showcase our team, attract sponsors, and provide a useful reservoir of information on FRC Events, Teams, and more."}),e.jsx(i,{year:"Present",title:"Expansion",description:"We are continuing to expand our robotics teams website, our business, and our impact to meaningful ideas."})]})]})]})]}));export{h as default};
//# sourceMappingURL=About-DpzHNUAa.js.map
