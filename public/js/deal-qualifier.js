(function(){
  if (window.__jlmcsDQMounted) return; window.__jlmcsDQMounted = true;

  var CONFIG = {
    SUPABASE_FUNCTION_URL: "https://zfypycrqovozdegxcooz.supabase.co/functions/v1/submit-deal-qualifier",
    CALENDLY_URL: "https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call",
    JOTFORM_URL: "https://www.jotform.com/251521627688060",
    SHOW_DELAY_MS: 3000, /* 3 seconds */
    FORCE_WIDGET_SHOW: true,
    DISMISS_DAYS: 7,
    BUSINESS_EMAIL: "chris.johnson@jlmcsfunding.com",
    BUSINESS_PHONE: "281-615-9951"
  };

  function mount(){
    // If dismissed recently, skip mounting — but always show during local development
    try{
      var isLocal = (location && (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:'));
      var forceQuery = (location && location.search && location.search.indexOf('jlmcs_force_widget=1')!==-1);
      var force = CONFIG.FORCE_WIDGET_SHOW || forceQuery;
      if (!isLocal && !force){
        var until = localStorage.getItem('jlmcs_dq_dismiss_until');
        if (until && Number(until) > Date.now()) return;
      }
    }catch(e){}
    var host = document.createElement('div');
    host.id = 'jlmcs-dq-host';
    host.style.position = 'fixed';
    host.style.right = '18px';
    host.style.bottom = '18px';
    host.style.zIndex = '2147483647';
    document.body.appendChild(host);

    var shadow = host.attachShadow ? host.attachShadow({mode:'open'}) : host;

    var css = [
      '#dq-card{width:340px;max-width:92vw;background:#0f172a;color:#fff;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.25);font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue","Noto Sans",sans-serif;opacity:0;transform:translateY(10px);transition:opacity .4s ease,transform .4s ease}',
      '#dq-card.show{opacity:1;transform:translateY(0)}',
      'header{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:8px}',
      '.dot{width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block}',
      'header h3{margin:0;font-size:15px;font-weight:600}',
      '.body{padding:14px 16px}',
      'p{margin:0 0 10px 0;font-size:14px;line-height:1.35}',
      '.btns{display:grid;gap:8px;margin-top:8px}',
      'button{border:0;border-radius:10px;padding:10px 12px;background:#1f2937;color:#fff;font-size:14px;cursor:pointer}',
      'button:hover{background:#374151}',
      '.cta{background:#2563eb}.cta:hover{background:#1d4ed8}',
      '.row{display:grid;gap:6px;margin-top:8px}',
      'input,select{width:100%;box-sizing:border-box;border:1px solid #334155;background:#0b1220;color:#fff;border-radius:10px;padding:10px 12px;font-size:14px}',
      '.foot{padding:10px 16px;border-top:1px solid rgba(255,255,255,.08);display:flex;justify-content:flex-end}',
      '#dq-dismiss{background:transparent;color:#9ca3af;border:0;font-size:12px;cursor:pointer}',
      'a.link{color:#93c5fd;text-decoration:underline}',
      '.small{font-size:12px;color:#a3a3a3;margin-top:6px}',
      '.hide{display:none}'
    ].join('');

    var styleEl = document.createElement('style');
    styleEl.appendChild(document.createTextNode(css));
    shadow.appendChild(styleEl);

    var card = document.createElement('div');
    card.id = 'dq-card';
    card.className = 'hide';
  card.setAttribute('role','dialog');
  card.setAttribute('aria-label','Deal qualifier');

    var header = document.createElement('header');
    var dot = document.createElement('span'); dot.className='dot'; dot.setAttribute('aria-hidden','true');
    var h3  = document.createElement('h3');   h3.appendChild(document.createTextNode('Deal Qualifier • JLMCS'));
    header.appendChild(dot); header.appendChild(h3); card.appendChild(header);

    var body = document.createElement('div'); body.className='body'; body.id='dq-body';

    var p0 = document.createElement('p'); p0.appendChild(document.createTextNode('Hi! How can we help today?')); body.appendChild(p0);
    var btns = document.createElement('div'); btns.className='btns';
    var bDeal = document.createElement('button'); bDeal.id='dq-btn-deal'; /* neutral start */
    bDeal.appendChild(document.createTextNode('I have a specific deal'));
    var bPre  = document.createElement('button'); bPre.id='dq-btn-pre';  /* neutral start */
    bPre.appendChild(document.createTextNode('I need to get pre-qualified'));
    btns.appendChild(bDeal); btns.appendChild(bPre); body.appendChild(btns);

    var pHelp = document.createElement('p'); pHelp.className='small';
    pHelp.appendChild(document.createTextNode('Questions? Email '));
    var aMail = document.createElement('a'); aMail.className='link'; aMail.href='mailto:'+CONFIG.BUSINESS_EMAIL; aMail.appendChild(document.createTextNode(CONFIG.BUSINESS_EMAIL));
    pHelp.appendChild(aMail);
    pHelp.appendChild(document.createTextNode(' or call '+CONFIG.BUSINESS_PHONE+'.'));
    body.appendChild(pHelp);

    card.appendChild(body);

    var foot = document.createElement('div'); foot.className='foot';
    var bDismiss = document.createElement('button'); bDismiss.id='dq-dismiss'; bDismiss.appendChild(document.createTextNode('Dismiss'));
    foot.appendChild(bDismiss); card.appendChild(foot);

    shadow.appendChild(card);

    function show(){
      card.classList.remove('hide');
      setTimeout(function(){ card.classList.add('show'); }, 50);
    }
    function hide(){ card.classList.add('hide'); }

    var state = {
      path:null, name:"", email:"", phone:"",
      experience:"", dealType:"", liquidReserves:"", creditBand:"", closeTimeline:"",
      interestType:"",
      leadStatus:"unqualified", disqReason:"",
      pageURL: window.location.href, timestamp: new Date().toISOString()
    };
    // UI sending guard to avoid duplicate submits
    state.sending = false;

    function selectRow(label, opts, next){
      body.innerHTML = '';
      var p = document.createElement('p'); p.appendChild(document.createTextNode(label)); body.appendChild(p);
      var row = document.createElement('div'); row.className='row';
      var sel = document.createElement('select'); var empty = document.createElement('option'); empty.value=''; empty.appendChild(document.createTextNode('Select')); sel.appendChild(empty);
      sel.setAttribute('aria-label', label);
      for (var i=0;i<opts.length;i++){ var o=document.createElement('option'); o.value=opts[i].value; o.appendChild(document.createTextNode(opts[i].label)); sel.appendChild(o); }
      var btn = document.createElement('button'); btn.className='cta'; btn.appendChild(document.createTextNode('Continue'));
      row.appendChild(sel); row.appendChild(btn); body.appendChild(row);
      // focus the select for keyboard users
      setTimeout(function(){ try{ sel.focus(); }catch(e){} }, 50);
      btn.onclick = function(){ next(sel.value||''); };
    }

    function askExperience(next){
      selectRow('How many completed deals do you have?', [
        {value:'0',label:'0 (New)'},{value:'1-2',label:'1–2'},{value:'3-5',label:'3–5'},{value:'6+',label:'6+'}
      ], function(v){ state.experience=v; next(); });
    }
    function askDealType(next){
      selectRow('What type of deal is this?', [
        {value:'Fix & Flip',label:'Fix & Flip'},{value:'BRRRR / DSCR Rental',label:'BRRRR / DSCR Rental'},
        {value:'Ground-up Construction',label:'Ground-up Construction'},{value:'Bridge',label:'Bridge'},{value:'Commercial (5+ units)',label:'Commercial (5+ units)'}
      ], function(v){ state.dealType=v; next(); });
    }
    function askReserves(next){
      selectRow('How much do you have in liquid reserves (cash or verifiable)?', [
        {value:'0-5k',label:'$0–$5k'},{value:'5-10k',label:'$5k–$10k'},{value:'10-25k',label:'$10k–$25k'},
        {value:'25-50k',label:'$25k–$50k'},{value:'50k+',label:'$50k+'}
      ], function(v){
        state.liquidReserves=v;
        var low = (v==='0-5k' || v==='5-10k');
        if (low){ state.leadStatus='disqualified'; state.disqReason='reserves_lt_10k'; politeDQFollowup(); }
        else { next(); }
      });
    }
    function askCredit(next){
      selectRow("What's your estimated credit band?", [
        {value:'500-599',label:'500–599'},{value:'600-639',label:'600–639'},
        {value:'640-679',label:'640–679'},{value:'680-719',label:'680–719'},{value:'720+',label:'720+'}
      ], function(v){ state.creditBand=v; next(); });
    }
    function askTimeline(next){
      selectRow('How soon do you need to close?', [
        {value:'ASAP',label:'ASAP'},{value:'7-14 days',label:'7–14 days'},{value:'15-30 days',label:'15–30 days'},{value:'30+ days',label:'30+ days'}
      ], function(v){ state.closeTimeline=v; next(); });
    }
    function contactForm(finalize){
      body.innerHTML = '';
      var p = document.createElement('p'); p.appendChild(document.createTextNode('Great — last step: how can we contact you?')); body.appendChild(p);
      var row = document.createElement('div'); row.className='row';
      var f1=document.createElement('input'); f1.placeholder='Full name'; f1.setAttribute('aria-label','Full name');
      var f2=document.createElement('input'); f2.placeholder='Email'; f2.setAttribute('aria-label','Email');
      var f3=document.createElement('input'); f3.placeholder='Phone'; f3.setAttribute('aria-label','Phone');
      var btn=document.createElement('button'); btn.className='cta'; btn.appendChild(document.createTextNode('Submit'));
      row.appendChild(f1); row.appendChild(f2); row.appendChild(f3); row.appendChild(btn); body.appendChild(row);
      btn.onclick=function(){
        if (state.sending) return;
        state.name=(f1.value||'').trim(); state.email=(f2.value||'').trim(); state.phone=(f3.value||'').trim();
        state.sending = true;
        btn.disabled = true; btn.textContent = 'Sending…';
        try{ f1.disabled=true; f2.disabled=true; f3.disabled=true; }catch(e){}
        finalize();
      };
      // focus the first input
      setTimeout(function(){ try{ f1.focus(); }catch(e){} }, 50);
    }
    function politeDQFollowup(){
      body.innerHTML = '';
      var p1=document.createElement('p'); p1.appendChild(document.createTextNode('Thank you for sharing. At this time, we typically require at least $10,000 in liquid reserves.')); body.appendChild(p1);
      var p2=document.createElement('p'); p2.appendChild(document.createTextNode("Please leave your contact info so we can follow up as your situation progresses — we're happy to revisit options.")); body.appendChild(p2);
      var row=document.createElement('div'); row.className='row';
      var f1=document.createElement('input'); f1.placeholder='Full name'; f1.setAttribute('aria-label','Full name');
      var f2=document.createElement('input'); f2.placeholder='Email'; f2.setAttribute('aria-label','Email');
      var f3=document.createElement('input'); f3.placeholder='Phone'; f3.setAttribute('aria-label','Phone');
      var btn=document.createElement('button'); btn.className='cta'; btn.appendChild(document.createTextNode('Send'));
      row.appendChild(f1); row.appendChild(f2); row.appendChild(f3); row.appendChild(btn); body.appendChild(row);
      var p3=document.createElement('p'); p3.className='small';
      p3.appendChild(document.createTextNode('Questions? '));
      var a=document.createElement('a'); a.className='link'; a.href='mailto:'+CONFIG.BUSINESS_EMAIL; a.appendChild(document.createTextNode(CONFIG.BUSINESS_EMAIL));
      p3.appendChild(a); body.appendChild(p3);
      btn.onclick=function(){
        if (state.sending) return;
        state.name=(f1.value||'').trim(); state.email=(f2.value||'').trim(); state.phone=(f3.value||'').trim();
        state.sending = true;
        btn.disabled = true; btn.textContent = 'Sending…';
        try{ f1.disabled=true; f2.disabled=true; f3.disabled=true; }catch(e){}
        sendToSupabase().then(function(){
          body.innerHTML="<p style=\"color:#22c55e;font-weight:600;\">✓ Success! We have received your info and will follow up soon.</p>";
        }, function(err){
          console.error('[DQ] politeDQ submission failed:', err);
          body.innerHTML='<p style="color:#ef4444;">Submission failed. Please email <a href="mailto:'+CONFIG.BUSINESS_EMAIL+'" class="link">'+CONFIG.BUSINESS_EMAIL+'</a> or call '+CONFIG.BUSINESS_PHONE+'.</p>';
        }).finally(function(){
          state.sending = false;
          try{ f1.disabled=false; f2.disabled=false; f3.disabled=false; btn.disabled=false; }catch(e){}
        });
      };
      // focus the first input
      setTimeout(function(){ try{ f1.focus(); }catch(e){} }, 50);
    }
    function routeAndFinish(){
      var hot=(state.closeTimeline==='ASAP'||state.closeTimeline==='7-14 days');
      var routeURL= hot?CONFIG.CALENDLY_URL:CONFIG.JOTFORM_URL;
      state.leadStatus='qualified'; state.disqReason='';
      if (state.sending) return;
      state.sending = true;
      sendToSupabase().then(function(){
        console.log('[DQ] Qualified lead submitted successfully');
        body.innerHTML='';
        var pSuccess=document.createElement('p'); pSuccess.style.color='#22c55e'; pSuccess.style.fontWeight='600'; pSuccess.appendChild(document.createTextNode('✓ Success! Your info has been submitted.'));
        body.appendChild(pSuccess);
        var p=document.createElement('p'); p.appendChild(document.createTextNode("Continue here:")); body.appendChild(p);
        var btns=document.createElement('div'); btns.className='btns';
        var a=document.createElement('a'); a.target='_blank'; a.rel='noopener'; a.href=routeURL;
        var b=document.createElement('button'); b.className='cta'; b.appendChild(document.createTextNode('Open '+(hot?'Calendly':'Jotform')));
        a.appendChild(b); btns.appendChild(a); body.appendChild(btns);
      }, function(){
        console.error('[DQ] Qualified lead submission failed');
        body.innerHTML='';
        var pErr=document.createElement('p'); pErr.style.color='#ef4444'; pErr.style.fontWeight='600'; pErr.appendChild(document.createTextNode('⚠ Submission failed, but you can still proceed:'));
        body.appendChild(pErr);
        var btns=document.createElement('div'); btns.className='btns';
        var a=document.createElement('a'); a.target='_blank'; a.rel='noopener'; a.href=routeURL;
        var b=document.createElement('button'); b.className='cta'; b.appendChild(document.createTextNode('Open '+(hot?'Calendly':'Jotform')));
        a.appendChild(b); btns.appendChild(a); body.appendChild(btns);
        var p2=document.createElement('p'); p2.className='small'; p2.appendChild(document.createTextNode('Or email '));
        var a2=document.createElement('a'); a2.className='link'; a2.href='mailto:'+CONFIG.BUSINESS_EMAIL; a2.appendChild(document.createTextNode(CONFIG.BUSINESS_EMAIL));
        p2.appendChild(a2); body.appendChild(p2);
      }).finally(function(){
        state.sending = false;
      });
    }

    /* ---------- LOCAL-FRIENDLY WEBHOOK SENDER (with fallbacks) ---------- */
    function sendToSupabase(){
      var payload = {
        name: state.name,
        email: state.email,
        phone: state.phone,
        experience: state.experience,
        dealType: state.dealType,
        liquidReserves: state.liquidReserves,
        creditBand: state.creditBand,
        closeTimeline: state.closeTimeline,
        interestType: state.interestType,
        leadStatus: state.leadStatus,
        disqReason: state.disqReason,
        pageURL: state.pageURL,
        timestamp: state.timestamp,
        source: 'deal-qualifier',
      };
      var bodyJSON = JSON.stringify(payload);

      console.log('[DQ] Sending to Supabase:', CONFIG.SUPABASE_FUNCTION_URL, payload);

      return fetch(CONFIG.SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyJSON,
      }).then(function(res){
        console.log('[DQ] Response status:', res.status);
        if (!res.ok) {
          return res.text().then(function(errText){
            console.error('[DQ] Error response:', errText);
            throw new Error('Server returned ' + res.status + ': ' + errText);
          });
        }
        return res.json().then(function(data){
          console.log('[DQ] Success response:', data);
          if (!data.success) {
            throw new Error(data.error || 'Submission failed');
          }
          return data;
        });
      }).catch(function(err){
        console.error('[DQ] Fetch error:', err);
        throw err;
      });
    }
    /* ---------- /LOCAL-FRIENDLY WEBHOOK SENDER ---------- */

    // Prefer explicit listeners (more robust than relying on event target ids)
    bDeal.addEventListener('click', function(){
      state.path = 'deal';
      askExperience(function(){
        askDealType(function(){
          askReserves(function(){
            askCredit(function(){
              askTimeline(function(){
                contactForm(routeAndFinish);
              });
            });
          });
        });
      });
    });

    bPre.addEventListener('click', function(){
      state.path = 'pre';
      askExperience(function(){
        askReserves(function(){
          askCredit(function(){
            contactForm(routeAndFinish);
          });
        });
      });
    });

    bDismiss.addEventListener('click', function(){
      // persist dismissal until DISMISS_DAYS from now
      try{
        var until = Date.now() + (CONFIG.DISMISS_DAYS||0) * 24 * 60 * 60 * 1000;
        localStorage.setItem('jlmcs_dq_dismiss_until', String(until));
      }catch(e){ }
      hide();
    });

    setTimeout(show, CONFIG.SHOW_DELAY_MS);
  }

  if (document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', mount); } else { mount(); }
})();
