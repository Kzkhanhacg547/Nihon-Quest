const fs = require('fs');
let css = fs.readFileSync('app/redesign.css', 'utf8');

css = css.replace(/color:\s*#12201d/g, 'color: var(--jy-ink)');
css = css.replace(/color:\s*#17212b/g, 'color: var(--jy-ink)');
css = css.replace(/color:\s*#2b2b2b/g, 'color: var(--lp-ink)');
css = css.replace(/color:\s*#222/g, 'color: var(--lp-ink)');
css = css.replace(/color:\s*#111/g, 'color: var(--lp-ink)');
css = css.replace(/color:\s*#2b2623/g, 'color: var(--rv-ink)');
css = css.replace(/color:\s*#2a3039/g, 'color: var(--rv-ink)');
css = css.replace(/color:#2f3a39/g, 'color:var(--nq-ink)');
css = css.replace(/color:#3a4543/g, 'color:var(--nq-ink)');

fs.writeFileSync('app/redesign.css', css);
console.log('Fixed redesign.css colors');

