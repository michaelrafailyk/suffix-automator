Suffix Automator helps a type developers to reduce repetitive steps when writing simple OpenType features such as one-to-one substitution. It can be useful for writing a Stylistic Sets, for wrapping characters into classes, for reverse substitution direction, for capitalization or decapitalization a substituted characters, or just for sorting characters.

## Links

Online version: [michaelrafailyk.github.io/suffix-automator](https://michaelrafailyk.github.io/suffix-automator/)

Video with explanation: [youtube.com/watch?v=ezTZsHxszL4](https://www.youtube.com/watch?v=ezTZsHxszL4)

## Features

- Set the suffix you need such as `.alt` `.dnom` `.loclBGR` by typing it in the **suffix** field.
- Get a substitution syntax from characters such as `a b c one two` (separated by space or by line):
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
- Capitalize the first letter of substituted characters `sub aring by Aring.sc;` by pressing the **capitalize** button.
- Decapitalize the first letter of substituted characters `sub Aring by aring.sc;` by pressing the **decapitalize** button. Note: capitalization or decapitalization changes only the substituted characters, leaving the left column unchanged.
- Copy feature code to clipboard by pressing the **copy** button.