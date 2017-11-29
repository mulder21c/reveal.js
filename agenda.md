# WAI ARIA Best Practices

## What is WAI-ARIA
  - WAI : Web Accessibility Initiative
  - ARIA : Accessible Rich Internet Application


## Why use?
  - restriction of accessibility on static documents
  - supplement for native language semantics, ***not a replacement***


## Role, Property, State

### Role
Attaching a role gives assistive technologies information about how to handle each element

`<tagname role="***">...</tagname>`

### Property & State
Both provide specific information about an object, and both form part of the definition of the 
nature of roles. 

use `aria-` prefixed markup attribute

`<tagname "aria-***=***">...</tagname>`

## How to use
1. use native HTML (HTML5)

  then, when use?

  - HTML5 feature is not implemented or implemented but accessibility support is not.
  - visual design constraints rule out the use of a particular native element
  - feature is not currently available in HTML

2. Add ARIA 

  inline or via Script?

  - If the ARIA role or aria-* attribute does not rely on scripting to provide interaction behavior,
    then inline.
  - If the ARIA role or aria-* attribute can be inserted, changed and removed ARIA via scripting,
    then via script.

3. developing keyboard interface

  - All interactive ARIA controls must be usable with the keyboard.
  - If can click or tap or drag or drop or slide or scroll, must also be able to perform an equivalent action using the keyboard
  - All interactive widgets must be scripted to respond to standard key strokes or key stroke combinations where applicable

## Best Practices

### Landmark
반복건너뛰기링크 기능 vs ARIA role [video | ssul]

> Usage 64.3% [Web AIM screenreader surbey](https://webaim.org/projects/screenreadersurvey6/)

[simply example codes]

#### Landmark Roles

### Tab Contents
legacy vs improved with WAI-ARAI [video | ssul]

[simply example codes]

### Accordion
legacy vs improved with WAI-ARAI [video | ssul]

[simply example codes]

### Dialog
legacy vs improved with WAI-ARAI [video | ssul]

[simply example codes]

### Slider
legacy vs improved with WAI-ARAI [video | ssul]

[simply example codes]


## Should I implement it myself?

YES! if you can.

otherwise, jQueryUI, search with "WAI-ARIA" on github, WAI-ARIA 사례집 etc...

## References
- [WAI-ARIA Specification](https://www.w3.org/TR/wai-aria/)
- [Using ARIA](https://www.w3.org/TR/using-aria)
- [WAI-ARIA Practies](https://www.w3.org/TR/wai-aria-practices)
- [HTML5 Accessibility](http://www.html5accessibility.com/)