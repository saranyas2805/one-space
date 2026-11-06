"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, Bell, BookOpen, BriefcaseBusiness, CalendarDays,
  Check, ChevronRight, CircleHelp, Compass, Gamepad2, GraduationCap,
  Home, LayoutGrid, Menu, MessageCircle, Moon, MoreHorizontal, Plus,
  Search, Send, Settings, ShieldCheck, Sparkles, Sun, Trophy, Users,
  Video, WandSparkles, X, Zap
} from "lucide-react";

const modules = [
  { name: "Social", detail: "Share moments and ideas", icon: Users, color: "from-pink-500/20 to-rose-500/5", accent: "text-pink-300" },
  { name: "AI Buddy", detail: "Your everyday AI companion", icon: Sparkles, color: "from-violet-500/20 to-indigo-500/5", accent: "text-violet-300" },
  { name: "Learning", detail: "Build skills every day", icon: GraduationCap, color: "from-cyan-500/20 to-blue-500/5", accent: "text-cyan-300" },
  { name: "Gaming", detail: "Play, compete and earn XP", icon: Gamepad2, color: "from-fuchsia-500/20 to-purple-500/5", accent: "text-fuchsia-300" },
  { name: "Productivity", detail: "Make every day count", icon: CalendarDays, color: "from-emerald-500/20 to-teal-500/5", accent: "text-emerald-300" },
  { name: "Career", detail: "Discover your next move", icon: BriefcaseBusiness, color: "from-amber-500/20 to-orange-500/5", accent: "text-amber-300" },
  { name: "Community", detail: "Find your people", icon: MessageCircle, color: "from-blue-500/20 to-indigo-500/5", accent: "text-blue-300" }
];

const navItems = [
  { label: "Home", icon: Home }, { label: "Explore", icon: Compass },
  { label: "Social", icon: Users }, { label: "AI Buddy", icon: Sparkles },
  { label: "Learning", icon: BookOpen }, { label: "Gaming", icon: Gamepad2 },
  { label: "Productivity", icon: CalendarDays }, { label: "Career", icon: BriefcaseBusiness },
  { label: "Community", icon: MessageCircle }, { label: "Messages", icon: Send },
  { label: "Notifications", icon: Bell }, { label: "Settings", icon: Settings }
];

const missions = [
  { title: "Complete a 10-minute lesson", xp: "+30 XP", done: true },
  { title: "Share something with the community", xp: "+20 XP", done: false },
  { title: "Solve one brain challenge", xp: "+50 XP", done: false }
];

export default function HomePage() {
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useState<string[]>(["Complete a 10-minute lesson"]);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>(["Review Java arrays", "Practice SQL joins"]);
  const filteredModules = useMemo(() => modules.filter(m => m.name.toLowerCase().includes(query.toLowerCase())), [query]);

  const toggleMission = (title: string) => setCompleted(old => old.includes(title) ? old.filter(x => x !== title) : [...old, title]);
  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(old => [...old, chatInput.trim()]);
    setChatInput("");
  };

  return (
    <main className={dark ? "min-h-screen bg-[#09090f] text-white" : "min-h-screen bg-slate-100 text-slate-900"}>
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/[.07] bg-[#0d0d16] px-5 py-6 transition-transform lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-10 flex items-center justify-between">
            <button onClick={() => setActive("Home")} className="flex items-center gap-3 text-left">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-glow"><LayoutGrid size={21}/></span>
              <span><span className="block text-xl font-black tracking-tight">one<span className="gradient-text">space</span></span><span className="text-[10px] uppercase tracking-[.28em] text-slate-500">Everything, together</span></span>
            </button>
            <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19}/></button>
          </div>
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.22em] text-slate-500">Workspace</div>
          <nav className="flex-1 space-y-1 overflow-y-auto">
            {navItems.map(item => {
              const Icon = item.icon;
              return <button key={item.label} onClick={() => { setActive(item.label); setMobileOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active === item.label ? "bg-violet-500/15 font-semibold text-violet-200 ring-1 ring-violet-400/20" : "text-slate-400 hover:bg-white/[.05] hover:text-white"}`}>
                <Icon size={17}/>{item.label}{item.label === "Notifications" && <span className="ml-auto h-2 w-2 rounded-full bg-cyan-400"/>}
              </button>;
            })}
          </nav>
          <div className="mt-5 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/15 to-cyan-500/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-violet-200"><Zap size={15}/><span className="text-xs font-bold">OneSpace Pro</span></div>
            <p className="text-xs leading-5 text-slate-400">Your whole world, with room to grow.</p>
            <button onClick={() => setActive("Explore")} className="mt-3 text-xs font-semibold text-cyan-300">Explore features <ArrowUpRight className="ml-1 inline" size={13}/></button>
          </div>
          <button onClick={() => setActive("Profile")} className="mt-5 flex items-center gap-3 border-t border-white/[.07] pt-5 text-left">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 text-sm font-bold text-slate-950">S</div>
            <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">Your profile</span><span className="block text-xs text-slate-500">@onespace_member</span></span>
            <MoreHorizontal size={18} className="text-slate-500"/>
          </button>
        </aside>

        {mobileOpen && <button aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/60 lg:hidden"/>}

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-white/[.07] bg-[#09090f]/85 px-4 backdrop-blur-xl sm:px-8">
            <div className="flex items-center gap-3">
              <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu/></button>
              <div><p className="text-xs text-slate-500">Your digital universe</p><h1 className="text-lg font-bold">{active}</h1></div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <label className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 md:flex"><Search size={16} className="text-slate-500"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search OneSpace..." className="w-36 bg-transparent text-xs outline-none placeholder:text-slate-600"/></label>
              <button onClick={() => setDark(!dark)} className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white" aria-label="Toggle theme">{dark ? <Sun size={17}/> : <Moon size={17}/>}</button>
              <button onClick={() => setActive("Notifications")} className="relative rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white" aria-label="Notifications"><Bell size={17}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400"/></button>
              <div className="hidden h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 text-sm font-bold text-slate-950 sm:grid">S</div>
            </div>
          </header>

          <div className="soft-grid min-h-[calc(100vh-76px)] px-4 py-7 sm:px-8 lg:px-10">
            {active === "Home" || active === "Explore" ? <>
              <div className="relative mb-8 overflow-hidden rounded-[28px] border border-violet-400/15 bg-gradient-to-br from-[#21163d] via-[#15152b] to-[#102633] p-6 shadow-glow sm:p-9">
                <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"/>
                <div className="absolute bottom-[-100px] right-[25%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"/>
                <div className="relative max-w-2xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/[.06] px-3 py-1.5 text-[11px] font-semibold text-violet-200"><Sparkles size={13}/> YOUR WORLD. ONE SPACE.</div>
                  <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">Good to see you.<br/><span className="gradient-text">Make today count.</span></h2>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300">Learn something new, connect with your people, build your future and have fun — all from one place.</p>
                  <div className="mt-6 flex flex-wrap gap-3"><button onClick={() => setActive("AI Buddy")} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-100"><WandSparkles className="mr-2 inline" size={16}/>Talk to AI Buddy</button><button onClick={() => setActive("Learning")} className="rounded-xl border border-white/20 bg-white/[.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Explore learning <ChevronRight className="ml-1 inline" size={15}/></button></div>
                </div>
                <div className="relative mt-8 grid max-w-xl grid-cols-3 gap-3 sm:absolute sm:bottom-8 sm:right-8 sm:mt-0 sm:w-[330px]">
                  {[["2.4K","XP earned"],["07","Day streak"],["Level 04","Explorer"]].map(([v,l]) => <div key={l} className="rounded-2xl border border-white/10 bg-black/20 p-3 backdrop-blur"><p className="text-lg font-black text-white">{v}</p><p className="mt-1 text-[10px] text-slate-400">{l}</p></div>)}
                </div>
              </div>

              <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <Stat icon={Activity} label="Your progress" value="68%" note="Keep your momentum" color="text-cyan-300"/>
                <Stat icon={Trophy} label="Community rank" value="#128" note="Top 15% this week" color="text-amber-300"/>
                <Stat icon={ShieldCheck} label="Daily streak" value="7 days" note="You're on fire" color="text-emerald-300"/>
              </div>

              <div className="mb-9">
                <SectionTitle title="Your OneSpace" subtitle="Everything you need, connected."/>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {filteredModules.map(m => { const Icon = m.icon; return <button key={m.name} onClick={() => setActive(m.name)} className={`card-hover rounded-2xl border border-white/[.08] bg-gradient-to-br ${m.color} p-5 text-left`}><div className="mb-5 flex items-center justify-between"><span className={`grid h-11 w-11 place-items-center rounded-xl bg-black/20 ${m.accent}`}><Icon size={21}/></span><ArrowUpRight size={17} className="text-slate-500"/></div><h3 className="font-bold">{m.name}</h3><p className="mt-1 text-xs text-slate-400">{m.detail}</p></button>; })}
                </div>
                {filteredModules.length === 0 && <p className="mt-4 text-sm text-slate-500">No modules match that search.</p>}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
                <div className="glass rounded-2xl p-5 sm:p-6">
                  <SectionTitle title="Daily missions" subtitle="Small steps. Big progress."/>
                  <div className="mt-5 space-y-3">{missions.map(m => <button key={m.title} onClick={() => toggleMission(m.title)} className="flex w-full items-center gap-3 rounded-xl bg-white/[.035] p-3 text-left hover:bg-white/[.06]"><span className={`grid h-6 w-6 place-items-center rounded-full border ${completed.includes(m.title) ? "border-emerald-400 bg-emerald-400 text-slate-950" : "border-white/20 text-transparent"}`}><Check size={14}/></span><span className="flex-1 text-sm text-slate-300">{m.title}</span><span className="text-xs font-bold text-cyan-300">{m.xp}</span></button>)}</div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{width: `${completed.length / missions.length * 100}%`}}/></div><p className="mt-2 text-right text-[11px] text-slate-500">{completed.length} of {missions.length} completed</p>
                </div>
                <div className="glass rounded-2xl p-5 sm:p-6">
                  <SectionTitle title="Quick access" subtitle="Jump back into your flow."/>
                  <div className="mt-5 grid grid-cols-2 gap-3"><Quick icon={Sparkles} label="Ask AI Buddy" onClick={() => setActive("AI Buddy")}/><Quick icon={Gamepad2} label="Play a game" onClick={() => setActive("Gaming")}/><Quick icon={BookOpen} label="My courses" onClick={() => setActive("Learning")}/><Quick icon={CalendarDays} label="Plan my day" onClick={() => setActive("Productivity")}/></div>
                  <div className="mt-5 rounded-xl border border-cyan-400/10 bg-cyan-400/[.05] p-3 text-xs leading-5 text-slate-400"><CircleHelp size={14} className="mr-2 inline text-cyan-300"/>Demo dashboard: progress and sample activity are illustrative until your account and database are connected.</div>
                </div>
              </div>
            </> : <ModulePage active={active} chatInput={chatInput} setChatInput={setChatInput} messages={messages} sendMessage={sendMessage} task={task} setTask={setTask} tasks={tasks} setTasks={setTasks}/>}
            <footer className="mt-12 flex flex-col justify-between gap-2 border-t border-white/[.07] pt-5 text-[11px] text-slate-600 sm:flex-row"><span>© 2026 OneSpace. Your world, all in one place.</span><span>Built to connect · learn · create · play</span></footer>
          </div>
        </section>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t border-white/10 bg-[#0d0d16]/95 px-2 py-2 backdrop-blur-xl lg:hidden">
        {[navItems[0], navItems[2], navItems[3], navItems[5], navItems[11]].map(item => { const Icon = item.icon; return <button key={item.label} onClick={() => setActive(item.label)} className={`flex flex-col items-center gap-1 px-2 py-1 text-[9px] ${active === item.label ? "text-violet-300" : "text-slate-500"}`}><Icon size={18}/>{item.label}</button>; })}
      </nav>
    </main>
  );
}

function Stat({ icon: Icon, label, value, note, color }: { icon: any; label: string; value: string; note: string; color: string }) {
  return <div className="glass rounded-2xl p-4"><div className="flex items-center justify-between"><span className="text-xs text-slate-400">{label}</span><Icon size={17} className={color}/></div><p className="mt-3 text-2xl font-black">{value}</p><p className="mt-1 text-[11px] text-slate-500">{note}</p></div>;
}
function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return <div><h3 className="text-lg font-bold">{title}</h3><p className="mt-1 text-xs text-slate-500">{subtitle}</p></div>;
}
function Quick({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return <button onClick={onClick} className="flex items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.035] p-3 text-left text-xs font-semibold text-slate-300 hover:border-violet-400/30 hover:bg-violet-400/[.06]"><Icon size={16} className="text-violet-300"/>{label}</button>;
}
function ModulePage({ active, chatInput, setChatInput, messages, sendMessage, task, setTask, tasks, setTasks }: any) {
  const [draft, setDraft] = useState("");
  const [liked, setLiked] = useState(false);
  const [selectedGame, setSelectedGame] = useState("Memory Challenge");
  const [showDemo, setShowDemo] = useState(false);
  const descriptions: Record<string,string> = {
    Social: "A place to share moments, ideas and creativity.", "AI Buddy": "Ask questions, learn concepts and turn ideas into action.",
    Learning: "Build your skills with guided learning paths.", Gaming: "Play original mini-games and challenge your best score.",
    Productivity: "Organize your day and make progress visible.", Career: "Explore career paths and prepare for opportunities.",
    Community: "Find people who share your interests.", Messages: "Your conversations in one place.",
    Notifications: "Stay up to date with your OneSpace activity.", Settings: "Make OneSpace work the way you like.",
    Profile: "Your identity, progress and achievements.", Explore: "Discover what's possible in OneSpace."
  };
  return <div className="mx-auto max-w-5xl">
    <div className="mb-7"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-200"><Sparkles size={12}/> OneSpace module</div><h2 className="text-3xl font-black">{active}</h2><p className="mt-2 text-sm text-slate-400">{descriptions[active] || "Explore this part of your OneSpace."}</p></div>
    {active === "AI Buddy" ? <div className="glass rounded-3xl p-5 sm:p-8"><div className="mb-5 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-500/20 text-violet-200"><Sparkles/></div><div><h3 className="font-bold">AI Buddy · Demo chat</h3><p className="text-xs text-slate-500">Connect an AI provider to enable real AI responses.</p></div></div><div className="mb-5 min-h-52 space-y-3 rounded-2xl bg-black/20 p-4"><div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-violet-500/15 p-3 text-sm text-violet-100">Hey! I'm your OneSpace AI Buddy demo. Ask me something, and your message will appear here. Real AI replies become available after secure API setup.</div>{messages.map((m:string,i:number)=><div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-cyan-500/10 p-3 text-sm text-cyan-100">{m}</div>)}</div><div className="flex gap-2"><input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Message AI Buddy..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-violet-400/50"/><button onClick={sendMessage} className="rounded-xl bg-violet-500 px-4 text-white hover:bg-violet-400"><Send size={17}/></button></div><p className="mt-3 text-[11px] text-slate-600">Demo mode · No external AI service is connected yet.</p></div>
    : active === "Productivity" ? <div className="glass rounded-3xl p-5 sm:p-8"><h3 className="font-bold">My tasks</h3><p className="mt-1 text-xs text-slate-500">A local demo list for trying the task flow.</p><form onSubmit={e=>{e.preventDefault();if(task.trim()){setTasks((old:string[])=>[...old,task.trim()]);setTask("");}}} className="my-5 flex gap-2"><input value={task} onChange={e=>setTask(e.target.value)} placeholder="Add a task..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none"/><button className="rounded-xl bg-violet-500 px-4 text-white"><Plus size={18}/></button></form><div className="space-y-2">{tasks.map((t:string,i:number)=><div key={i} className="flex items-center gap-3 rounded-xl bg-white/[.04] p-3 text-sm"><Check size={16} className="text-emerald-300"/>{t}<button onClick={()=>setTasks((old:string[])=>old.filter((_:string,j:number)=>i!==j))} className="ml-auto text-xs text-slate-500 hover:text-rose-300">Remove</button></div>)}</div></div>
    : active === "Gaming" ? <><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{["Battle Royale","Brain Battle","Code Rush","Word Master","Memory Challenge","Escape Room"].map((g,i)=><button key={g} onClick={()=>{setSelectedGame(g);setShowDemo(true);}} className="card-hover rounded-2xl border border-white/10 bg-white/[.035] p-5 text-left"><div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300"><Gamepad2/></div><h3 className="font-bold">{g}</h3><p className="mt-1 text-xs text-slate-500">{["3D survival arena · prototype","Timed knowledge quiz · demo","Programming puzzles · demo","Vocabulary challenge · demo","Card matching · demo","Logic mystery · demo"][i]}</p><span className="mt-4 inline-block text-xs font-bold text-cyan-300">Open game <ChevronRight className="ml-1 inline" size={13}/></span></button>)}</div>{showDemo&&<div className="glass mt-5 rounded-2xl p-5"><div className="flex items-center justify-between"><h3 className="font-bold">{selectedGame}</h3><button onClick={()=>setShowDemo(false)}><X size={17}/></button></div><p className="mt-2 text-sm text-slate-400">This game module is listed in the roadmap. Its playable game engine will be implemented in a dedicated development phase.</p></div>}</>
    : active === "Social" ? <div className="grid gap-5 lg:grid-cols-[1fr_280px]"><div className="glass rounded-2xl p-5"><h3 className="font-bold">Create a post</h3><textarea value={draft} onChange={e=>setDraft(e.target.value)} placeholder="What's happening in your world?" className="mt-4 min-h-28 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-sm outline-none"/><div className="mt-3 flex justify-end"><button onClick={()=>setDraft("")} className="rounded-xl bg-violet-500 px-4 py-2 text-xs font-bold">Clear draft</button></div><div className="mt-6 rounded-2xl bg-white/[.035] p-4"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-violet-500/30">S</div><div><p className="text-sm font-bold">OneSpace community</p><p className="text-[10px] text-slate-500">Sample community post</p></div></div><p className="my-4 text-sm text-slate-300">Welcome to OneSpace — a new place to connect, learn and create together.</p><button onClick={()=>setLiked(!liked)} className="text-xs text-pink-300">{liked?"♥ Liked":"♡ Like"} · Demo interaction</button></div></div><div className="glass rounded-2xl p-5"><h3 className="font-bold">Stories</h3><div className="mt-4 flex flex-wrap gap-3">{["You","Alex","Mia","Jordan"].map((n,i)=><div key={n} className="text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full border-2 border-violet-400 bg-violet-500/10 text-sm">{n[0]}</div><p className="mt-1 text-[10px] text-slate-400">{n}</p></div>)}</div><p className="mt-5 text-[11px] text-slate-600">Sample stories · Social backend not connected.</p></div></div>
    : <div className="glass rounded-3xl p-6 sm:p-8"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-500/15 text-violet-200"><LayoutGrid size={25}/></div><h3 className="mt-5 text-xl font-bold">The {active} experience is taking shape.</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">This module has its place in the OneSpace navigation. The next development phase will connect its dedicated features, secure account data and persistent storage.</p><div className="mt-6 flex flex-wrap gap-3"><span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-[11px] text-amber-200">Foundation stage</span><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[11px] text-slate-400">Backend integration pending</span></div></div>}
  </div>;
}