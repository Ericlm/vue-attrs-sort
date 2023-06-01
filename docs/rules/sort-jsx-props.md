---
title: sort-jsx-props
---

# sort-jsx-props

💼 This rule is enabled in the following [configs](https://eslint-plugin-perfectionist.azat.io/configs): `recommended-alphabetical`, `recommended-line-length`, `recommended-natural`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Enforce sorted JSX props.

## 💡 Examples

### Alphabetical and Natural Sorting

```tsx
// Incorrect
let Riko = () => (
  <CaveRaider
    level="White Whistle"
    name="Riko"
    home="Belchero Orphanage"
    delver
    age={12}
  />
)

// Correct
let Riko = () => (
  <CaveRaider
    age={12}
    delver
    home="Belchero Orphanage"
    level="White Whistle"
    name="Riko"
  />
)
```

### Sorting by Line Length

```tsx
// Incorrect
let Riko = () => (
  <CaveRaider
    level="White Whistle"
    name="Riko"
    home="Belchero Orphanage"
    delver
    age={12}
  />
)

// Correct
let Riko = () => (
  <CaveRaider
    home="Belchero Orphanage"
    level="White Whistle"
    name="Riko"
    age={12}
    delver
  />
)
```

## 🔧 Options

### `type`

- `enum` (default: `alphabetical`):
  - `alphabetical` - sort alphabetically.
  - `natural` - sort in natural order.
  - `line-length` - sort by code line length.

### `order`

- `enum` (default: `asc`):
  - `asc` - enforce properties to be in ascending order.
  - `desc` - enforce properties to be in descending order.

## ⚙️ Usage

### Legacy Config

```json
// .eslintrc
{
  "rules": {
    "perfectionist/sort-jsx-props": [
      "error",
      {
        "type": "line-length",
        "order": "desc"
      }
    ]
  }
}
```

### Flat Config

```js
// eslint.config.js
import perfectionist from 'eslint-plugin-perfectionist'

export default [
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'line-length',
          order: 'desc',
        },
      ],
    },
  },
]
```

## 🚀 Version

This rule was introduced in v0.2.0.

## 📚 Resources

- [Rule source](https://github.com/azat-io/eslint-plugin-perfectionist/blob/main/rules/sort-jsx-props.ts)
- [Test source](https://github.com/azat-io/eslint-plugin-perfectionist/blob/main/test/sort-jsx-props.test.ts)
