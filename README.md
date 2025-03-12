SuffixAutomator helps a type developers to reduce repetitive steps when writing simple OpenType features such as one-to-one substitution. It can be useful for writing a Stylistic Set feature, for generating Small Caps receipts, for wrapping characters into classes, for reverse substitution direction, for capitalization or decapitalization source and/or substituted characters, or just for sorting characters.

## Links

Online version: [michaelrafailyk.github.io/SuffixAutomator](https://michaelrafailyk.github.io/SuffixAutomator)

Video with explanation: [youtube.com/watch?v=ezTZsHxszL4](https://www.youtube.com/watch?v=ezTZsHxszL4)

## Preview

![SuffixAutomator preview](https://repository-images.githubusercontent.com/522259141/c7962824-adb5-4ae1-ac2e-5f415c5a4f4b)

## Features

- Enter a list of characters (separated by space or new line) in the left text field.
```
a b c one two
```

- Set the suffix such as `.alt` `.sc` `.loclBGR` by typing it in the **suffix** field.
- Get a feature substitution syntax:
```
  sub a by a.sc;
  sub b by b.sc;
  sub c by c.sc;
  sub one by one.sc;
  sub two by two.sc;
```
- Wrap result to `class` by `class` substitution by pressing the **class** button:
```
  @class1 = [a b c one two];
  @class2 = [a.sc b.sc c.sc one.sc two.sc];
  sub @class1 by @class2;
```
- Get a receipts for generating composites by pressing the **composite** button:
```
a=a.sc
b=b.sc
c=c.sc
one=one.sc
two=two.sc
```
- Reverse substitution direction (from suffix to character) by pressing the **reverse** button:
```
  sub a.sc by a;
```
- Reverse mode automatically turns on if the first character in the list ends with a suffix that matches the one specified in the **suffix** field.
- Convert a list of characters such as `one two` to a list with a suffix by pressing the **reverse** button:
```
one.numr
two.numr
```
- Sort a list of characters such as `one one.lf two two.lf A B Aring A.alt aring a a.alt b B.alt Bdot bdot b.alt` alphabetically (but logically grouped) by pressing the **sort** button:
```
A         # uppercase alphabet
A.alt     # with a suffix
B
B.alt
a         # lowercase alphabet
a.alt     # with a suffix
b
b.alt
one       # figures
two
one.lf    # figures with a suffix
two.lf
Aring     # other characters alphabetically
Bdot
aring
bdot
```
- Capitalize the first letter of source characters by pressing the **capitalize from** button.
```
sub A by a.sc;
```
- Capitalize the first letter of substituted characters by pressing the **capitalize to** button.
```
sub a by A.sc;
```
- Decapitalize the first letter of source characters by pressing the **decapitalize from** button.
```
sub a by A.sc;
```
- Decapitalize the first letter of substituted characters by pressing the **decapitalize to** button.
```
sub A by a.sc;
```
- Copy feature code to clipboard by pressing the **copy** button.