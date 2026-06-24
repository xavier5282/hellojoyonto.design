import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 'vpn',
    title: 'Secure Super VPN',
    category: 'UI/UX',
    desc: 'Secure and user-focused VPN experience.',
    year: '2025',
    img: '/Mobile App Design.jpg'
  },
  {
    id: 'fashion',
    title: 'Juptee',
    category: 'Branding',
    desc: 'Fashion brand identity and e-commerce design.',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'game',
    title: 'Pinominos Game UI',
    category: 'Game UI',
    desc: 'Engaging game interface design for a popular puzzle game.',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'studio',
    title: 'Editorial Studio',
    category: 'Campaign',
    desc: 'Campaign and visual storytelling.',
    year: '2022',
    img: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'product',
    title: 'Commerce Product',
    category: 'Product',
    desc: 'E-commerce product and interaction design.',
    year: '2021',
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1400&q=80'
  }
]

export default function FeaturedSlider(){
  const [index, setIndex] = useState(0)
  const [isPaused, setPaused] = useState(false)
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const [slideSize, setSlideSize] = useState(540) // default card width
  const total = projects.length

  useEffect(()=>{
    function update(){
      const card = cardRef.current
      if(card) setSlideSize(card.offsetWidth + 32)
    }
    update()
    window.addEventListener('resize', update)
    return ()=> window.removeEventListener('resize', update)
  },[])

  // autoplay
  useEffect(()=>{
    if(isPaused) return
    const t = setInterval(()=> setIndex(i=> (i+1) % total), 6000)
    return ()=> clearInterval(t)
  },[isPaused, total])

  const prev = ()=> setIndex(i => (i - 1 + total) % total)
  const next = ()=> setIndex(i => (i + 1) % total)

  // drag handling: adjust based on drag distance
  const dragEnd = (event, info)=>{
    const offset = info.offset.x
    if(Math.abs(offset) < 80) return
    if(offset > 0) prev(); else next()
  }

  const visible = 2 // desktop show 2

  return (
    <section className="featured-work relative">
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* left content */}
        <div className="col-span-4">
          <span className="uppercase tracking-wider text-xs text-brand">Featured work</span>
          <h2 className="mt-4 font-serif text-4xl leading-tight">Designing products, brands & digital experiences.</h2>
          <p className="mt-4 text-neutral-300">I build premium visual systems that balance editorial refinement with product clarity.</p>
          <div className="mt-6">
            <button className="px-5 py-3 rounded-full bg-brand text-black font-bold">View All Projects</button>
          </div>
        </div>

        {/* right slider */}
        <div className="col-span-8">
          <div className="flex items-center justify-end mb-4 gap-3">
            <div className="flex items-center gap-3">
              <button aria-label="Previous" onClick={prev} className="w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 flex items-center justify-center transition-shadow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button aria-label="Next" onClick={next} className="w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 flex items-center justify-center transition-shadow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <div className="ml-4 text-sm text-neutral-400">{String(index+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
          </div>

          <div onMouseEnter={()=> setPaused(true)} onMouseLeave={()=> setPaused(false)} className="relative">
            <div className="overflow-hidden">
              <motion.div 
                ref={containerRef}
                className="flex gap-8 py-2"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={dragEnd}
                animate={{ x: -index * slideSize }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              >
                {projects.concat(projects).map((p, i)=>{
                  // render duplicated slides for smoother infinite feel
                  const key = i + '-' + p.id
                  const isActive = (i % total) === index
                  return (
                    <motion.article ref={i===0?cardRef:null} key={key} className={`bg-gradient-to-b from-white/2 to-transparent rounded-2xl overflow-hidden w-[520px]`} whileHover={{ scale: 1.02 }} style={{ zIndex: isActive? 2:1 }}>
                      <div className={`project-card-inner relative rounded-2xl slider-shadow`}>
                        <div className={`h-[70%] overflow-hidden relative`}>
                          <motion.img src={p.img} alt={p.title} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
                          <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black/60" />
                        </div>
                        <div className="p-6 h-[30%] bg-transparent">
                          <div className="flex items-center justify-between">
                            <span className="text-xs tracking-widest text-brand">{p.category}</span>
                            <span className="text-sm text-neutral-400">{p.year}</span>
                          </div>
                          <h3 className="mt-3 text-2xl font-semibold">{p.title}</h3>
                          <p className="mt-2 text-neutral-300 text-sm">{p.desc}</p>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </motion.div>
            </div>

            {/* progress bar */}
            <div className="mt-4">
              <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                <motion.div className="h-full bg-brand rounded-full" style={{ width: `${((index+1)/total)*100}%` }} layout transition={{ duration: 0.6 }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
