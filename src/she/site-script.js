
/* ===== IntersectionObserver declared FIRST (TDZ-safe) ===== */
var io;
(function(){
  if('IntersectionObserver' in window){
    io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target);
          if(e.target.id==='stats'){runCounts();}
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  } else {
    io={observe:function(el){el.classList.add('vis');if(el.id==='stats'){runCounts();}},unobserve:function(){}};
  }
})();
function observe(el){try{if(el)io.observe(el);}catch(e){}}
function observeAll(sel,ctx){ (ctx||document).querySelectorAll(sel).forEach(observe); }

/* ===== DATA ===== */
var SUPPLY=[
 {ico:'<svg viewBox="0 0 24 24"><path d="M12 3s6 6.5 6 10.5A6 6 0 016 13.5C6 9.5 12 3 12 3z"/><path d="M3 6c1.6-1.2 3.4-1.2 5 0M16 6c1.6-1.2 3.4-1.2 5 0"/></svg>',en:'Atmospheric Water Generation (AWG)',ar:'توليد المياه من الهواء (AWG)',den:'A unique water solution: drinking-quality water generated directly from air humidity — delivered with our partner Uravu Labs. Off-grid, renewable-powered units for sites, communities, industry and data-centre cooling.',dar:'حل مائي فريد: مياه صالحة للشرب تُنتج مباشرة من رطوبة الهواء — بالتعاون مع شريكنا أورافو لابس. وحدات تعمل خارج الشبكة وبالطاقة المتجددة للمواقع والمجتمعات والصناعة وتبريد مراكز البيانات.',subs:['Water from air','Off-grid units','Renewable-powered','Site & community supply','Data-centre cooling']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>',en:'Construction & Building Materials',ar:'مواد البناء والإنشاءات',den:'Full range for residential & commercial projects, plus construction tools.',dar:'مجموعة كاملة للمشاريع السكنية والتجارية، إضافة إلى أدوات البناء.',subs:['Cement & aggregates','Finishing materials','Construction tools','Fixings']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>',en:'Electrical Consumables',ar:'المستهلكات الكهربائية',den:'Wiring, fittings, contactors, lamps and electrical supplies.',dar:'أسلاك وتوصيلات وكونتاكتورات ومصابيح ومستلزمات كهربائية.',subs:['Wiring & cables','Contactors','Lamps & starters','Fittings']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M8 4v16M4 9h4M4 14h4"/></svg>',en:'Office Supplies & Stationery',ar:'المستلزمات المكتبية والقرطاسية',den:'Everyday consumables and stationery for offices of every size.',dar:'مستهلكات وقرطاسية يومية للمكاتب بمختلف أحجامها.',subs:['Paper & printing','Stationery','Filing','Consumables']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M12 2v6M9 5h6"/><rect x="4" y="8" width="16" height="13" rx="2"/><path d="M9 14h6M12 11v6"/></svg>',en:'Medicine & Medical Consumables',ar:'الأدوية والمستهلكات الطبية',den:'One of our deepest catalogs — PPE, first-aid, diagnostics, AEDs and OTC medicines.',dar:'من أعمق كتالوجاتنا — وقاية شخصية وإسعافات وأجهزة تشخيص ومزيلات رجفان وأدوية.',subs:['First-aid & bandages','BP monitors & oximeters','AEDs & stretchers','O2 & clinic furniture','OTC medicines']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>',en:'Safety & Security Equipment (PPE)',ar:'معدات السلامة والأمن',den:'Helmets, shoes, gloves, eye/face, hearing & respiratory protection, hi-viz, harnesses.',dar:'خوذ وأحذية وقفازات وحماية للعين والوجه والسمع والتنفس وسترات عاكسة وأحزمة أمان.',subs:['Safety helmets & shoes','Gloves & eye/face','Respiratory & hearing','Hi-viz & harnesses']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M12 22c4-2 6-5 6-9a6 6 0 00-12 0c0 4 2 7 6 9z"/><path d="M12 4c1 2 1 3 0 5-2-1-2-3 0-5z"/></svg>',en:'Fire-Fighting & Alarm Systems',ar:'أنظمة مكافحة الحرائق والإنذار',den:'Extinguishers, detection and alarm systems for facilities and sites.',dar:'طفايات وأنظمة كشف وإنذار للمنشآت والمواقع.',subs:['Extinguishers','Smoke & heat detection','Alarm panels','Signage']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M2 7h13v10H2z"/><path d="M15 10l5-3v10l-5-3"/><circle cx="8.5" cy="12" r="2"/></svg>',en:'Security Cameras & Installation',ar:'كاميرات المراقبة والتركيب',den:'CCTV supply and professional installation for premises of any scale.',dar:'توريد كاميرات مراقبة وتركيب احترافي للمنشآت بمختلف أحجامها.',subs:['IP & analog CCTV','NVR/DVR','Cabling & install','Monitoring']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M3 9l1-4h16l1 4M4 9h16v11H4z"/><path d="M9 13h6"/></svg>',en:'Grocery & Kitchenwares',ar:'البقالة وأدوات المطبخ',den:'Foodstuffs, groceries and kitchenware for institutional and commercial use.',dar:'مواد غذائية وبقالة وأدوات مطبخ للاستخدام المؤسسي والتجاري.',subs:['Dry & canned goods','Kitchen utensils','Cleaning supplies','Disposables']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M3 10h18v10H3zM6 10V6a2 2 0 012-2h8a2 2 0 012 2v4M8 20v-4M16 20v-4"/></svg>',en:'Furniture & Accessories',ar:'الأثاث وملحقاته',den:'Office, institutional and site furniture with all accessories.',dar:'أثاث مكتبي ومؤسسي وموقعي مع كل الملحقات.',subs:['Office furniture','Storage & shelving','Seating','Fixtures']},
 {ico:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',en:'Mechanical Supplies',ar:'التوريدات الميكانيكية',den:'Mechanical parts, tools and components for maintenance and operations.',dar:'قطع وأدوات ومكونات ميكانيكية للصيانة والتشغيل.',subs:['Fasteners & bearings','Hand & power tools','Pumps & valves','Spare parts']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M2 20h20M4 20V8l8-5 8 5v12M9 20v-5h6v5"/><path d="M4 12h16"/></svg>',en:'Industrial Installation Supplies',ar:'مستلزمات التركيبات الصناعية',den:'Materials and equipment for industrial installations and fit-outs.',dar:'مواد ومعدات للتركيبات والتجهيزات الصناعية.',subs:['Piping & ducting','Structural fixings','Industrial fittings','Site equipment']},
 {ico:'<svg viewBox="0 0 24 24"><path d="M6 2l3 4 3-2 3 2 3-4v9a4 4 0 01-4 4H10a4 4 0 01-4-4V2z"/><path d="M9 22h6"/></svg>',en:'Uniforms for All Sectors',ar:'الأزياء الموحدة لجميع القطاعات',den:'Workwear and uniforms tailored for every industry and role.',dar:'ملابس عمل وأزياء موحّدة مصممة لكل قطاع ودور.',subs:['Industrial workwear','Medical scrubs','Corporate uniforms','Hospitality attire']},
 {ico:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10h3l3 4v4h-6"/><path d="M8 9l-2 4h4l-2 4"/></svg>',en:'Uninterruptible Power Supply (UPS)',ar:'أنظمة الطاقة غير المنقطعة (UPS)',den:'Supply, installation and maintenance of UPS systems and voltage regulators — from 20 KVA to 120 KVA — for data centres, banks, factories, laboratories and government facilities. Two-year warranty, Riyadh service centre and factory-trained engineers.',dar:'توريد وتركيب وصيانة أنظمة الطاقة غير المنقطعة ومنظمات الجهد — من ٢٠ إلى ١٢٠ كيلو فولت أمبير — لمراكز البيانات والبنوك والمصانع والمختبرات والجهات الحكومية. ضمان سنتين ومركز خدمة في الرياض ومهندسون مدرّبون.',subs:['UPS 20–120 KVA','Voltage regulators','Data-centre power','Batteries & spares','Installation & maintenance','2-year warranty']}
];

/* Projects — ranked by prestige & opportunity. Photos are representative/illustrative. */
var PROJECTS=[
 {img:'img/projects/kafd.jpg',en:'King Abdullah Financial District',ar:'مركز الملك عبدالله المالي',tag:'KAFD · Riyadh'},
 {img:'img/projects/qiddiya.jpg',en:'Qiddiya',ar:'القدية',tag:'Entertainment City · Riyadh'},
 {img:'img/projects/neom.jpg',en:'NEOM',ar:'نيوم',tag:'Giga-project · Tabuk'},
 {img:'img/projects/new-murabba.jpg',en:'New Murabba (The Mukaab)',ar:'المربع الجديد (المكعب)',tag:'Giga-project · Riyadh'},
 {img:'img/projects/diriyah.jpg',en:'Diriyah',ar:'الدرعية',tag:'Heritage Giga-project · Riyadh'},
 {img:'img/projects/roshn.jpg',en:'ROSHN',ar:'روشن',tag:'Communities · Kingdom-wide'},
 {img:'img/projects/ksp.jpg',en:'King Salman Park',ar:'حديقة الملك سلمان',tag:'Urban Park · Riyadh'},
 {img:'img/projects/ksia.jpg',en:'King Salman International Airport',ar:'مطار الملك سلمان الدولي',tag:'Aviation · Riyadh'},
 {img:'img/projects/riyadh-metro.jpg',en:'Riyadh Metro',ar:'مترو الرياض',tag:'Transit · Riyadh'},
 {img:'img/projects/kapsarc.jpg',en:'KAPSARC',ar:'كابسارك',tag:'Research City · Riyadh'},
 {img:'img/projects/itcc.jpg',en:'ITCC',ar:'مجمع تقنية المعلومات',tag:'IT & Comms Complex · Riyadh'},
 {img:'img/projects/sdaia.jpg',en:'SDAIA Headquarters',ar:'مقر سدايا',tag:'Data & AI Authority · Riyadh'},
 {img:'img/projects/kkia.jpg',en:'King Khalid International Airport',ar:'مطار الملك خالد الدولي',tag:'Aviation · Riyadh'},
 {img:'img/projects/ksab.jpg',en:'King Salman Air Base',ar:'قاعدة الملك سلمان الجوية',tag:'Defense · Riyadh'},
 {img:'img/projects/kfaa.jpg',en:'King Faisal Air Academy',ar:'كلية الملك فيصل الجوية',tag:'Defense · Al-Majma’ah'},
 {img:'img/projects/national-guard.jpg',en:'National Guard Facilities',ar:'مرافق الحرس الوطني',tag:'Government · Riyadh'},
 {img:'img/projects/saudi-railway.jpg',en:'Saudi Railway (SAR)',ar:'الخطوط الحديدية السعودية',tag:'Rail · Kingdom-wide'},
 {img:'img/projects/ups-datacenter.jpg',en:'Government Data Centre',ar:'مركز بيانات حكومي',tag:'UPS 120 KVA · Riyadh'},
 {img:'img/projects/ups-bank.jpg',en:'National Commercial Bank',ar:'البنك الأهلي التجاري',tag:'UPS & Regulators · Kingdom-wide'},
 {img:'img/projects/ups-factory.jpg',en:'Production Line',ar:'خط إنتاج',tag:'UPS 60 KVA · Industrial'},
 {img:'img/projects/ups-lab.jpg',en:'Laboratory Systems',ar:'أنظمة مختبرية',tag:'UPS 20 KVA · Laboratory'}
];

/* Clients — real logos extracted from client references. */
var CLIENTS=[
 {img:'img/clients/al-bawani.png',name:'Al Bawani'},
 {img:'img/clients/al-rajhi.png',name:'Al-Rajhi Building & Constructions'},
 {img:'img/clients/nesma.png',name:'Nesma & Partners'},
 {img:'img/clients/shapoorji.png',name:'Shapoorji Pallonji'},
 {img:'img/clients/webuild.png',name:'WeBuild (Salini Impregilo)'},
 {img:'img/clients/al-muhaidib.png',name:'Al Muhaidib'},
 {img:'img/clients/drake-scull.png',name:'Drake & Scull'},
 {img:'img/clients/nas-jv.png',name:'NAS Joint Venture'},
 {img:'img/clients/bss-jv.png',name:'BSS Joint Venture'},
 {img:'img/clients/ghantoot.png',name:'Ghantoot Group'},
 {img:'img/clients/otis.png',name:'Otis'},
 {img:'img/clients/al-tayyar.png',name:'Al Tayyar'},
 {img:'img/clients/casa-piu.png',name:'Casa Piu'},
 {img:'img/clients/masa.png',name:'MASA'},
 {img:'img/clients/kudu.png',name:'Kudu'},
 {img:'img/clients/shamel.png',name:'Shamel International'},
 {img:'img/clients/shaleem.png',name:'Shaleem Petroleum'}
];
var SECTORS=[
 {img:'img/construction.jpg',en:'Construction & Contracting',ar:'الإنشاءات والمقاولات'},
 {img:'img/medical.jpg',en:'Healthcare & Clinics',ar:'الرعاية الصحية والعيادات'},
 {img:'img/electrical.jpg',en:'Industrial & Manufacturing',ar:'الصناعة والتصنيع'},
 {img:'img/warehouse.jpg',en:'Government & Institutions',ar:'الجهات الحكومية والمؤسسات'},
 {img:'img/office.jpg',en:'Offices & Corporate',ar:'المكاتب والشركات'},
 {img:'img/transport.jpg',en:'Transport & Logistics',ar:'النقل والخدمات اللوجستية'},
 {img:'img/logistics.jpg',en:'Facilities & Security',ar:'المرافق والأمن'},
 {img:'img/hospitality.jpg',en:'Hospitality & Services',ar:'الضيافة والخدمات'}
];
var WHY=[
 {en:'One point of contact',ar:'نقطة اتصال واحدة',den:'Fourteen product lines from a single accountable partner — not a dozen scattered vendors.',dar:'أربعة عشر خط منتجات من شريك واحد مسؤول — بدلاً من عشرات المورّدين المتفرقين.'},
 {en:'50+ years of reliability',ar:'أكثر من ٥٠ عاماً من الموثوقية',den:'A Saudi-owned house trading since 1971, with a proven, nationwide track record.',dar:'بيت خبرة سعودي يعمل بالتجارة منذ ١٩٧١، بسجل حافل على مستوى المملكة.'},
 {en:'An expert team',ar:'فريق من الخبراء',den:'Engineers, pharmacists, food and safety experts vet what we supply.',dar:'مهندسون وصيادلة وخبراء أغذية وسلامة يفحصون ما نورّده.'},
 {en:'Local + global sourcing',ar:'توريد محلي وعالمي',den:'Strategic partnerships let us procure quality products at the best value.',dar:'شراكات استراتيجية تتيح لنا شراء منتجات عالية الجودة بأفضل قيمة.'},
 {en:'Short-notice fulfilment',ar:'تلبية بمهلة قصيرة',den:'We keep pace with fast-moving projects and deliver even specialized items quickly.',dar:'نواكب المشاريع سريعة الحركة ونُسلّم حتى الأصناف المتخصصة بسرعة.'},
 {en:'Quality at fair prices',ar:'جودة بأسعار عادلة',den:'Market-leading products at reasonable prices — value, not just volume.',dar:'منتجات رائدة بأسعار معقولة — قيمة حقيقية، لا مجرد كميات.'}
];

/* ===== FALLBACK for images ===== */
function mediaFallback(img,label){
  try{
    if(img.dataset.fb)return; img.dataset.fb='1';
    var p=img.parentElement; img.style.display='none';
    var d=document.createElement('div'); d.className='media-fallback';
    d.innerHTML='<svg viewBox="0 0 48 40" fill="none" stroke="#fff" stroke-width="2"><path d="M6 34V24a5 5 0 0110 0v10"/><path d="M19 34V17a6 6 0 0112 0v17"/><path d="M34 34V10a5.5 5.5 0 0111 0v24"/></svg><span>'+(label||'SHE')+'</span>';
    p.appendChild(d);
  }catch(e){}
}
window.mediaFallback=mediaFallback;

/* ===== RENDER ===== */
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function txt(node){return LANG==='ar'?node.ar:node.en;}

function renderSupply(){
  var g=document.getElementById('supplyGrid'); if(!g)return; g.innerHTML='';
  SUPPLY.forEach(function(s,i){
    var subs=s.subs.map(function(x){return '<span>'+x+'</span>';}).join('');
    var c=el('div','supply-card',
      '<svg class="arch-tab" viewBox="0 0 48 40" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 34V24a5 5 0 0110 0v10"/><path d="M19 34V17a6 6 0 0112 0v17"/><path d="M34 34V10a5.5 5.5 0 0111 0v24"/></svg>'+
      '<div class="ico">'+s.ico+'</div>'+
      '<h3 data-en="'+s.en+'" data-ar="'+s.ar+'">'+s.en+'</h3>'+
      '<div class="t-ar" data-en="'+s.ar+'" data-ar="'+s.en+'">'+s.ar+'</div>'+
      '<p data-en="'+s.den+'" data-ar="'+s.dar+'">'+s.den+'</p>'+
      '<div class="subs">'+subs+'</div>');
    c.addEventListener('click',function(){c.classList.toggle('open');});
    g.appendChild(c);
  });
  // Add 13th CTA card
  var cta=el('div','supply-card cta-card',
    '<div class="cta-inner">'+
    '<h3 data-en="Need something else?" data-ar="هل تحتاج إلى شيء آخر؟">Need something else?</h3>'+
    '<p data-en="Let\'s talk about your requirements." data-ar="دعنا نتحدث عن احتياجاتك.">Let\'s talk about your requirements.</p>'+
    '<a href="#contact" class="btn btn-primary" data-en="Contact Us" data-ar="اتصل بنا">Contact Us'+
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>'+
    '</div>');
  g.appendChild(cta);
}
function renderSectors(){
  var g=document.getElementById('sectorGrid'); if(!g)return; g.innerHTML='';
  SECTORS.forEach(function(s){
    var d=el('div','sector reveal',
      '<div class="ph" style="position:absolute;inset:0"></div>'+
      '<img src="'+s.img+'" alt="'+s.en+'" loading="lazy" decoding="async" onerror="mediaFallback(this,\''+s.en.replace(/'/g,'')+'\')">'+
      '<div class="lbl"><span data-en="'+s.en+'" data-ar="'+s.ar+'">'+s.en+'</span><small data-en="'+s.ar+'" data-ar="'+s.en+'">'+s.ar+'</small></div>');
    g.appendChild(d);
  });
  observeAll('.sector',g);
}
function renderWhy(){
  var g=document.getElementById('whyGrid'); if(!g)return; g.innerHTML='';
  WHY.forEach(function(w,i){
    var n=('0'+(i+1)).slice(-2);
    g.appendChild(el('div','why-card reveal',
      '<div class="wn">'+n+'</div>'+
      '<h4 data-en="'+w.en+'" data-ar="'+w.ar+'">'+w.en+'</h4>'+
      '<p data-en="'+w.den+'" data-ar="'+w.dar+'">'+w.den+'</p>'));
  });
  observeAll('.why-card',g);
}
var PROJ_INIT=8;
function renderProjects(){
  var g=document.getElementById('projectGrid'); if(!g)return; g.innerHTML='';
  PROJECTS.forEach(function(p,i){
    var hidden=i>=PROJ_INIT?' is-hidden':'';
    var d=el('div','project-card reveal'+hidden,
      '<div class="ph" style="position:absolute;inset:0;z-index:0"></div>'+
      '<img src="'+p.img+'" alt="'+p.en+'" loading="lazy" decoding="async" onerror="mediaFallback(this,\''+p.en.replace(/'/g,'')+'\')">'+
      '<div class="pc-rank">'+(i+1)+'</div>'+
      '<div class="pc-body">'+
        '<div class="pc-tag">'+p.tag+'</div>'+
        '<h4 data-en="'+p.en+'" data-ar="'+p.ar+'">'+p.en+'</h4>'+
        '<div class="pc-ar" data-en="'+p.ar+'" data-ar="'+p.en+'">'+p.ar+'</div>'+
      '</div>');
    g.appendChild(d);
  });
  observeAll('.project-card:not(.is-hidden)',g);
  var btn=document.getElementById('projMore');
  if(btn){
    btn.addEventListener('click',function(){
      g.querySelectorAll('.project-card.is-hidden').forEach(function(c){c.classList.remove('is-hidden');observe(c);});
      btn.style.display='none';
    });
  }
}
function renderClients(){
  function tile(c){
    return '<div class="client-tile" title="'+c.name+'"><img src="'+c.img+'" alt="'+c.name+'" loading="lazy" decoding="async" onerror="mediaFallback(this,\''+c.name.replace(/'/g,'')+'\')"></div>';
  }
  var r1=document.getElementById('clientRow1'), r2=document.getElementById('clientRow2');
  // duplicate each row's content so the -50% marquee loops seamlessly
  if(r1){ var s1=CLIENTS.map(tile).join(''); r1.innerHTML=s1+s1; }
  if(r2){ var rev=CLIENTS.slice().reverse().map(tile).join(''); r2.innerHTML=rev+rev; }
}
function initMarqueeClick(){
  var mask=document.querySelector('.marquee-mask'); if(!mask)return;
  var pausing=false, resumeTimer=null;
  mask.addEventListener('click',function(){
    if(pausing)return;
    pausing=true;
    var rows=mask.querySelectorAll('.marquee-row');
    rows.forEach(function(r){r.style.animationPlayState='paused';});
    clearTimeout(resumeTimer);
    resumeTimer=setTimeout(function(){
      rows.forEach(function(r){r.style.animationPlayState='running';});
      pausing=false;
    },3000);
  });
}
function initSupplyCarousel(){
  var t=document.getElementById('supplyGrid'); if(!t)return;
  // drag-to-scroll (pointer)
  var down=false,startX=0,startL=0,moved=false;
  t.addEventListener('pointerdown',function(e){down=true;moved=false;startX=e.clientX;startL=t.scrollLeft;t.classList.add('dragging');});
  addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-startX;if(Math.abs(dx)>4)moved=true;t.scrollLeft=startL-dx;});
  addEventListener('pointerup',function(){down=false;t.classList.remove('dragging');});
  // suppress click (card toggle) right after a drag
  t.addEventListener('click',function(e){if(moved){e.stopPropagation();e.preventDefault();}},true);
  // auto ping-pong scroll
  var reduce=false; try{reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;}catch(e){}
  if(reduce)return;
  var dir=1,paused=false,speed=.45;
  ['pointerenter','pointerdown','touchstart','focusin'].forEach(function(ev){t.addEventListener(ev,function(){paused=true;});});
  ['pointerleave','pointerup','touchend'].forEach(function(ev){t.addEventListener(ev,function(){paused=false;});});
  function tick(){
    if(!paused){
      var max=t.scrollWidth-t.clientWidth-1;
      if(max>2){
        t.scrollLeft+=dir*speed;
        if(t.scrollLeft>=max){dir=-1;} else if(t.scrollLeft<=0){dir=1;}
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
function renderFootLines(){
  var g=document.getElementById('footLines'); if(!g)return; g.innerHTML='';
  SUPPLY.forEach(function(s){
    var li=el('li'); li.innerHTML='<a href="#supply" data-en="'+s.en+'" data-ar="'+s.ar+'">'+s.en+'</a>';
    g.appendChild(li);
  });
}
function renderSelect(){
  var sel=document.getElementById('f_line'); if(!sel)return; sel.innerHTML='';
  var ph=el('option'); ph.value=''; ph.disabled=true; ph.selected=true;
  ph.setAttribute('data-en','Select a product line…'); ph.setAttribute('data-ar','اختر خط المنتجات…');
  ph.textContent='Select a product line…'; sel.appendChild(ph);
  SUPPLY.forEach(function(s){
    var o=el('option'); o.value=s.en; o.setAttribute('data-en',s.en); o.setAttribute('data-ar',s.ar);
    o.textContent=s.en; sel.appendChild(o);
  });
  var o2=el('option'); o2.value='Multiple / Other'; o2.setAttribute('data-en','Multiple / Other'); o2.setAttribute('data-ar','متعدد / أخرى'); o2.textContent='Multiple / Other'; sel.appendChild(o2);
}

/* ===== LANGUAGE ===== */
var LANG='en';
function applyLang(l){
  LANG=l;
  var isAr=l==='ar';
  document.documentElement.lang=isAr?'ar':'en';
  document.documentElement.dir=isAr?'rtl':'ltr';
  document.body.classList.toggle('ar',isAr);
  document.querySelectorAll('[data-en]').forEach(function(n){
    var v=isAr?n.getAttribute('data-ar'):n.getAttribute('data-en');
    if(v==null)return;
    if(n.tagName==='OPTION'){n.textContent=v;}
    else{ n.innerHTML=v; }
  });
  document.querySelectorAll('[data-en-ph]').forEach(function(n){
    n.setAttribute('placeholder',isAr?n.getAttribute('data-ar-ph'):n.getAttribute('data-en-ph'));
  });
  document.querySelectorAll('.lang-toggle .cur').forEach(function(c){c.textContent=isAr?'ع':'EN';});
  try{localStorage.setItem('she_lang',l);}catch(e){}
}
function toggleLang(){applyLang(LANG==='ar'?'en':'ar');}

/* ===== COUNT-UP ===== */
var counted=false;
function runCounts(){
  if(counted)return; counted=true;
  document.querySelectorAll('[data-count]').forEach(function(b){
    var target=parseInt(b.getAttribute('data-count'),10);
    var isYear=b.getAttribute('data-plain')==='1';
    var start=isYear?1940:0, dur=1400, t0=null;
    function step(ts){
      if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1);
      var eased=1-Math.pow(1-p,3);
      var val=Math.round(start+(target-start)*eased);
      b.textContent=val; if(p<1)requestAnimationFrame(step); else b.textContent=target;
    }
    requestAnimationFrame(step);
  });
}

/* ===== NAV / MENU / SCROLL ===== */
function initUI(){
  var nav=document.getElementById('nav');
  var onScroll=function(){ if(nav)nav.classList.toggle('scrolled',window.scrollY>40); };
  onScroll(); addEventListener('scroll',onScroll,{passive:true});

  var burger=document.getElementById('burger'), mm=document.getElementById('mmenu'), mc=document.getElementById('mclose');
  function openM(){if(mm){mm.classList.add('open');burger&&burger.setAttribute('aria-expanded','true');}}
  function closeM(){if(mm){mm.classList.remove('open');burger&&burger.setAttribute('aria-expanded','false');}}
  burger&&burger.addEventListener('click',openM);
  mc&&mc.addEventListener('click',closeM);
  mm&&mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeM);});

  var lb=document.getElementById('langBtn'), lbm=document.getElementById('langBtnM');
  lb&&lb.addEventListener('click',toggleLang);
  lbm&&lbm.addEventListener('click',function(){toggleLang();});

  var y=document.getElementById('year'); if(y)y.textContent=new Date().getFullYear();
}

/* ===== RFQ FORM ===== */
function initForm(){
  var form=document.getElementById('rfqForm'); if(!form)return;
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    var name=(document.getElementById('f_name').value||'').trim();
    var company=(document.getElementById('f_company').value||'').trim();
    var email=(document.getElementById('f_email').value||'').trim();
    var phone=(document.getElementById('f_phone').value||'').trim();
    var line=document.getElementById('f_line').value||'';
    var msg=(document.getElementById('f_msg').value||'').trim();
    if(!name||!email||!line||!msg){
      [['f_name',name],['f_email',email],['f_line',line],['f_msg',msg]].forEach(function(f){
        var elx=document.getElementById(f[0]); if(elx&&!f[1]){elx.style.borderColor='#c0392b';setTimeout(function(){elx.style.borderColor='';},2000);}
      });
      return;
    }
    var subject='RFQ — '+line+' — '+(company||name);
    var bodyLines=[
      'Request for Quotation — Saudi House of Expertise',
      '',
      'Name: '+name,
      'Company: '+(company||'-'),
      'Email: '+email,
      'Phone: '+(phone||'-'),
      'Product line: '+line,
      '',
      'Details:',
      msg
    ];
    var params='subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(bodyLines.join('\n'));
    var mailto='mailto:zubairceo@gmail.com?'+params;
    var s=document.getElementById('rfqSuccess');
    if(form)form.style.display='none';
    if(s)s.classList.add('show');
    try{window.location.href=mailto;}catch(e){}
  });
}

/* ===== CUSTOM CURSOR ===== */
function initCursor(){
  try{
    if(!(window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches))return;
    var c=document.getElementById('cursor'), d=document.getElementById('cursor-dot');
    if(!c||!d)return;
    var cx=0,cy=0,dx=0,dy=0;
    addEventListener('mousemove',function(e){cx=e.clientX;cy=e.clientY;d.style.left=cx+'px';d.style.top=cy+'px';});
    function loop(){dx+=(cx-dx)*.18;dy+=(cy-dy)*.18;c.style.left=dx+'px';c.style.top=dy+'px';requestAnimationFrame(loop);}
    loop();
    document.querySelectorAll('a,button,.supply-card,.sector,.why-card').forEach(function(elx){
      elx.addEventListener('mouseenter',function(){c.classList.add('big');});
      elx.addEventListener('mouseleave',function(){c.classList.remove('big');});
    });
  }catch(e){}
}

/* ===== BOOT ===== */
function boot(){
  renderSupply(); renderProjects(); renderClients(); renderSectors(); renderWhy(); renderFootLines(); renderSelect();
  observeAll('.reveal');
  observe(document.getElementById('stats'));
  initUI(); initForm(); initCursor(); initSupplyCarousel(); initMarqueeClick();
  var saved=null; try{saved=localStorage.getItem('she_lang');}catch(e){}
  applyLang(saved==='ar'?'ar':'en');
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',boot);}else{boot();}
