# WebGL

> <b>GLSL</b> ⇒ <b>GLSL ES</b> - Graphic Library Shading Language for Embedded Systems

## Projects

- Points
- Triangles
- Textures
- 3d
- View box

## Keep in mind 🤓

![clientX vs pageX](https://i.stack.imgur.com/4C3no.png)

## Qualifiers

### Parameter

| Qualifiers   | Roles                                                   |
| ------------ | ------------------------------------------------------- |
| `in`         | Passes a value into the function                        |
| `const (in)` | Passes a value (cannot be modified) into the function   |
| `out`        | Passes a value as reference into the function           |
| `inout`      | Passes a value as reference and value into the function |

### Preprocessor Directives

Commands for the preprocessor stage before actual compilation.

```
#if constant-expression
If the constant-expression is true, this part is executed.
#endif
#ifdef macro
If the macro is defined, this part is executed.
#endif
#ifndef macro
If the macro is not defined, this part is executed.
#endif
```

### Storage

| Qualifiers  | Roles                                           |
| ----------- | ----------------------------------------------- |
| `attribute` | Passing value to vertex shader                  |
| `uniform`   | Passing data to vertex and fragment shader      |
| `varying`   | Passing data between vertex and fragment shader |

## Coordinates

| type    | 0   | 1   | 2   | 3   |
| ------- | --- | --- | --- | --- |
| vertex  | `x` | `y` | `z` | `w` |
| color   | `r` | `g` | `b` | `a` |
| texture | `s` | `t` | `p` | `q` |

> "swizzling"

```
vec3 v3 = vec3(1.0, 2.0, 3.0);

vec2 v2;
v2 = v3.xy; // sets v2 to (1.0, 2.0)
v2 = v3.yz; // sets v2 to (2.0, 3.0). Any component can be omitted
v2 = v3.xz; // sets v2 to (1.0, 3.0). You can skip any component.
v2 = v3.yx; // sets v2 to (2.0, 1.0). You can reverse the order.
v2 = v3.xx; // sets v2 to (1.0, 1.0). You can repeat any component.
```
