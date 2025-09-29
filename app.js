
// Simple app.js to power the static demo
const LANG = { current: localStorage.getItem('lang') || 'fa' };

const products = [
  { id:1, title_fa:'ساعت هوشمند نمونه', title_en:'Sample Smartwatch', price:1200000, colors:['مشکی','نقره‌ای'], sizes:['S','M','L'], image:'assets/images/product1.svg', featured:true, vendor:'فروشنده نمونه' },
  { id:2, title_fa:'هدفون بی‌سیم', title_en:'Wireless Headset', price:650000, colors:['مشکی','سفید'], sizes:['One-size'], image:'assets/images/product2.svg', featured:true, vendor:'فروشگاه مرکزی' },
  { id:3, title_fa:'کیف رودوشی', title_en:'Shoulder Bag', price:420000, colors:['قهوه‌ای','مشکی'], sizes:['M','L'], image:'assets/images/product3.svg' },
];

function $(q){return document.querySelector(q)}
function $all(q){return Array.from(document.querySelectorAll(q))}

function renderProductCards(){
  const list = $('#product-list');
  const featured = $('#featured-list');
  if(list) products.forEach(p=>{
    const el = document.createElement('div'); el.className='card';
    el.innerHTML = `<h4>${p.title_fa}</h4><img src="${p.image}" alt=""><p>${p.price.toLocaleString()} تومان</p><a class="btn" href="single.html?pid=${p.id}">مشاهده</a>`;
    list.appendChild(el);
  });
  if(featured) products.filter(p=>p.featured).forEach(p=>{
    const el = document.createElement('div'); el.className='card';
    el.innerHTML = `<h4>${p.title_fa}</h4><img src="${p.image}" alt=""><p>${p.price.toLocaleString()} تومان</p><a class="btn" href="single.html?pid=${p.id}">مشاهده</a>`;
    featured.appendChild(el);
  });
}

function getQuery(){return Object.fromEntries(new URLSearchParams(location.search))}

function renderSingle(){
  const q = getQuery();
  if(!q.pid) return;
  const p = products.find(x=>String(x.id)===q.pid);
  if(!p) return;
  $('#product-title').textContent = p.title_fa;
  $('#product-short').textContent = 'توضیح کوتاه درباره '+p.title_fa;
  $('#product-price').textContent = p.price.toLocaleString() + ' تومان';
  const gallery = $('#product-gallery');
  gallery.innerHTML = `<img src="${p.image}" alt="" style="width:100%">`;
  // variants
  const vc = $('#variant-color'), vs = $('#variant-size');
  p.colors.forEach(c=>{ const o=document.createElement('option'); o.textContent=c; vc.appendChild(o); });
  p.sizes.forEach(s=>{ const o=document.createElement('option'); o.textContent=s; vs.appendChild(o); });
  $('#add-to-cart').addEventListener('click', ()=>{
    const qty = parseInt($('#qty').value||1);
    addToCart({id:p.id, title:p.title_fa, price:p.price, qty, color:vc.value, size:vs.value});
    alert('محصول به سبد افزوده شد (شبیه‌سازی)');
  });
}

function cartKey(){return 'demo_cart_v1'}
function loadCart(){return JSON.parse(localStorage.getItem(cartKey())||'[]')}
function saveCart(c){localStorage.setItem(cartKey(), JSON.stringify(c)); updateCartUI();}
function addToCart(item){
  // enforce min/max: min 1, max 10
  if(item.qty<1) item.qty=1;
  if(item.qty>10) item.qty=10;
  const cart = loadCart();
  const found = cart.find(x=>x.id===item.id && x.color===item.color && x.size===item.size);
  if(found) { found.qty += item.qty; if(found.qty>10) found.qty=10; }
  else cart.push(item);
  saveCart(cart);
}
function updateCartUI(){
  const cart = loadCart();
  $('#cart-count').textContent = cart.reduce((s,i)=>s+i.qty,0);
  const container = $('#cart-items');
  if(container){
    container.innerHTML = '';
    cart.forEach(i=>{
      const el = document.createElement('div'); el.className='card';
      el.innerHTML = `<strong>${i.title}</strong><p>تعداد: <input type="number" value="${i.qty}" min="1" max="10" data-id="${i.id}"></p><p>رنگ: ${i.color} سایز: ${i.size}</p><p>قیمت واحد: ${i.price.toLocaleString()} تومان</p>`;
      container.appendChild(el);
    });
    const total = cart.reduce((s,i)=>s + i.price*i.qty,0);
    $('#cart-summary').innerHTML = `<p>جمع کل: ${total.toLocaleString()} تومان</p>`;
  }
}

function applyCoupon(){
  const code = $('#coupon').value.trim();
  if(!code){ alert('کد وارد نشده'); return; }
  // sample demo coupons
  if(code==='DISCOUNT10'){ alert('کد اعمال شد — 10% تخفیف (شبیه‌سازی)'); }
  else alert('کد نامعتبر (شبیه‌سازی)');
}

function checkout(){
  // simulate payment & SMS & order tracking
  const cart = loadCart();
  if(cart.length===0){ alert('سبد خرید خالی است'); return; }
  // generate fake order id
  const oid = 'ORD'+Date.now();
  // prepare CSV report download (sales report simulation)
  const rows = [['order_id','title','qty','price']];
  cart.forEach(i=> rows.push([oid,i.title,i.qty,i.price]));
  let csv = rows.map(r=>r.join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download = `sales_${oid}.csv`; a.click();
  URL.revokeObjectURL(url);
  localStorage.removeItem(cartKey());
  updateCartUI();
  alert('پرداخت شبیه‌سازی شد. فایل گزارش فروش دانلود شد. (برای پرداخت واقعی نیاز به درگاه دارید)');
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderProductCards();
  renderSingle();
  updateCartUI();
  // global events
  const q = getQuery();
  if($('#apply-coupon')) $('#apply-coupon').addEventListener('click', applyCoupon);
  if($('#checkout')) $('#checkout').addEventListener('click', checkout);
  if($('#lang-toggle')) $('#lang-toggle').addEventListener('click', ()=>{
    LANG.current = (LANG.current==='fa') ? 'en' : 'fa';
    localStorage.setItem('lang', LANG.current);
    alert('زبان به ' + LANG.current + ' تغییر کرد. (شبیه‌سازی)');
  });
});
