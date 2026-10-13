
// ===== NAVIGATION (multi-page site) =====
const pageUrlMap={home:'index.html',catalogue:'catalogue.html',services:'services.html',pricing:'pricing.html',gallery:'gallery.html',about:'about.html',reviews:'reviews.html',blog:'blog.html',faq:'faq.html',contact:'contact.html'};
function currentPageId(){const el=document.querySelector('.page');return el?el.id.replace('page-',''):'home';}
function showPage(p){
  if(p===currentPageId()){window.scrollTo({top:0,behavior:'smooth'});closeMN();return;}
  window.location.href=pageUrlMap[p]||'index.html';
}
function highlightNav(){
  const cur=currentPageId();
  document.querySelectorAll('.nav-links a, .mob-nav a').forEach(x=>x.classList.remove('active'));
  const ne=document.getElementById('nav-'+cur);if(ne)ne.classList.add('active');
}
highlightNav();
window.addEventListener('scroll',()=>{document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60);},{passive:true});
function toggleMN(){document.getElementById('mobNav').classList.toggle('open');}
function closeMN(){document.getElementById('mobNav').classList.remove('open');}

// ===== LIGHTBOX =====
let lbIndex=0,lbImgs=[],lbMode='gallery';
function openLb(i,imgs){
  if(imgs)lbImgs=imgs;
  lbIndex=i;
  const lb=document.getElementById('lb');
  document.getElementById('lb-img').src=lbImgs[i].full||lbImgs[i];
  document.getElementById('lb-counter').textContent=(i+1)+' / '+lbImgs.length;
  lb.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLb(){
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow='';
}
function lbNext(){lbIndex=(lbIndex+1)%lbImgs.length;openLb(lbIndex);}
function lbPrev(){lbIndex=(lbIndex-1+lbImgs.length)%lbImgs.length;openLb(lbIndex);}
function lbBgClose(e){if(e.target===document.getElementById('lb'))closeLb();}
document.addEventListener('keydown',e=>{
  if(!document.getElementById('lb').classList.contains('open'))return;
  if(e.key==='ArrowRight')lbNext();
  else if(e.key==='ArrowLeft')lbPrev();
  else if(e.key==='Escape')closeLb();
});
let lbTouchX=0;
document.getElementById('lb').addEventListener('touchstart',e=>{lbTouchX=e.touches[0].clientX;},{passive:true});
document.getElementById('lb').addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-lbTouchX;
  if(Math.abs(dx)>50){if(dx<0)lbNext();else lbPrev();}
},{passive:true});

// ===== PRICING CALCULATOR =====
const rates={commercial:1150,marine:1800,semi:1550};
const matNames={commercial:'Commercial Ply',marine:'Marine Ply',semi:'Semi Marine Ply'};
let selMat='commercial';
function selectMat(mat){
  selMat=mat;
  document.querySelectorAll('.mat-opt').forEach(o=>o.classList.remove('selected'));
  document.getElementById('opt-'+mat).classList.add('selected');
  calcPrice();
}
function calcFromDims(){
  const w=parseFloat(document.getElementById('widthInput').value)||0;
  const h=parseFloat(document.getElementById('heightInput').value)||0;
  if(w>0&&h>0){document.getElementById('sqftInput').value=(w*h).toFixed(1);calcPrice();}
}
function calcPrice(){
  const sqft=parseFloat(document.getElementById('sqftInput').value)||0;
  const rate=rates[selMat];const total=sqft*rate;
  const amEl=document.getElementById('crAmount');const subEl=document.getElementById('crSub');const bdEl=document.getElementById('crBreakdown');
  if(sqft<=0){amEl.textContent='₹ —';subEl.textContent='Enter square feet above to get instant estimate';bdEl.innerHTML='<strong>Material:</strong> '+matNames[selMat]+'<br><strong>Rate:</strong> ₹'+rate.toLocaleString()+'/sqft<br><strong>Area:</strong> —';return;}
  amEl.textContent='₹ '+total.toLocaleString('en-IN');
  subEl.textContent='Approx estimate for '+sqft+' sqft. Final price given after free site visit.';
  bdEl.innerHTML='<strong>Material:</strong> '+matNames[selMat]+'<br><strong>Rate:</strong> ₹'+rate.toLocaleString()+' / sqft<br><strong>Area:</strong> '+sqft+' sqft';
}
function sendCalcToWA(){
  const sqft=parseFloat(document.getElementById('sqftInput').value)||0;
  const rate=rates[selMat];const total=sqft*rate;
  let msg=sqft>0?`Hello! I used your pricing calculator:\n\n📐 Area: ${sqft} sqft\n🪵 Material: ${matNames[selMat]}\n💰 Rate: ₹${rate.toLocaleString()}/sqft\n📊 Estimated Total: ₹${total.toLocaleString('en-IN')}\n\nPlease confirm the final price and arrange a free site visit.`:`Hello! I'd like to know the pricing for wooden furniture. Please share details and arrange a free site visit.`;
  window.open(`https://wa.me/918691939871?text=${encodeURIComponent(msg)}`,'_blank');
}

// ===== CATALOGUE =====
const catData=[
  {cat:'sofa',name:'Teak Wood Sofa Set (3+1+1)',img:'1555041469-a586c61ea9bc',desc:'Solid teak 3+1+1 sofa frame with custom upholstery. Hand-sanded, long-lasting joinery.',badge:'Popular'},
  {cat:'sofa',name:'L-Shaped Corner Sofa',img:'1757969722919-1b959d258392',desc:'Large L-shaped sofa frame in sheesham wood. Custom size and fabric available.'},
  {cat:'sofa',name:'Wooden Armchair',img:'1714872245785-674ae3038d21',desc:'Classic armchair with carved arms in solid teak. Fabric or leather upholstery of your choice.'},
  {cat:'sofa',name:'2-Seater Loveseat Sofa',img:'1512212621149-107ffe572d2f',desc:'Compact 2-seater sofa for smaller living rooms. Solid wood frame, premium cushions.'},
  {cat:'sofa',name:'Rocking Chair',img:'1591880908807-ff712ec02c24',desc:'Traditional rocking chair in solid teak. Perfect for balconies, nurseries, and living rooms.'},
  {cat:'sofa',name:'Wooden Bench',img:'1735559523880-ba9ee28c4b03',desc:'Multi-purpose bench in solid wood for hallway, bedroom, or dining area.'},
  {cat:'sofa',name:'Ottoman / Pouf',img:'1503278034495-2865fce44a95',desc:'Wooden frame ottoman with foam padding and fabric cover. Custom sizes available.'},
  {cat:'sofa',name:'Wooden Swing (Jhula)',img:'1659386279441-61c8d8910a9d',desc:'Indoor/outdoor wooden swing with rope suspension. Made in solid teak.'},
  {cat:'sofa',name:'Sofa cum Bed',img:'1763565909003-46e9dfb68a00',desc:'Convertible sofa that folds into a single bed. Space-saving solid wood frame.',badge:'New'},
  {cat:'bed',name:'King Size Bed Frame',img:'1540518614846-7eded433c457',desc:'Solid teak or sheesham king-size bed with carved headboard and optional storage.'},
  {cat:'bed',name:'Queen Size Bed with Storage',img:'1616594039964-ae9021a400a0',desc:'Queen bed with hydraulic under-bed storage. Custom headboard available.',badge:'Bestseller'},
  {cat:'bed',name:'6-Door Wooden Wardrobe',img:'1672137233327-37b0c1049e77',desc:'Floor-to-ceiling wardrobe with soft-close hinges, mirrors, and custom interior.'},
  {cat:'bed',name:'Sliding Door Wardrobe',img:'1722764387679-998b2a0036ad',desc:'Space-saving sliding door wardrobe. Custom dimensions to fit any wall.'},
  {cat:'bed',name:'Wooden Dressing Table',img:'1540518614846-7eded433c457',desc:'Dressing table with large mirror, drawers, and storage shelves. Made to order.'},
  {cat:'bed',name:'Bedside Table (Set of 2)',img:'1537726235470-8504e3beef77',desc:'Solid wood bedside tables with drawer and open shelf. Custom size available.'},
  {cat:'bed',name:'Bunk Bed',img:'1723258343563-7d71a55d6dfa',desc:'Sturdy wooden bunk bed for kids. Safety rails, ladder, and under-bed storage.'},
  {cat:'bed',name:'Single Bed with Drawers',img:'1484101403633-562f891dc89b',desc:'Solid wood single bed with 2-drawer storage underneath. Great for kids rooms.'},
  {cat:'bed',name:'Study Loft Bed',img:'1588880891-491e6ce38b02',desc:'Raised loft bed with study table underneath. Space-saving for children.',badge:'New'},
  {cat:'dining',name:'6-Seater Dining Table',img:'1530018352490-5612f0b0a95c',desc:'Solid teak or sheesham 6-seater dining table. Custom dimensions available.',badge:'Popular'},
  {cat:'dining',name:'4-Seater Dining Set',img:'1505409859467-3a796fd5798e',desc:'Compact 4-seater dining table with matching chairs in solid wood.'},
  {cat:'dining',name:'Dining Chairs (Set of 6)',img:'1567538096630-e0c55bd6374c',desc:'Hand-crafted dining chairs with carved backs. Fabric or cane seating options.'},
  {cat:'dining',name:'Round Dining Table',img:'1513694203232-719a899e9541',desc:'Round 4-seater table in mango or teak wood. Classic pedestal base.'},
  {cat:'dining',name:'Extendable Dining Table',img:'1506439773649-6e0eb8cfb237',desc:'Solid wood table that extends from 4 to 8 seater. Clever space saver.'},
  {cat:'dining',name:'High Bar Table &amp; Stools',img:'1556228453-efd6c1ff04f6',desc:'Solid wood bar table with high stools. Great for kitchen counter or home bar.',badge:'New'},
  {cat:'storage',name:'Built-In Shoe Rack',img:'1556909114-f6e7ad7d3136',desc:'Custom shoe rack with doors, open shelves, and seating top. Any size.',badge:'Popular'},
  {cat:'storage',name:'Wooden Bookshelf',img:'1541123437800-1bb1317badc2',desc:'Floor-to-ceiling or wall-mounted bookshelf with adjustable shelves.'},
  {cat:'storage',name:'Chest of Drawers',img:'1595526051236-4259f75cd4b6',desc:'6-drawer chest in solid sheesham or teak. Soft-close drawers, smooth finish.'},
  {cat:'storage',name:'Console / Hallway Table',img:'1602173574-7ddc0b4e3c2e',desc:'Slim console table with storage shelf for hallways and entryways.'},
  {cat:'storage',name:'Puja Mandir (Temple)',img:'1616137337406-6c879b4a9f1b',desc:'Ornate carved wooden puja mandir with decorative jali panels. Custom design.'},
  {cat:'storage',name:'TV Unit with Drawers',img:'1555041471-bc1c7d3b2c62',desc:'Custom TV unit with cabinets, drawers, and cable management. Any width.'},
  {cat:'storage',name:'Display / Crockery Cabinet',img:'1616046229478-9901c5536096',desc:'Glass-fronted display cabinet for crockery, books, and collectibles.'},
  {cat:'office',name:'Executive Office Desk',img:'1593642632559-0c6d3fc62b89',desc:'Large executive desk in sheesham with drawers, cable slots, and storage.',badge:'Popular'},
  {cat:'office',name:'L-Shaped Corner Desk',img:'1524413096213-e96f9f5cde2e',desc:'Spacious L-shaped work desk with integrated cable management.'},
  {cat:'office',name:'Study Table with Bookshelf',img:'1522708323-d5a14b19d51c',desc:'Study table with built-in overhead bookshelf and drawers. Ideal for students.'},
  {cat:'office',name:'Conference Table',img:'1530018352490-5612f0b0a95c',desc:'Large conference table in solid teak. 6–12 seater custom sizes.'},
  {cat:'office',name:'Reception Desk',img:'1613545325268-f5c6a9b8d5c8',desc:'Front office reception desk with storage and cable management.',badge:'New'},
  {cat:'kitchen',name:'Modular Kitchen Cabinets',img:'1618220179428-22790b461013',desc:'Complete modular kitchen in solid wood or plywood with laminates.',badge:'Popular'},
  {cat:'kitchen',name:'Kitchen Island / Counter',img:'1556909114-f6e7ad7d3136',desc:'Freestanding kitchen island in solid wood. Storage shelves and butcher block top.'},
  {cat:'kitchen',name:'Pantry Cabinet / Larder',img:'1616594039964-ae9021a400a0',desc:'Full-height pantry cabinet with shelves, drawers, and pull-out baskets.'},
  {cat:'kitchen',name:'Crockery Unit',img:'1600210402020-6c8687fd1bd2',desc:'Freestanding crockery unit with glass-front doors and solid wood base drawers.'},
  {cat:'outdoor',name:'Outdoor Teak Table &amp; Chairs',img:'1598300042247-d088f8ab3a91',desc:'Weather-resistant teak garden set with UV-protective oil finish. 4-seater.',badge:'Popular'},
  {cat:'outdoor',name:'Garden Bench',img:'1565538010-9b8bece65a2e',desc:'Classic solid teak garden bench. Durable and low-maintenance.'},
  {cat:'outdoor',name:'Balcony Seating Set',img:'1516455590790-e9a9ac4c0e11',desc:'Space-saving 2-seater balcony table and chair set in treated hardwood.'},
];

let catLbImgs=[];
const CAT_PAGE_SIZE=15;
let catRevealed=0;
function buildCatLb(data){catLbImgs=data.map(d=>({full:`https://images.unsplash.com/photo-${d.img}?w=1200&q=85`,name:d.name}));}
function renderCat(data){
  buildCatLb(data);
  const g=document.getElementById('catGrid');if(!g)return;g.innerHTML='';
  const catLabels={sofa:'Sofas & Seating',bed:'Bedroom',dining:'Dining Room',storage:'Storage',office:'Home Office',kitchen:'Kitchen',outdoor:'Outdoor'};
  data.forEach((item,idx)=>{
    const c=document.createElement('div');c.className='cc'+(idx>=CAT_PAGE_SIZE?' cc-hidden':'');c.dataset.cat=item.cat;
    c.innerHTML=`<div class="cc-img" onclick="openCatZoom(${idx})" title="Click to zoom"><img src="https://images.unsplash.com/photo-${item.img}?w=480&q=75" alt="${item.name}" loading="lazy">${item.badge?`<span class="cc-badge">${item.badge}</span>`:''}<div class="cc-img-zoom"><i class="fas fa-search-plus"></i></div></div><div class="cc-info"><div class="cc-cat">${catLabels[item.cat]||item.cat}</div><div class="cc-name">${item.name}</div><div class="cc-desc">${item.desc}</div><div class="cc-foot"><span class="cc-price">On Request</span><button class="cc-eq" onclick="enq('${item.name.replace(/'/g,"\\'").replace(/&amp;/g,'and')}')">Get Quote</button></div></div>`;
    g.appendChild(c);
  });
  catRevealed=Math.min(CAT_PAGE_SIZE,data.length);
  updateCatLoadMoreBtn(data.length);
}
function showMoreCat(){
  const hidden=[...document.querySelectorAll('#catGrid .cc.cc-hidden')].slice(0,CAT_PAGE_SIZE);
  hidden.forEach((el,idx)=>{
    el.classList.remove('cc-hidden');
    el.style.animationDelay=(idx*0.05)+'s';
    el.classList.add('cc-reveal');
    el.addEventListener('animationend',()=>el.classList.remove('cc-reveal'),{once:true});
  });
  const total=document.querySelectorAll('#catGrid .cc').length;
  catRevealed=Math.min(catRevealed+CAT_PAGE_SIZE,total);
  updateCatLoadMoreBtn(total);
}
function updateCatLoadMoreBtn(total){
  const wrap=document.getElementById('catLoadMoreWrap');
  const btn=document.getElementById('catLoadMoreBtn');
  if(!wrap||!btn)return;
  const remaining=total-catRevealed;
  if(remaining<=0){
    wrap.classList.add('lm-hide');
    setTimeout(()=>{wrap.style.display='none';},380);
  }else{
    wrap.style.display='';
    wrap.classList.remove('lm-hide');
    btn.innerHTML=`<i class="fas fa-plus"></i>&nbsp; Show More Projects (${remaining} more)`;
  }
}
function openCatZoom(idx){openLb(idx,catLbImgs);}
function fCat(cat,btn){
  document.querySelectorAll('.fb').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  renderCat(cat==='all'?catData:catData.filter(x=>x.cat===cat));
}
renderCat(catData);

// ===== SERVICES =====
const svcData={
  '⭐ Most Popular':{icon:'fas fa-star',popular:true,services:[
    {t:'Modular Kitchen',d:'Complete modular kitchen cabinetry with soft-close drawers, laminates, and hardware. Most requested service in Mumbai homes.'},
    {t:'Built-In Wardrobe',d:'Floor-to-ceiling built-in wardrobe with custom interior layout — sliding or hinged doors, mirrors, and any size.'},
    {t:'Custom Sofa Making',d:'3+1+1, L-shape, or 2-seater in solid teak or sheesham. Hand-crafted frame with custom upholstery.'},
    {t:'Bed Frame Making',d:'King, queen, single — with or without hydraulic under-bed storage. Carved headboard options available.'},
    {t:'Furniture Repair',d:'Joints, broken legs, stuck drawers, cracked frames — all structural repairs done to full strength.'},
    {t:'French Polish',d:'Traditional hand-applied shellac polish. Revives old furniture and gives a deep, warm, classic sheen.'},
    {t:'TV Unit Making',d:'Custom TV unit with cabinets, shelving, and cable management. Any width to fit your wall.'},
    {t:'Dining Table Making',d:'4, 6, 8 seater in teak or sheesham. Custom dimensions. Most popular: 6-seater solid sheesham.'},
    {t:'Sofa Fabric Replacement',d:'Old or torn sofa fabric completely replaced with fabric of your choice. Foam replacement available too.'},
    {t:'Wardrobe Repair',d:'Misaligned doors, broken hinges, stuck drawers — all wardrobe issues repaired and restored.'},
  ]},
  'Furniture Making':{icon:'fas fa-pencil-ruler',services:[
    {t:'Custom Sofa Making',d:'3+1+1, L-shape, 2-seater — any sofa style in solid teak, sheesham, or oak.'},
    {t:'Bed Frame Making',d:'King, queen, single — with or without under-bed storage. Carved headboard options.'},
    {t:'Wardrobe Making',d:'Sliding or hinged doors, floor-to-ceiling, built-in — any size and finish.'},
    {t:'Dining Table Making',d:'4, 6, 8 seater round or rectangular in teak or sheesham. Custom dimensions.'},
    {t:'Coffee Table Making',d:'Live edge, classic, minimal — solid wood coffee tables in any style.'},
    {t:'TV Unit Making',d:'Custom TV unit with cabinets, shelving, and cable management. Any width.'},
    {t:'Bookshelf Making',d:'Floor-to-ceiling or wall-mounted. Adjustable shelves. Custom width and height.'},
    {t:'Study Table Making',d:'Study table with overhead shelf and drawers. Great for students and WFH.'},
    {t:'Office Desk Making',d:'Executive desk, L-shape desk, or standing desk in solid hardwood.'},
    {t:'Kitchen Cabinet Making',d:'Modular kitchen cabinetry with laminates, hardware, and soft-close drawers.'},
    {t:'Shoe Rack Making',d:'Open or closed shoe rack with seating. Custom size to fit your space.'},
    {t:'Dressing Table Making',d:'With large mirror, drawers, and lighting provision. Made to your size.'},
    {t:'Dining Chair Making',d:'Set of matching dining chairs — carved back, padded seat, any wood type.'},
    {t:'Rocking Chair Making',d:'Traditional solid wood rocking chair for living room, balcony, or nursery.'},
    {t:'Armchair Making',d:'Classic or modern armchair with solid wood frame and custom upholstery.'},
    {t:'Ottoman / Pouf Making',d:'Wooden frame ottoman with foam and fabric top. Custom sizes available.'},
    {t:'Bench Making',d:'Dining bench, bedroom end bench, hallway bench — any size and finish.'},
    {t:'Baby Cot Making',d:'Safe, smooth-edge solid wood baby cot. Convertible to toddler bed option.'},
    {t:'Puja Mandir Making',d:'Ornate carved wooden temple with jali panels, domes, and storage below.'},
    {t:'Bar Cabinet Making',d:'Solid wood bar cabinet with wine rack, glass holder, and lockable doors.'},
  ]},
  'Furniture Repair':{icon:'fas fa-tools',services:[
    {t:'Joint Tightening',d:'Loose or collapsed joints repaired using traditional wood glue and clamping.'},
    {t:'Broken Leg Repair',d:'Cracked or broken furniture legs repaired or replaced to match original.'},
    {t:'Drawer Repair',d:'Stuck, broken, or misaligned drawers repaired and properly fitted.'},
    {t:'Hinge Replacement',d:'Old, broken, or squeaking hinges replaced with new quality fittings.'},
    {t:'Sofa Frame Repair',d:'Broken sofa frame, sagging base, or damaged arms repaired structurally.'},
    {t:'Chair Frame Repair',d:'Wobbly or broken chair joints and frames repaired to full strength.'},
    {t:'Veneer Repair',d:'Peeling, bubbling, or damaged veneer surfaces stripped and re-applied.'},
    {t:'Water Damage Repair',d:'Swollen, warped, or water-damaged wood repaired and refinished.'},
    {t:'Crack & Split Repair',d:'Surface cracks and splits filled, sealed, and finished to look original.'},
    {t:'Bed Frame Repair',d:'Broken slats, sagging base, cracked headboard — all bed frame repairs.'},
    {t:'Wardrobe Door Repair',d:'Misaligned, sagging, or broken wardrobe doors adjusted and repaired.'},
    {t:'Antique Furniture Repair',d:'Heritage pieces repaired carefully preserving original character.'},
    {t:'Table Leg Levelling',d:'Uneven table and chair legs levelled and adjusted for stable placement.'},
  ]},
  'Polishing & Finishing':{icon:'fas fa-paint-brush',services:[
    {t:'French Polish (Shellac)',d:'Traditional hand-applied shellac polish giving a rich, warm, classic sheen.'},
    {t:'PU Lacquer Finish',d:'Durable polyurethane finish for high-traffic furniture. Gloss or matte options.'},
    {t:'NC Lacquer Finish',d:'Nitrocellulose lacquer — fast-drying, smooth finish for a clean modern look.'},
    {t:'Melamine Polish',d:'Hard-wearing melamine finish. Ideal for kitchen cabinets and office furniture.'},
    {t:'Natural Oil Finish',d:'Penetrating oil finish that nourishes and protects wood from within.'},
    {t:'Teak Oil Treatment',d:'Specialist teak oil for outdoor furniture. Prevents drying and cracking.'},
    {t:'Wax Polish',d:'Natural beeswax or carnauba wax polish. Subtle sheen, eco-friendly protection.'},
    {t:'Ebony Black Finish',d:'Deep black stain and lacquer for a bold furniture transformation.'},
    {t:'Walnut Stain Finish',d:'Dark walnut stain to give plain wood a rich dark-brown classic appearance.'},
    {t:'Full Refinishing',d:'Old finish stripped, wood sanded, and completely re-polished to look brand new.'},
  ]},
  'Upholstery':{icon:'fas fa-couch',services:[
    {t:'Sofa Fabric Re-covering',d:'Old or torn sofa fabric completely replaced with fabric of your choice.'},
    {t:'Leather Upholstery',d:'Genuine or faux leather upholstery for sofas, chairs, and headboards.'},
    {t:'High-Density Foam Replacement',d:'Flat or sagging cushion foam replaced with new high-density foam.'},
    {t:'Chair Cushion Replacement',d:'Dining chair and armchair cushion foam and fabric replaced.'},
    {t:'Headboard Upholstery',d:'Bed headboard padded and upholstered in fabric or leather. Button-tufted available.'},
    {t:'Custom Cushion Making',d:'New cushions made to any size, shape, and fabric. Bolsters and seat pads too.'},
    {t:'Antique Sofa Re-upholstery',d:'Old and antique sofa frames re-upholstered with period-appropriate fabrics.'},
  ]},
  'Interior Woodwork':{icon:'fas fa-home',services:[
    {t:'Modular Kitchen',d:'Full modular kitchen cabinetry with soft-close drawers, laminates, and hardware.'},
    {t:'Built-In Wardrobe',d:'Floor-to-ceiling built-in wardrobe with custom interior layout and mirrors.'},
    {t:'Wall Panelling',d:'Decorative wall panelling in solid wood or plywood for living rooms and bedrooms.'},
    {t:'False Ceiling (Wooden)',d:'Decorative wooden false ceiling panels and cladding for interior spaces.'},
    {t:'Staircase Railing',d:'Solid wood staircase handrails and balustrades. Carved or contemporary styles.'},
    {t:'Wooden Flooring',d:'Solid wood plank flooring or engineered wood — supply and fitting.'},
    {t:'TV Wall Unit',d:'Full wall TV unit with shelving, storage, and integrated lighting provision.'},
    {t:'Study / Library Room',d:'Complete study room fit-out with bookshelves, desk, and storage cabinetry.'},
  ]},
  'Doors & Windows':{icon:'fas fa-door-open',services:[
    {t:'Solid Teak Wood Door',d:'Custom solid teak entry doors — panel, flush, or carved design. Supply and fit.'},
    {t:'Carved Panel Door',d:'Intricate hand-carved door panels for a traditional, premium look.'},
    {t:'Flush Door Making',d:'Clean, smooth flush doors for interiors. Ready for any paint or veneer finish.'},
    {t:'Wooden Window Frame',d:'Solid wood window frames and shutters. Custom size and profile.'},
    {t:'Sliding Barn Door',d:'Trendy sliding barn door with wall-mounted track system. Any size.'},
    {t:'Door Repair & Alignment',d:'Warped, sticking, or sagging doors repaired and re-aligned for smooth operation.'},
  ]},
};

function renderServices(){
  const tabs=document.getElementById('svcTabs');const panels=document.getElementById('svcPanels');
  if(!tabs||!panels)return;tabs.innerHTML='';panels.innerHTML='';
  let first=true;
  Object.keys(svcData).forEach(cat=>{
    const tab=document.createElement('button');
    const isPopular=svcData[cat].popular;
    tab.className='svc-tab'+(first?' active':'')+(isPopular?' most-popular-tab':'');
    tab.textContent=cat;
    const id='svc-'+cat.replace(/[\s&★⭐]/g,'-');
    tab.onclick=function(){
      document.querySelectorAll('.svc-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.svc-panel').forEach(p=>p.classList.remove('active'));
      this.classList.add('active');document.getElementById(id).classList.add('active');
    };
    tabs.appendChild(tab);
    const panel=document.createElement('div');panel.className='svc-panel'+(first?' active':'');panel.id=id;
    svcData[cat].services.forEach(s=>{
      const extraClass=isPopular?' pop-item':'';
      const badge=isPopular?'<span class="pop-badge">🔥 Most Requested</span>':'';
      panel.innerHTML+=`<div class="svc-c${extraClass}"><div class="svc-ico"><i class="${svcData[cat].icon}"></i></div><div>${badge}<div class="svc-t">${s.t}</div><div class="svc-d">${s.d}</div></div></div>`;
    });
    panels.appendChild(panel);first=false;
  });
}
renderServices();

// ===== GALLERY =====
const galData=[
  {thumb:'1555041469-a586c61ea9bc',label:'Teak Sofa Set'},
  {thumb:'1530018352490-5612f0b0a95c',label:'Dining Table'},
  {thumb:'1558997519-83ea9252edf8',label:'Built-In Wardrobe'},
  {thumb:'1586023492125-27b2c045efd7',label:'Bedroom Set'},
  {thumb:'1593642632559-0c6d3fc62b89',label:'Executive Desk'},
  {thumb:'1598300042247-d088f8ab3a91',label:'Outdoor Set'},
  {thumb:'1541123437800-1bb1317badc2',label:'Wood Detail'},
  {thumb:'1556909114-f6e7ad7d3136',label:'Shoe Rack'},
  {thumb:'1560185007-cde436f6a4d0',label:'Baby Cot'},
  {thumb:'1504307651254-35680f356dfd',label:'Workshop'},
  {thumb:'1542621334-a254cf47733d',label:'Teak Wood'},
  {thumb:'1565538010-9b8bece65a2e',label:'Corner Sofa'},
  {thumb:'1484101403633-562f891dc89b',label:'Single Bed'},
  {thumb:'1533090161767-e6ffed986c88',label:'Rocking Chair'},
  {thumb:'1519710164239-da135433aa6e',label:'Dressing Table'},
  {thumb:'1505409859467-3a796fd5798e',label:'Dining Chairs'},
  {thumb:'1616046229478-9901c5536096',label:'Sliding Wardrobe'},
  {thumb:'1615873994984-d4f2e94d5b0a',label:'Ottoman'},
  {thumb:'1555041471-bc1c7d3b2c62',label:'Sofa cum Bed'},
  {thumb:'1602173574-7ddc0b4e3c2e',label:'Console Table'},
  {thumb:'1556228453-efd6c1ff04f6',label:'Bar Counter'},
  {thumb:'1513694203232-719a899e9541',label:'Round Table'},
  {thumb:'1540518614846-7eded433c457',label:'Vanity Mirror'},
  {thumb:'1549187774-b4e9f0445b3e',label:'Bunk Bed'},
  {thumb:'1616594039964-ae9021a400a0',label:'Wardrobe Interior'},
  {thumb:'1600585154340-be6161a56a0c',label:'Kitchen Cabinets'},
  {thumb:'1618220179428-22790b461013',label:'Modular Kitchen'},
  {thumb:'1506439773649-6e0eb8cfb237',label:'Extendable Table'},
  {thumb:'1524413096213-e96f9f5cde2e',label:'L-Shape Desk'},
  {thumb:'1537726235470-8504e3beef77',label:'Bedside Tables'},
  {thumb:'1505691723518-36a5ac3be353',label:'Dining Bench'},
  {thumb:'1595526051236-4259f75cd4b6',label:'Chest of Drawers'},
  {thumb:'1588880891-491e6ce38b02',label:'Loft Bed'},
  {thumb:'1567016432754-1abe9027cb47',label:'Carved Armchair'},
  {thumb:'1616137337406-6c879b4a9f1b',label:'Puja Mandir'},
  {thumb:'1522708323-d5a14b19d51c',label:'Study Room'},
  {thumb:'1560448204-e02f11c3d0e2',label:'Bar Cabinet'},
  {thumb:'1600210402020-6c8687fd1bd2',label:'Crockery Unit'},
  {thumb:'1613545325268-f5c6a9b8d5c8',label:'Reception Desk'},
  {thumb:'1516455590790-e9a9ac4c0e11',label:'Balcony Set'},
  {thumb:'1524758631624-e2822132143',label:'2-Seater Sofa'},
  {thumb:'1567538096630-e0c55bd6374c',label:'Hall Bench'},
  {thumb:'1416339306562-f3d12fefd36f',label:'Polish Work'},
  {thumb:'1553444836-bc0ce50daa7d',label:'Wooden Shelves'},
  {thumb:'1558618666-fcd25c85cd64',label:'Dining Setup'},
  {thumb:'1631679706909-1f6e95811f9b',label:'TV Unit'},
  {thumb:'1588854337236-6889d631faa8',label:'Study Table'},
  {thumb:'1484154218962-a197022b5858',label:'Kitchen Counter'},
  {thumb:'1556909172-54557c7e4fb7',label:'Wooden Doors'},
  {thumb:'1493663284031-b7e3aefcae37',label:'Living Room'},
];
const galLbImgs=galData.map(d=>({full:`https://images.unsplash.com/photo-${d.thumb}?w=1200&q=85`}));

// ===== GALLERY & PORTFOLIO — premium frame cards + "Show More" reveal =====
const GAL_PAGE_SIZE=10;
let galRevealed=0;
function galSeoAlt(label){return `${label} — custom carpentry &amp; furniture work in Mumbai by Wooden Furniture Making and Repairing`;}
function renderGallery(){
  const grid=document.getElementById('galGrid');if(!grid)return;grid.innerHTML='';
  galData.forEach((d,i)=>{
    const el=document.createElement('figure');
    el.className='gi'+(i>=GAL_PAGE_SIZE?' gi-hidden':'');
    el.innerHTML=`<div class="gi-frame"><img src="https://images.unsplash.com/photo-${d.thumb}?w=500&q=75&fit=crop" alt="${galSeoAlt(d.label)}" loading="lazy"><div class="gi-ov"><i class="fas fa-search-plus"></i></div></div><figcaption class="gi-label">${d.label}</figcaption>`;
    el.onclick=()=>openLb(i,galLbImgs);
    grid.appendChild(el);
  });
  galRevealed=Math.min(GAL_PAGE_SIZE,galData.length);
  updateGalCount();
  updateGalLoadMoreBtn();
}
function updateGalCount(){
  const gc=document.getElementById('galCount');if(!gc)return;
  gc.textContent=`Showing ${galRevealed} of ${galData.length} project photos`;
}
function showMoreGallery(){
  const hidden=[...document.querySelectorAll('#galGrid .gi.gi-hidden')].slice(0,GAL_PAGE_SIZE);
  hidden.forEach((el,idx)=>{
    el.classList.remove('gi-hidden');
    el.style.animationDelay=(idx*0.06)+'s';
    el.classList.add('gi-reveal');
    el.addEventListener('animationend',()=>el.classList.remove('gi-reveal'),{once:true});
  });
  galRevealed=Math.min(galRevealed+GAL_PAGE_SIZE,galData.length);
  updateGalCount();
  updateGalLoadMoreBtn();
}
function updateGalLoadMoreBtn(){
  const wrap=document.getElementById('galLoadMoreWrap');
  const btn=document.getElementById('galLoadMoreBtn');
  if(!wrap||!btn)return;
  const remaining=galData.length-galRevealed;
  if(remaining<=0){
    wrap.classList.add('lm-hide');
    setTimeout(()=>{wrap.style.display='none';},380);
  }else{
    wrap.style.display='';
    wrap.classList.remove('lm-hide');
    btn.innerHTML=`<i class="fas fa-plus"></i>&nbsp; Show More Projects (${remaining} more)`;
  }
}
renderGallery();

// ===== BEFORE / AFTER INTERACTIVE SLIDER =====
function initBeforeAfter(){
  const frame=document.getElementById('baFrame');
  const beforeWrap=document.getElementById('baBeforeWrap');
  const handle=document.getElementById('baHandle');
  if(!frame||!beforeWrap||!handle)return;
  const beforeImg=beforeWrap.querySelector('img');
  let dragging=false;

  function syncImgWidth(){beforeImg.style.width=frame.offsetWidth+'px';}
  function setPos(pct){
    pct=Math.max(0,Math.min(100,pct));
    beforeWrap.style.width=pct+'%';
    handle.style.left=pct+'%';
  }
  function moveAt(clientX){
    const rect=frame.getBoundingClientRect();
    setPos(((clientX-rect.left)/rect.width)*100);
  }

  syncImgWidth();
  window.addEventListener('resize',syncImgWidth);

  // Mouse events
  handle.addEventListener('mousedown',e=>{dragging=true;e.preventDefault();});
  window.addEventListener('mousemove',e=>{if(dragging)moveAt(e.clientX);});
  window.addEventListener('mouseup',()=>{dragging=false;});
  frame.addEventListener('click',e=>{if(!e.target.closest('.ba-handle'))moveAt(e.clientX);});

  // Touch events (swipe to drag on mobile)
  handle.addEventListener('touchstart',()=>{dragging=true;},{passive:true});
  frame.addEventListener('touchmove',e=>{
    if(!dragging)return;
    moveAt(e.touches[0].clientX);
  },{passive:true});
  window.addEventListener('touchend',()=>{dragging=false;});

  setPos(50);
}
initBeforeAfter();

// ===== QUICK PRICE ESTIMATOR & CALCULATOR =====
const qeBaseRates={
  'Sofa / Seating':{'Small (under 3ft)':[3500,5000],'Medium (3ft - 6ft)':[8000,14000],'Large (6ft+)':[16000,28000]},
  'Wardrobe / Almirah':{'Small (under 3ft)':[7000,11000],'Medium (3ft - 6ft)':[15000,26000],'Large (6ft+)':[28000,45000]},
  'Modular Kitchen':{'Small (under 3ft)':[25000,40000],'Medium (3ft - 6ft)':[55000,90000],'Large (6ft+)':[95000,160000]},
  'Dining Table':{'Small (under 3ft)':[6000,9000],'Medium (3ft - 6ft)':[12000,20000],'Large (6ft+)':[22000,35000]},
  'Bespoke Beds':{'Small (under 3ft)':[8000,13000],'Medium (3ft - 6ft)':[16000,26000],'Large (6ft+)':[28000,42000]},
};
const qeServiceMultiplier={'New Custom Making':1,'Repair & Fixing':0.35,'Sofa & Bed Polishing':0.25};
let qeSelectedSize='Small (under 3ft)';

function selectQeSize(btn,size){
  document.querySelectorAll('.qe-size-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  qeSelectedSize=size;
  calcQuickEstimate();
}
function calcQuickEstimate(){
  const serviceEl=document.getElementById('qeService');
  const furnitureEl=document.getElementById('qeFurniture');
  const amountEl=document.getElementById('qeAmount');
  if(!serviceEl||!furnitureEl||!amountEl)return;
  const service=serviceEl.value,furniture=furnitureEl.value;
  const base=qeBaseRates[furniture][qeSelectedSize];
  const mult=qeServiceMultiplier[service]||1;
  let low=Math.round((base[0]*mult)/500)*500;
  let high=Math.round((base[1]*mult)/500)*500;
  if(low<500)low=500;
  if(high<=low)high=low+1000;
  amountEl.textContent=`₹${low.toLocaleString('en-IN')} – ₹${high.toLocaleString('en-IN')}*`;
}
function sendQeToWA(){
  const service=document.getElementById('qeService').value;
  const furniture=document.getElementById('qeFurniture').value;
  const sizeShort=qeSelectedSize.split(' (')[0];
  const amount=document.getElementById('qeAmount').textContent;
  const msg=`Hi, I want to get a quote for a ${sizeShort}-sized ${furniture} — ${service} in Mumbai. Your estimator showed: ${amount}`;
  window.open(`https://wa.me/918691939871?text=${encodeURIComponent(msg)}`,'_blank');
}
calcQuickEstimate();

// ===== REVIEWS =====
const revData=[
  {name:'Priya Mehta',loc:'Bandra West, Mumbai',stars:5,date:'March 2025',text:'Got my complete dining set made — table and 6 chairs in solid sheesham. The finish is beautiful and delivery was on time. Very honest people, no hidden charges.'},
  {name:'Rohit Sharma',loc:'Andheri West, Mumbai',stars:5,date:'February 2025',text:'My old sofa frame was completely broken. They picked it up, repaired all the joints, replaced the foam, and returned it looking brand new. Price was very reasonable.'},
  {name:'Sneha Joshi',loc:'Powai, Mumbai',stars:5,date:'January 2025',text:'Full bedroom set — bed with storage, wardrobe and dressing table — all in teak. Everything was made perfectly to my measurements. Quality is outstanding.'},
  {name:'Aditya Nair',loc:'Thane West',stars:5,date:'December 2024',text:'Custom TV unit and shoe rack made. Fits the wall exactly. Polish quality is superb. They also did French polish on my old furniture — looks completely revived.'},
  {name:'Deepa Krishnan',loc:'Goregaon East, Mumbai',stars:5,date:'November 2024',text:'Modular kitchen done with marine ply and soft-close hinges. Excellent alignment, no gaps anywhere. Best carpenter work I have seen in Mumbai. Highly recommend.'},
  {name:'Vikram Patel',loc:'Malad West, Mumbai',stars:5,date:'October 2024',text:'Wardrobe repair and repolishing. The sliding door was completely jammed and the wood was peeling. They fixed everything perfectly — looks like a new wardrobe now.'},
  {name:'Ananya Shah',loc:'Juhu, Mumbai',stars:5,date:'September 2024',text:'Had a beautiful carved puja mandir made for my home. The craftsmanship is extraordinary — exactly the traditional design I wanted. Very patient with my requirements.'},
  {name:'Suresh Iyer',loc:'Chembur, Mumbai',stars:5,date:'August 2024',text:'French polish done on all my old teak furniture. The finish is gorgeous — very deep and warm. Completely transformed my living room. Came on time, finished neatly.'},
  {name:'Kavita Desai',loc:'Santacruz, Mumbai',stars:5,date:'July 2024',text:'Got sofa fabric and foam replaced. I thought I would have to buy a new sofa but they convinced me repair was worth it. Looks better than new now. Saved a lot of money.'},
  {name:'Rajesh Kulkarni',loc:'Dadar, Mumbai',stars:5,date:'June 2024',text:'Built-in wardrobe for our bedroom — floor to ceiling, both sides. Perfect finish, no wobble, doors open smoothly. Gave clear price upfront with no surprises at the end.'},
  {name:'Meena Reddy',loc:'Vile Parle, Mumbai',stars:5,date:'May 2024',text:'Antique cabinet belonging to my grandmother was repaired beautifully. They preserved the original wood and carvings while making it structurally strong. Expert hands.'},
  {name:'Sanjay Tiwari',loc:'Borivali West, Mumbai',stars:5,date:'April 2024',text:'Office desk and bookshelf made for my home office. Very solid build, exactly the size I needed. Delivered and installed within 12 days as promised. Very professional.'},
];
function renderReviews(){
  const grid=document.getElementById('revGrid');if(!grid)return;
  grid.className='rev-grid';grid.innerHTML='';
  revData.forEach(r=>{
    grid.innerHTML+=`<div class="rc"><div class="rc-top"><div class="rc-stars">${'★'.repeat(r.stars)}</div><div class="rc-date">${r.date}</div></div><div class="rc-text">"${r.text}"</div><div class="rc-auth"><div class="rc-av">${r.name[0]}</div><div><div class="rc-name">${r.name}</div><div class="rc-loc">${r.loc}</div></div></div></div>`;
  });
}
renderReviews();

// ===== BLOG =====
const blogData=[
  {img:'1542621334-a254cf47733d',tag:'Wood Care',date:'Mar 2025',title:'How to Protect Solid Wood Furniture During Mumbai\'s Monsoon',exc:'Humidity causes wood to swell, warp and crack. Here\'s how to protect your furniture through the rainy season...',full:`Mumbai's monsoon brings 85–90% humidity for months, which causes untreated wood to absorb moisture and expand. This leads to warping, cracking, swelling drawers, and joint failure over time.\n\n<strong>Key tips to protect your furniture:</strong>\n\n1. <strong>Apply teak oil or wax polish</strong> before the monsoon season (May). This seals the wood surface and reduces moisture absorption significantly.\n2. <strong>Keep furniture away from windows</strong> and direct rain exposure. Even brief water contact can stain and damage the surface.\n3. <strong>Use silica gel packets</strong> inside wardrobes and cabinets to absorb excess humidity.\n4. <strong>Run a dehumidifier</strong> in rooms with expensive solid wood furniture during peak monsoon months (June–September).\n5. <strong>Do not wipe wet wood</strong> immediately with a dry cloth — let it air dry first, then wipe gently.\n6. <strong>Check all joints</strong> after the monsoon. Humidity causes wood to move and can loosen previously tight joints.\n\nIf you notice swelling, peeling veneer, or stuck drawers after the monsoon, contact us — we offer post-monsoon repair and re-polishing services across Mumbai.`},
  {img:'1541123437800-1bb1317badc2',tag:'Buying Guide',date:'Feb 2025',title:'Teak vs Sheesham vs Mango Wood — Which is Best for Your Home?',exc:'Every wood is different. We break down the cost, durability, and best uses for the most common hardwoods...',full:`Choosing the right wood is one of the most important decisions when buying or making custom furniture. Here's a plain comparison:\n\n<strong>Teak Wood</strong> — The gold standard. Naturally water-resistant, termite-proof, and extremely durable. Ideal for outdoor furniture, kitchens, and high-use pieces. Most expensive but lasts 30–50+ years. Best for: beds, outdoor sets, high-traffic tables.\n\n<strong>Sheesham (Indian Rosewood)</strong> — Beautiful dark grain, very strong, and significantly more affordable than teak. Slightly more prone to moisture than teak but still very durable indoors. Best for: bedroom sets, dining tables, living room furniture.\n\n<strong>Mango Wood</strong> — Eco-friendly (harvested from end-of-life mango trees), beautiful natural grain patterns, and the most affordable solid hardwood. Softer than teak or sheesham. Best for: decorative tables, shelving, accent pieces.\n\n<strong>Our recommendation:</strong> For kitchens and bedrooms — teak or sheesham. For budget-conscious buyers — sheesham gives 80% of teak's durability at 60% of the price. For décor and shelves — mango wood is excellent value.`},
  {img:'1504307651254-35680f356dfd',tag:'Repair Tips',date:'Jan 2025',title:'Repair or Replace? How to Decide What to Do With Damaged Furniture',exc:'Before throwing away an old piece, consider whether it can be saved. How to tell if repair is worth it...',full:`Many customers call us ready to throw away furniture that we end up repairing beautifully for a fraction of replacement cost. Here's how to decide:\n\n<strong>Almost always worth repairing:</strong>\n• Solid hardwood pieces (teak, sheesham) — strong bones, excellent repair candidate\n• Antique or heirloom furniture — irreplaceable, always worth professional restoration\n• Expensive sofas with broken frames — reupholstery + frame repair is far cheaper than a new sofa\n• Wardrobes with door/hinge issues — usually a ₹500–₹2,000 fix\n\n<strong>Consider replacing if:</strong>\n• MDF or particle board furniture that has swollen from water damage — the material itself has failed\n• Completely rotten or termite-infested wood — structural integrity is gone\n• Cheap imported pieces where repair cost exceeds replacement value\n\n<strong>Our rule of thumb:</strong> If the main wood is solid hardwood, it's almost always worth repairing. Send us a WhatsApp photo and we'll give you an honest assessment — free of charge.`},
  {img:'1555041469-a586c61ea9bc',tag:'Design',date:'Dec 2024',title:'5 Furniture Arrangements That Make Small Mumbai Flats Look Bigger',exc:'Smart furniture placement can completely change the feel of a small room. Layouts that actually work...',full:`Mumbai flats are notoriously compact. The right furniture size and arrangement can make a 1BHK feel spacious and breathable.\n\n<strong>1. Choose legs over bases</strong> — Furniture with visible legs (sofas, beds, sideboards) creates a visual gap between the floor and the piece, making the room feel taller and more open.\n\n<strong>2. Wall-mount where possible</strong> — A floating TV unit or wall-mounted shelves free up floor space and make the room feel larger instantly.\n\n<strong>3. Sofa against the wall</strong> — In small living rooms, keeping the sofa against the wall opens up the centre of the room for movement.\n\n<strong>4. Use multi-functional furniture</strong> — Beds with under-storage, sofa-cum-beds, ottomans with hidden storage. Every piece should do double duty.\n\n<strong>5. Custom-size everything</strong> — Standard furniture rarely fits Mumbai apartments well. Custom-made furniture at the exact dimensions needed eliminates wasted space and awkward gaps. This is why so many Mumbai customers choose custom over showroom pieces.`},
  {img:'1558997519-83ea9252edf8',tag:'Bedroom',date:'Nov 2024',title:'Built-In Wardrobe vs Free-Standing: Which Should You Choose?',exc:'We explain the pros and cons of both — to help you make the right decision for your bedroom and budget...',full:`This is one of the most common questions we get. Here's an honest comparison:\n\n<strong>Built-In Wardrobe (Custom Made)</strong>\n✅ Uses 100% of the wall space — no wasted corners or gaps\n✅ Can be made exactly to your ceiling height\n✅ Adds real estate value to the flat\n✅ More storage capacity for the same floor area\n❌ Higher initial cost (₹18,000–₹40,000+ depending on size)\n❌ Cannot be taken when you move\n\n<strong>Free-Standing Wardrobe</strong>\n✅ More affordable upfront (branded: ₹8,000–₹20,000)\n✅ Moveable when you shift homes\n❌ Awkward gaps near walls and ceiling (collect dust)\n❌ Usually MDF or particleboard — less durable\n❌ Limited interior customisation\n\n<strong>Our verdict:</strong> If you own your flat or plan to stay 5+ years, a custom built-in wardrobe is clearly the better investment. If you rent and move frequently, a free-standing makes more sense.`},
  {img:'1560185007-cde436f6a4d0',tag:'Finishing',date:'Oct 2024',title:'French Polish vs PU Lacquer vs Wax — Which Finish is Right?',exc:'The finish affects look, feel, and durability of your furniture. A plain-language guide to popular options...',full:`The finish on your furniture affects how it looks, how it feels, how it smells, and how long it lasts. Here's a plain guide:\n\n<strong>French Polish (Shellac)</strong> — Traditional, hand-applied, gorgeous warm glow. Brings out the grain beautifully. Preferred for antiques and high-end teak furniture. Not water or heat resistant — use coasters. Best for: heirloom pieces, traditional décor, antique restoration.\n\n<strong>PU Lacquer (Polyurethane)</strong> — Synthetic, hard-wearing, water and scratch resistant. Available in matte, satin, and gloss. Best for high-use furniture like kitchen cabinets, dining tables, children's furniture. Looks more modern and plasticky than French polish. Best for: kitchens, high-traffic pieces, modern interiors.\n\n<strong>NC Lacquer</strong> — Similar to PU but faster drying and easier to repair. Good balance of durability and appearance. Most common for office and commercial furniture.\n\n<strong>Wax / Oil Finish</strong> — Natural, zero VOC, beautiful tactile feel. Needs re-application every 1–2 years. Best for: eco-conscious customers, rustic/natural style furniture.\n\n<strong>Our recommendation:</strong> For most homes — French polish for traditional pieces, PU lacquer for kitchens and high-use furniture. When in doubt, ask us — we'll guide you based on your wood type and usage.`},
];

function renderBlog(){
  const grid=document.getElementById('blogGrid');if(!grid)return;grid.innerHTML='';
  blogData.forEach((b,i)=>{
    const el=document.createElement('div');el.className='blg-c';
    el.innerHTML=`<div class="blg-img"><img src="https://images.unsplash.com/photo-${b.img}?w=600&q=80" alt="${b.title}" loading="lazy"></div><div class="blg-con"><div class="blg-meta"><span class="blg-tag">${b.tag}</span><span class="blg-date">${b.date}</span></div><div class="blg-title">${b.title}</div><div class="blg-exc" id="exc-${i}">${b.exc}</div><div class="blg-full" id="full-${i}">${b.full.replace(/\n/g,'<br>')}</div><div class="blg-more" id="more-${i}" onclick="toggleBlog(${i})"><span id="more-text-${i}">Read More</span><i class="fas fa-chevron-down rm-icon" id="more-icon-${i}"></i></div></div>`;
    grid.appendChild(el);
  });
}
function toggleBlog(i){
  const full=document.getElementById('full-'+i);
  const exc=document.getElementById('exc-'+i);
  const txt=document.getElementById('more-text-'+i);
  const icon=document.getElementById('more-icon-'+i);
  const isOpen=full.classList.contains('open');
  full.classList.toggle('open',!isOpen);
  exc.style.display=isOpen?'':'none';
  txt.textContent=isOpen?'Read More':'Read Less';
  icon.style.transform=isOpen?'':'rotate(180deg)';
}
renderBlog();

// ===== FAQ =====
const faqData=[
  {q:'How long does custom furniture take to make?',a:'A single item like a table takes 7–14 days. Wardrobes and larger pieces take 3–4 weeks. Modular kitchens are estimated after site visit. We provide a clear timeline upfront.'},
  {q:'What types of wood do you use?',a:"We work primarily with teak, sheesham (Indian rosewood), mango wood, oak, and pine. Teak is the most durable and termite-resistant. You choose based on your budget — we'll guide you."},
  {q:'What ply material should I choose?',a:'For kitchens and bathrooms — always Marine Ply (₹1,800/sqft) as it is waterproof. For wardrobes and bedrooms — Semi Marine Ply (₹1,550/sqft) is the best value. For storage, shelves, and basic cabinets — Commercial Ply (₹1,150/sqft) works well.'},
  {q:'Can I negotiate the price?',a:'Yes, absolutely. The calculator gives you a starting estimate. Final prices are discussed after the site visit and are flexible based on your budget and requirements. We work with all budgets.'},
  {q:'Do you visit my home for measurements?',a:'Yes — free home visits across Mumbai. We take measurements, understand requirements, and give an accurate quote. Just call or WhatsApp to schedule.'},
  {q:'Can you repair antique or heirloom furniture?',a:'Yes — we repair all types regardless of age. Joints, frames, surfaces, refinishing — done carefully to preserve the original character of older pieces.'},
  {q:'Do you offer pickup and delivery in Mumbai?',a:'Yes — for repairs, we pick up from your home, fix in our workshop, and deliver back. New furniture is delivered and installed at your location. Available across Mumbai.'},
  {q:'How do I get a price estimate?',a:'Use our online Price Calculator on the Pricing page to get an instant estimate. Or WhatsApp +91 86919 39871 with a description or photo — we reply quickly.'},
  {q:'What finishes do you offer?',a:'French polish, PU lacquer, NC lacquer, natural oil, wax, melamine, and custom stain colours. We recommend the best option for your wood type and usage.'},
  {q:'Are you on Google Maps?',a:'Yes — listed as "Wooden furniture making and repairing" on Google Business Profile. Find us using plus code 3WR8+V2 Mumbai, Maharashtra. We have 100+ verified Google reviews.'},
];
function renderFaq(){
  const list=document.getElementById('faqList');if(!list)return;list.innerHTML='';
  faqData.forEach((f,i)=>{
    const it=document.createElement('div');it.className='faq-it'+(i===0?' open':'');
    it.innerHTML=`<div class="faq-q" onclick="tFaq(this)"><h4>${f.q}</h4><div class="faq-ico"><i class="fas fa-plus"></i></div></div><div class="faq-ans"><p>${f.a}</p></div>`;
    list.appendChild(it);
  });
}
renderFaq();
function tFaq(el){const it=el.closest('.faq-it'),isO=it.classList.contains('open');document.querySelectorAll('.faq-it').forEach(i=>i.classList.remove('open'));if(!isO)it.classList.add('open');}

// ===== FORM & UTILS =====
function enq(name){window.open(`https://wa.me/918691939871?text=${encodeURIComponent('Hello! I\'m interested in "'+name+'". Please share details and pricing.')}`, '_blank');}

// ---- GOOGLE SHEETS LEAD CAPTURE ----
// 1. Create/open a Google Sheet, go to Extensions > Apps Script, paste the
//    Code.gs provided alongside this file, then Deploy > New deployment > Web app
//    (Execute as: Me, Who has access: Anyone) and copy the /exec URL below.
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxouUQtRM9ucY56kS_3TTAlUdiWRzOZboOAuMEz2Eo2Biqmr22uzWP1w1lmv9HRAqeg/exec';
function sendLeadToSheet(fields){
  if(!GAS_WEB_APP_URL||GAS_WEB_APP_URL.indexOf('PASTE_YOUR')===0)return; // not configured yet — skip silently
  const body=new URLSearchParams(fields);
  fetch(GAS_WEB_APP_URL,{method:'POST',mode:'no-cors',body}).catch(()=>{/* fail silently, don't block the lead */});
}
function readContactForm(){
  return{
    name:document.getElementById('cf-name').value.trim(),
    phone:document.getElementById('cf-phone').value.trim(),
    email:document.getElementById('cf-email').value.trim(),
    service:document.getElementById('cf-service').value,
    message:document.getElementById('cf-message').value.trim()
  };
}
function subFormLead(){
  const{name:n,phone:p,email:e,service:s,message:m}=readContactForm();
  if(!n||!p||!s||!m){showN('Please fill all required fields','Name, phone, service and message are required.','#c0392b');return;}
  sendLeadToSheet({name:n,phone:p,email:e,service:s,message:m,channel:'Send Message (Direct)'});
  showN('Message Sent!','We\'ve received your enquiry — we\'ll get back to you within 2 hours.','#25D366');
  document.getElementById('cf-name').value='';
  document.getElementById('cf-phone').value='';
  document.getElementById('cf-email').value='';
  document.getElementById('cf-service').value='';
  document.getElementById('cf-message').value='';
}
function subForm(){
  const{name:n,phone:p,email:e,service:s,message:m}=readContactForm();
  if(!n||!p||!s||!m){showN('Please fill all required fields','Name, phone, service and message are required.','#c0392b');return;}
  sendLeadToSheet({name:n,phone:p,email:e,service:s,message:m,channel:'WhatsApp'});
  const wa=`Hello! My name is *${n}*.\n📞 Phone: ${p}${e?'\n📧 Email: '+e:''}\n🔧 Service: *${s}*\n\n📝 Message:\n${m}`;
  showN('Opening WhatsApp...','Your message is ready to send.','#25D366');
  setTimeout(()=>window.open(`https://wa.me/918691939871?text=${encodeURIComponent(wa)}`,'_blank'),700);
}
function subFormEmail(){
  const{name:n,phone:p,email:e,service:s,message:m}=readContactForm();
  if(!n||!p||!s||!m){showN('Please fill all required fields','Name, phone, service and message are required.','#c0392b');return;}
  sendLeadToSheet({name:n,phone:p,email:e,service:s,message:m,channel:'Email'});
  const subject=`Enquiry from ${n} — ${s}`;
  const body=`Name: ${n}\nPhone: ${p}\nEmail: ${e||'-'}\nService: ${s}\n\nMessage:\n${m}`;
  showN('Opening Email...','Your message is ready to send.','#D93025');
  setTimeout(()=>window.open(`mailto:furnituremakingandrepairing@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,'_blank'),500);
}
function showN(t,s,col){
  const no=document.getElementById('notif');
  document.getElementById('nt').textContent=t;document.getElementById('ns').textContent=s;
  no.style.borderLeftColor=col||'var(--gold)';no.classList.add('show');
  setTimeout(()=>no.classList.remove('show'),3400);
}

// ===== SCROLL ANIMATIONS =====
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';}});},{threshold:0.06,rootMargin:'0px 0px -30px 0px'});
function animateCards(){
  document.querySelectorAll('.feat-c,.cc,.svc-c,.blg-c,.rc,.wood-c,.ab-val,.ph-card,.pc-card,.ls-card,.qe-wrap,.ba-wrap,.geo-col').forEach(el=>{
    if(!el.dataset.animated){el.dataset.animated='1';el.style.opacity='0';el.style.transform='translateY(18px)';el.style.transition='opacity 0.45s ease,transform 0.45s ease';obs.observe(el);}
  });
}
window.addEventListener('load',animateCards);
animateCards();
