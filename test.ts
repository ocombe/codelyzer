import {Replacement} from './src/base/language/rule/fix';
import {Codelyzer} from './src/base/codelyzer';

let sf = `import {Input, Output, Component} form '@angular/core';

@Component({
  selector: 'codelyzer-tabs',
  template: \`...\`
})
class TabsComponent {
  //...
}
`
const codelyzer = new Codelyzer('file.ts', sf, {});

const generator = codelyzer.process();
let next;
let fixed;

console.log('Input:');
console.log(sf);

while (!(next = generator.next()).done) {
  let replacements: Replacement[] = [];
  next.value.fixes.forEach(f => replacements = replacements.concat(f.replacements));
  fixed = sf;
  replacements.sort((a, b) => b.start - a.start)
    .forEach(r => {
      console.log('Replacing', fixed.substring(r.start, r.end), 'with', r.replaceWith);
      fixed = fixed.slice(0, r.start) + r.replaceWith + fixed.slice(r.end);
    });
}

console.log();
console.log('Output:');
console.log(fixed);

